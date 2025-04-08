"use client";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import {
   IHistoryData,
   IHistoryStore,
   IAnimeHistory,
} from "./interfaces/anime.interfaces";

const initialData: IHistoryData = {
   watch_list: [],
   recent: null,
};

const historyStore = create<IHistoryStore>()(
   persist(
      (set, get) => ({
         ...initialData,
         addToWatchList({ animeId, name }: IAnimeHistory) {
            set((state) => {
               state.watch_list.push({ animeId, name });
               return { ...state };
            });
         },
         setRecent(anime) {
            set((state) => ({ ...state, recent: anime }));
         },
      }),
      {
         name: "history-data",
         storage: createJSONStorage(() => localStorage),
      }
   )
);

export default historyStore;
