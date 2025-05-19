"use client";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import {
   CurrentWatch,
   IHistoryData,
   IHistoryStore,
   IWatchEpisodes,
   IWatchList,
} from "./interfaces/anime.interfaces";

const initialData: IHistoryData = {
   watch_list: [],
};

const historyStore = create<IHistoryStore>()(
   persist(
      (set, get) => ({
         ...initialData,
         getCurrent(animeId, episodeId) {
            const watchlist = get().watch_list;

            for (const wl of watchlist) {
               if (wl.animeId !== animeId) continue;

               for (const eps of wl.episodes) {
                  const id = `${animeId}$episode$${episodeId}`;
                  if (eps?.episode?.id !== id) continue;

                  return {
                     animeId: animeId,
                     aniName: wl.aniName,
                     ...eps,
                  };
               }
            }

            return null;
         },
         addToWatchList(currentWatch) {
            const watchlist = get().watch_list;
            let anidex: number = -1;
            let epsFlag = false;

            for (let i = 0; i < watchlist.length; i++) {
               const wl = watchlist[i];

               if (wl.animeId !== currentWatch.animeId) continue;

               anidex = i;

               for (const eps of wl.episodes) {
                  if (eps.episode?.id !== currentWatch.episode?.id)
                     continue;

                  epsFlag = true;

                  eps.timestamp = currentWatch.timestamp;
                  eps.duration = currentWatch.duration;

                  break;
               }

               if (epsFlag) break;

               wl.episodes.push({
                  episode: currentWatch.episode,
                  timestamp: currentWatch.timestamp,
                  duration: currentWatch.duration,
               });
            }

            if (anidex >= 0 && epsFlag) {
               set((state) => ({ ...state, watch_list: watchlist }));
               return;
            }

            if (anidex >= 0 && !epsFlag) {
               watchlist[anidex].episodes.push({
                  episode: currentWatch.episode,
                  timestamp: currentWatch.timestamp,
                  duration: currentWatch.duration,
               });

               set((state) => ({ ...state, watch_list: watchlist }));
               return;
            }

            const { animeId, aniName, episode, timestamp, duration } =
               currentWatch;

            const watchdata = {
               animeId,
               aniName,
               episodes: [
                  {
                     episode,
                     timestamp,
                     duration,
                  },
               ],
            };

            watchlist.push(watchdata);

            set((state) => ({ ...state, watch_list: watchlist }));
         },
      }),
      {
         name: "history-data",
         storage: createJSONStorage(() => localStorage),
      }
   )
);

export default historyStore;
