"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import {
   IPlayerData,
   IPlayerStore,
} from "./interfaces/vid-player.interfaces";

const initialState: IPlayerData = {
   headers: null,
   currentSource: null,
   qualities: [],
   currentSubs: null,
   subs: [],
};

const videoStore = create<IPlayerStore>()((set, get) => ({
   ...initialState,

   setHeaders(headers) {
      set((state) => ({ ...state, headers }));
   },
   setCurrentSource(source) {
      set((state) => ({ ...state, currentSource: source }));
   },
   setQualities(qualities) {
      set((state) => ({ ...state, qualities }));
   },
   setCurrentSubs(lang) {
      const sub = get().subs.find((sub) => sub.lang === lang);

      if (!sub) return;

      set((state) => ({ ...state, currentSubs: sub }));
   },
   setSubs(subs) {
      set((state) => ({ ...state, subs }));
   },
}));

export default videoStore;
