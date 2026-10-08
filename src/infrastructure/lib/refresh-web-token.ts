import "server-only";
import { createHash } from "node:crypto";
import { API, type RefreshWebResponse } from "@/interfaces";

type RefreshedTokens = {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: number;
  refreshTokenExpiresAt: number;
};

type RefreshEntry = {
  promise: Promise<RefreshedTokens>;
  expiresAt: number;
};

const state = globalThis as typeof globalThis & {
  prowashRefreshes?: Map<string, RefreshEntry>;
};

const refreshes = (state.prowashRefreshes ??= new Map());

const CACHE_MS = 120_000;
const MAX_ENTRIES = 1_000;

function keyFor(sessionId: string, refreshToken: string) {
  return createHash("sha256")
    .update(JSON.stringify([sessionId, refreshToken]))
    .digest("hex");
}

export function getCachedRefreshWebToken(
  sessionId: string,
  refreshToken: string,
) {
  const key = keyFor(sessionId, refreshToken);
  const entry = refreshes.get(key);

  if (entry && entry.expiresAt > Date.now()) {
    return entry.promise;
  }

  refreshes.delete(key);
  return undefined;
}

export function refreshWebToken(
  sessionId: string,
  refreshToken: string,
): Promise<RefreshedTokens> {
  const existing = getCachedRefreshWebToken(sessionId, refreshToken);

  if (existing) return existing;

  for (const [key, entry] of refreshes) {
    if (entry.expiresAt <= Date.now()) {
      refreshes.delete(key);
    }
  }

  if (refreshes.size >= MAX_ENTRIES) {
    return Promise.reject(new Error("Too many pending refreshes"));
  }

  const key = keyFor(sessionId, refreshToken);

  const entry: RefreshEntry = {
    expiresAt: Infinity,
    promise: Promise.resolve()
      .then(async () => {
        const startedAt = Date.now();

        const response = await fetch(`${API}/api/auth/refresh-web`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refreshToken }),
          cache: "no-store",
          signal: AbortSignal.timeout(10_000),
        });

        if (!response.ok) {
          throw new Error("Refresh rejected");
        }

        const data = (await response.json()) as RefreshWebResponse | null;

        if (
          !data ||
          typeof data.accessToken !== "string" ||
          !data.accessToken ||
          typeof data.refreshToken !== "string" ||
          !data.refreshToken ||
          data.refreshToken === refreshToken ||
          typeof data.accessTokenExpiresIn !== "number" ||
          !Number.isFinite(data.accessTokenExpiresIn) ||
          data.accessTokenExpiresIn <= 60 ||
          typeof data.refreshTokenExpiresIn !== "number" ||
          !Number.isFinite(data.refreshTokenExpiresIn) ||
          data.refreshTokenExpiresIn <= 0
        ) {
          throw new Error("Invalid refresh response");
        }

        return {
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          accessTokenExpiresAt: startedAt + data.accessTokenExpiresIn * 1_000,
          refreshTokenExpiresAt: startedAt + data.refreshTokenExpiresIn * 1_000,
        };
      })
      .then(
        (result) => {
          entry.expiresAt = Date.now() + CACHE_MS;
          return result;
        },
        (error: unknown) => {
          refreshes.delete(key);
          throw error;
        },
      ),
  };

  refreshes.set(key, entry);

  return entry.promise;
}
