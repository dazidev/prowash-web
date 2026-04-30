import { API, LoginResponse } from "@/interfaces";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        deviceId: { type: "text" },
        deviceInfo: { type: "text" },
      },
      async authorize(credentials) {
        const { email, password, deviceId, deviceInfo } = credentials;

        const res = await fetch(`${API}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            password,
            deviceId,
            deviceInfo,
          }),
        });

        const data: LoginResponse = await res.json();

        if (res.ok && data) {
          // Devolvemos todo el objeto que incluye access y refresh tokens
          const setCookieHeader = res.headers.get("set-cookie");
          const refreshToken = setCookieHeader
            ?.split(";")
            .find((c) => c.trim().startsWith("refresh_token="))
            ?.split("=")[1];

          return {
            ...data,
            accessToken: data.accessToken,
            refreshToken: refreshToken,
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // 1. Al iniciar sesión por primera vez, guardamos los tokens y el tiempo de expiración
      if (user) {
        return {
          ...token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          expiresAt: Date.now() + 20 * 60 * 1000,
          user,
        };
      }

      // 2. Si el token aún es válido, devolvemos el token actual
      if (Date.now() < (token.expiresAt as number)) {
        return token;
      }

      // 3. SI EL TOKEN EXPIRÓ, intentamos refrescarlo automáticamente
      try {
        const response = await fetch(`${API}/api/auth/refresh`, {
          method: "POST",
          headers: {
            Cookie: `refresh_token=${token.refreshToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        });

        const tokens = await response.json();

        if (!response.ok) throw tokens;

        return {
          ...token,
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken ?? token.refreshToken, // Si el backend envía uno nuevo
          expiresAt: Date.now() + 15 * 60 * 1000,
        };
      } catch (error) {
        console.error("Error refrescando el token", error);
        return { ...token, error: "RefreshAccessTokenError" };
      }
    },

    async session({ session, token }) {
      // Pasamos los datos del token a la sesión
      session.accessToken = token.accessToken as string;
      session.user.roles = (token.user as any).roles;
      session.error = token.error as string; // Para avisar al cliente si el refresh falló
      return session;
    },
  },
});
