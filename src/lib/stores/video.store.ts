"use client";

import { create } from "zustand";
import {
   IPlayerData,
   IPlayerStore,
} from "./interfaces/vid-player.interfaces";
import { createJSONStorage, persist } from "zustand/middleware";

const initialState: IPlayerData = {
   autoplay: false,
   skipIntro: false,
   headers: null,
   currentSource: null,
   qualities: [],
   currentSubs: null,
   subs: [],
};

const videoStore = create<IPlayerStore>()(
   persist(
      (set, get) => ({
         ...initialState,

         setHeaders(headers) {
            set((state) => ({ ...state, headers }));
         },
         setAutoplay(autoplay) {
            set((state) => ({ ...state, autoplay }));
         },
         setSkipIntro(skipIntro) {
            set((state) => ({ ...state, skipIntro }));
         },
         setCurrentSource(source) {
            set((state) => ({ ...state, currentSource: source }));
         },
         setQualities(qualities) {
            set((state) => ({ ...state, qualities }));
         },
         setCurrentSubs(currentSubs) {
            set((state) => ({ ...state, currentSubs }));
         },
         setSubs(subs) {
            set((state) => ({ ...state, subs }));
         },
         setIntro(intro) {
            set((state) => ({ ...state, intro }));
         },
         setOutro(outro) {
            set((state) => ({ ...state, outro }));
         },
         reset() {
            const { autoplay, skipIntro, ...initState } = initialState;

            set((state) => ({ ...state, ...initState }));
         },
      }),
      {
         name: "video-store",
         storage: createJSONStorage(() => localStorage),

         partialize(state) {
            const { autoplay, skipIntro } = state;
            return { autoplay, skipIntro };
         },
      }
   )
);

export default videoStore;
