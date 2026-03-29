import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/api/types";

interface AuthState {
  access: string | null;
  refresh: string | null;
  user: User | null;
  setTokens: (access: string, refresh: string) => void;
  setAccess: (access: string) => void;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      access: null,
      refresh: null,
      user: null,
      setTokens: (access, refresh) => set({ access, refresh }),
      setAccess: (access) => set({ access }),
      setUser: (user) => set({ user }),
      logout: () => set({ access: null, refresh: null, user: null }),
    }),
    { name: "fa2m-auth" },
  ),
);
