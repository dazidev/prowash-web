import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { API, LoginWebResponse } from "@/interfaces";
import type { JWT } from "next-auth/jwt";
import { refreshWebToken, getCachedRefreshWebToken } from "./refresh-web-token";

async function refreshAccessToken(token: JWT, trigger?: string): Promise<JWT> {
  try {
    if (!token.refreshToken || !token.sessionId) {
      throw new Error("Missing refresh token or session id");
    }

    const refreshed = await refreshWebToken(
      token.sessionId,
      token.refreshToken,
    );

    return {
      ...token,
      ...refreshed,
      needsSessionSync: trigger !== "update",
      error: undefined,
    };
  } catch {
    console.error("Error refreshing access token");

    return {
      ...token,
      accessToken: undefined,
      needsSessionSync: false,
      error: "RefreshAccessTokenError",
    };
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt",
  },

  providers: [
    Credentials({
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
        deviceId: {
          type: "text",
        },
        deviceInfo: {
          type: "text",
        },
      },

      async authorize(credentials) {
        const email = credentials?.email;
        const password = credentials?.password;
        const deviceId = credentials?.deviceId;
        const deviceInfo = credentials?.deviceInfo;

        if (
          typeof email !== "string" ||
          typeof password !== "string" ||
          !email ||
          !password
        ) {
          return null;
        }

        const response = await fetch(`${API}/api/auth/login-web`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            deviceId,
            deviceInfo,
          }),
          cache: "no-store",
        });

        let data: LoginWebResponse | null = null;

        try {
          data = await response.json();
        } catch {
          return null;
        }

        if (
          !response.ok ||
          !data?.user ||
          !data.accessToken ||
          !data.refreshToken ||
          !data.sessionId
        ) {
          return null;
        }

        return {
          id: data.user.id,
          email: data.user.email,
          name: data.user.name,
          lastname: data.user.lastname,
          roles: data.user.roles,
          status: data.user.status,

          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          sessionId: data.sessionId,

          accessTokenExpiresIn: data.accessTokenExpiresIn,
          refreshTokenExpiresIn: data.refreshTokenExpiresIn,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, trigger }) {
      if (user) {
        return {
          ...token,

          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            lastname: user.lastname,
            roles: user.roles,
            status: user.status,
          },

          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          sessionId: user.sessionId,

          accessTokenExpiresAt: Date.now() + user.accessTokenExpiresIn * 1000,
          refreshTokenExpiresAt: Date.now() + user.refreshTokenExpiresIn * 1000,

          needsSessionSync: false,
          error: undefined,
        };
      }

      if (!token.accessTokenExpiresAt) {
        return {
          ...token,
          error: "MissingAccessTokenExpiration",
        };
      }

      if (
        token.refreshTokenExpiresAt &&
        Date.now() >= Number(token.refreshTokenExpiresAt)
      ) {
        return {
          ...token,
          accessToken: undefined,
          refreshToken: undefined,
          error: "RefreshTokenExpired",
        };
      }

      const shouldRefresh =
        Date.now() >= Number(token.accessTokenExpiresAt) - 60_000;

      if (!shouldRefresh) {
        return {
          ...token,
          needsSessionSync: false,
        };
      }

      return refreshAccessToken(token, trigger);
    },

    async session({ session, token }) {
      session.user = {
        ...session.user,
        ...token.user,
      };

      session.accessToken = token.accessToken as string | undefined;
      session.error = token.error as string | undefined;
      session.needsSessionSync = token.needsSessionSync === true;

      return session;
    },
  },
  events: {
    async signOut(message) {
      const token = "token" in message ? message.token : null;

      if (!token?.refreshToken) return;

      try {
        const cached = token.sessionId
          ? await getCachedRefreshWebToken(token.sessionId, token.refreshToken)
          : undefined;

        await fetch(`${API}/api/auth/logout-web`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            refreshToken: cached?.refreshToken ?? token.refreshToken,
          }),
          cache: "no-store",
        });
      } catch (error) {
        console.error("Error closing backend session", error);
      }
    },
  },
});

export const { GET, POST } = handlers;
