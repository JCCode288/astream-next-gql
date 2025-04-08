"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import {
   ILoadingData,
   ILoadingStore,
} from "./interfaces/loading.interfaces";

const initialState: ILoadingData = {
   loading: false,
};

const loadingStore = create<ILoadingStore>()(
   persist(
      (set, get) => ({
         ...initialState,

         setLoading(loading: boolean) {
            set((state) => ({ ...state, loading }));
         },
      }),
      {
         name: "loading-store",
         storage: createJSONStorage(() => localStorage),
      }
   )
);

export default loadingStore;
