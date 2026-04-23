"use client";

import { setAccessTokenForRequests } from "@/infrastructure";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type AuthContextValue = {
  tokenAccess: string | null;
  setTokenAccess: (token: string | null) => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

interface Props {
  children: React.ReactNode;
  initialToken?: string;
}

export function AuthProvider({ children, initialToken }: Props) {
  const [tokenAccess, setTokenAccess] = useState<string | null>(
    initialToken ?? null,
  );

  if (initialToken) {
    setAccessTokenForRequests(initialToken);
  }

  useEffect(() => {
    setAccessTokenForRequests(tokenAccess);
  }, [tokenAccess]);

  const setToken = useCallback((token: string | null) => {
    setTokenAccess(token);
    setAccessTokenForRequests(token);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      tokenAccess,
      setTokenAccess: setToken,
    }),
    [tokenAccess, setToken],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
