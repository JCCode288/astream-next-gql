"use client";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import {
   CurrentWatch,
   IHistoryData,
   IHistoryStore,
   IWatchList,
} from "./interfaces/anime.interfaces";

const initialData: IHistoryData = {
   watch_list: [],
   current: null,
};

const historyStore = create<IHistoryStore>()(
   persist(
      (set, get) => ({
         ...initialData,
         addToWatchList(source: IWatchList) {
            set((state) => {
               state.watch_list.push(source);
               return { ...state };
            });
         },
         setCurrent(currentWatch) {
            const watchlist = get().watch_list;
            let current: CurrentWatch | undefined;
            let aniFlag = false;

            for (const wl of watchlist) {
               if (wl.animeId !== currentWatch.animeId) continue;
               aniFlag = true;
               let flag = false;

               for (const eps of wl.episodes) {
                  if (eps.episode?.id !== currentWatch.episode?.id)
                     continue;

                  flag = true;

                  eps.timestamp = currentWatch.timestamp;
                  eps.duration = currentWatch.duration;
                  eps.episode = currentWatch.episode;

                  current = {
                     animeId: currentWatch.aniName,
                     aniName: currentWatch.aniName,
                     episode: currentWatch.episode,
                     timestamp: currentWatch.timestamp,
                     duration: currentWatch.duration,
                  };

                  break;
               }

               if (flag) break;
            }

            if (!current) current = currentWatch;

            if (!aniFlag)
               watchlist.push({
                  animeId: current.animeId,
                  aniName: current.aniName,
                  episodes: [current],
               });

            set((state) => ({ ...state, current, watch_list: watchlist }));
         },
      }),
      {
         name: "history-data",
         storage: createJSONStorage(() => localStorage),
      }
   )
);

export default historyStore;
