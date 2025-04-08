"use client";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { IAuthData, IAuthStore } from "./interfaces/auth.interfaces";

const initialData: IAuthData = {
   userId: "",
   token: null,
   isLoggedIn: false,
};

const authStore = create<IAuthStore>()(
   persist(
      (set, get) => ({
         ...initialData,
         setUserId(uid: string) {
            set((state) => ({ ...state, userId: uid }));
         },
         setToken(token) {
            set((state) => ({ ...state, token }));
         },
         setIsLoggedIn(isLoggedIn: boolean) {
            set((state) => ({ ...state, isLoggedIn }));
         },
      }),
      {
         name: "auth-data",
         storage: createJSONStorage(() => localStorage),
      }
   )
);

export default authStore;
