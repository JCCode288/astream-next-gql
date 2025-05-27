"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import {
   Tabs,
   TabsContent,
   TabsList,
   TabsTrigger,
} from "@/components/ui/tabs";
import AnimeCard from "@/components/main/anime-card";
import capitalize from "@/lib/utils.capitalize";
import animeStore from "@/lib/stores/animes.store";
import historyStore from "@/lib/stores/history.store";
import { IWatchList } from "@/lib/stores/interfaces/anime.interfaces";
import MainTabsContent from "./main-tabs-content";

export default function MainTabs({ animes, loading, error }: any) {
   const recentPage = animeStore().recent_page;
   const topPage = animeStore().top_page;
   const moviePage = animeStore().movie_page;
   const popularPage = animeStore().popular_page;

   const setRecentPage = animeStore().setRecentPage;
   const setTopPage = animeStore().setTopPage;
   const setMoviePage = animeStore().setMoviePage;
   const setPopularPage = animeStore().setPopularPage;
   const watchlist = historyStore().watch_list;

   const [tabVal, setTabVal] = useState(() =>
      !watchlist.length ? "recent" : "watchlist"
   );
   const sectionName = useMemo(() => {
      return `${capitalize(tabVal)} Animes`;
   }, [tabVal]);

   const baseRef = useRef<HTMLDivElement>(null);
   useEffect(() => {
      if (window && baseRef.current) baseRef.current.scrollTo({ top: 0 });
   }, []);

   const paginations = useMemo(() => {
      if (!animes) return {};
      return Object.fromEntries(
         animes?.keys.map((key: string) => {
            switch (key) {
               case "on_going":
                  return [key, null];
               case "top":
                  return [key, { current: topPage, func: setTopPage }];
               case "movies":
                  return [key, { current: moviePage, func: setMoviePage }];
               case "recent":
                  return [
                     key,
                     { current: recentPage, func: setRecentPage },
                  ];
               case "popular":
                  return [
                     key,
                     { current: popularPage, func: setPopularPage },
                  ];
               default:
                  return [key, null];
            }
         })
      );
   }, [animes]);

   if (!loading && (!animes || !!error))
      return (
         <div
            className="flex-1 bg-black text-white text-center
"
         >
            Server had trouble. Please comeback again later
         </div>
      );

   return (
      <Tabs value={tabVal} onValueChange={setTabVal} className="mb-12">
         <div
            className="flex items-center justify-between mb-6 gap-2 flex-col md:flex-row"
            ref={baseRef}
         >
            <h2 className="text-2xl font-bold">{sectionName}</h2>
            <TabsList className="bg-zinc-900">
               {!!watchlist.length && (
                  <TabsTrigger
                     value={"watchlist"}
                     className="data-[state=active]:bg-rose-500"
                  >
                     On Going
                  </TabsTrigger>
               )}

               {animes?.keys.map((k: string, i: number) => {
                  return (
                     <TabsTrigger
                        key={`key-${i}`}
                        value={k}
                        className="data-[state=active]:bg-rose-500"
                     >
                        {capitalize(k)}
                     </TabsTrigger>
                  );
               })}
            </TabsList>
         </div>

         {!!watchlist.length && (
            <TabsContent value={"watchlist"} className="mt-0">
               <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {watchlist.map((wl: IWatchList, i: number) => (
                     <AnimeCard
                        key={`watchlist-${i}`}
                        anime={{
                           title: wl.aniName,
                           image: wl.img,
                           id: wl.animeId,
                        }}
                     />
                  ))}
               </div>
            </TabsContent>
         )}

         {animes?.keys.map((k: string, i: number) => {
            const animeDatas = animes?.datas[k];
            if (!animeDatas) return null;

            const pagination = paginations[k];

            return (
               <MainTabsContent
                  animes={animeDatas}
                  pagination={pagination}
                  key={`content-${i}`}
                  loading={loading}
                  tab={k}
               />
            );
         })}
      </Tabs>
   );
}
