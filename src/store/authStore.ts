import { create } from "zustand";
import type { User } from "@supabase/supabase-js";

type AuthStoreType = {
  user: User | null;
  authLoading: boolean;
  setUser: (newUser: User | null) => void;
};

export const useAuthStore = create<AuthStoreType>((set) => ({
  user: null,
  authLoading: true,
  setUser: (newUser) => set(() => ({ user: newUser, authLoading: false })),
}));
