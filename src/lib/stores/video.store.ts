"use client";

import { create } from "zustand";
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
   setCurrentSubs(currentSubs) {
      set((state) => ({ ...state, currentSubs }));
   },
   setSubs(subs) {
      set((state) => ({ ...state, subs }));
   },
}));

export default videoStore;
