"use client";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import {
   IHistoryData,
   IHistoryStore,
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

               const id = `${animeId}$episode$${episodeId}`;

               const eps = wl.episodes[id];
               if (eps)
                  return {
                     animeId: animeId,
                     aniName: wl.aniName,
                     img: wl.img,
                     ...eps,
                  };
            }

            return null;
         },
         addToWatchList(currentWatch) {
            const watchlist = get().watch_list;
            let anidex: number = -1;
            let epsFlag = false;
            let isFinished = false;
            let finishDuration = 0;
            let startDuration = currentWatch.duration * 0.1;
            let isStarted = currentWatch.timestamp >= startDuration;

            if (currentWatch.duration > 60 * 10) {
               // finished situation 75% (quartile 3)
               finishDuration = currentWatch.duration * 0.75;
            } else {
               // finished situation 90%
               finishDuration = currentWatch.duration * 0.9;
            }

            if (currentWatch.timestamp >= finishDuration)
               isFinished = true;

            for (let i = 0; i < watchlist.length; i++) {
               const wl = watchlist[i];

               if (wl.animeId !== currentWatch.animeId) continue;

               anidex = i;
               const epsId = currentWatch?.episode?.id;
               const eps = wl.episodes[epsId];

               if (!eps) break;

               epsFlag = true;

               eps.timestamp = currentWatch.timestamp;
               eps.duration = currentWatch.duration;
               eps.started = isStarted;
               eps.finished = isFinished;
            }

            // case updated
            if (anidex >= 0 && epsFlag) {
               set((state) => ({ ...state, watch_list: watchlist }));
               return;
            }

            // case new eps recorded
            if (anidex >= 0 && !epsFlag) {
               const id = currentWatch.episode.id;

               watchlist[anidex].episodes[id] = {
                  episode: currentWatch.episode,
                  timestamp: currentWatch.timestamp,
                  duration: currentWatch.duration,
                  started: isStarted,
                  finished: isFinished,
               };

               set((state) => ({ ...state, watch_list: watchlist }));
               return;
            }

            // case new anime recorded
            const { animeId, aniName, img, episode, timestamp, duration } =
               currentWatch;

            const watchdata: IWatchList = {
               animeId,
               aniName,
               img,
               episodes: {
                  [episode.id]: {
                     episode,
                     timestamp,
                     duration,
                     started: isStarted,
                     finished: isFinished,
                  },
               },
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
