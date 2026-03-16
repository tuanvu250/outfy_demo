import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, AuthResponse } from "@/lib/types/auth";

interface AuthStore {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  tokenExpiry: number | null;
  isAuthenticated: boolean;
  setAuth: (authResponse: AuthResponse) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  updateTokens: (
    accessToken: string,
    refreshToken: string,
    expiresIn: number,
  ) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      tokenExpiry: null,
      isAuthenticated: false,
      setAuth: (authResponse: AuthResponse) =>
        set({
          user: authResponse.user,
          accessToken: authResponse.accessToken,
          refreshToken: authResponse.refreshToken,
          tokenExpiry: Date.now() + authResponse.expiresIn * 1000,
          isAuthenticated: true,
        }),
      logout: () =>
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          tokenExpiry: null,
          isAuthenticated: false,
        }),
      updateUser: (updates) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        })),
      updateTokens: (
        accessToken: string,
        refreshToken: string,
        expiresIn: number,
      ) =>
        set({
          accessToken,
          refreshToken,
          tokenExpiry: Date.now() + expiresIn * 1000,
        }),
    }),
    {
      name: "outfy-auth",
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        tokenExpiry: state.tokenExpiry,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
