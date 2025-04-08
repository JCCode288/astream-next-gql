"use client";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import {
   IHistoryData,
   IHistoryStore,
} from "./interfaces/anime.interfaces";
import { ISource } from "@consumet/extensions";

const initialData: IHistoryData = {
   watch_list: [],
   recent: null,
   current: null,
};

const historyStore = create<IHistoryStore>()(
   persist(
      (set, get) => ({
         ...initialData,
         addToWatchList(source: ISource) {
            set((state) => {
               state.watch_list.push(source);
               return { ...state };
            });
         },
         setRecent(anime) {
            set((state) => ({ ...state, recent: anime }));
         },
         setCurrent(source) {
            set((state) => ({ ...state, current: source }));
         },
      }),
      {
         name: "history-data",
         storage: createJSONStorage(() => localStorage),
      }
   )
);

export default historyStore;
