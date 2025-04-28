"use client";

import {
   Tabs,
   TabsContent,
   TabsList,
   TabsTrigger,
} from "@/components/ui/tabs";
import AnimeCard from "@/components/main/anime-card";
import useMainAnimes from "@/components/hooks/useAnimes";
import MainHero from "@/components/main/main-hero";
import MainGenres from "@/components/main/main-genres";
import { useMemo, useState } from "react";
import Loading from "./loading";

export default function HomePage() {
   const { loading, error, animes } = useMainAnimes();

   const [tabVal, setTabVal] = useState(() => "recent");
   const sectionName = useMemo(() => {
      switch (tabVal) {
         case "recent":
            return "Recent Anime";
         case "trending":
            return "Trending Anime";
         case "movies":
            return "Anime Movies";
         case "popular":
            return "Popular Animes";
         default:
            return "Animes";
      }
   }, [tabVal]);

   if (loading)
      return (
         <div className="flex-1">
            <Loading />
         </div>
      );
   if (!animes)
      return (
         <div
            className="flex flex-1 bg-black text-white text-center
   "
         >
            Server had trouble. Please comeback again later
         </div>
      );

   const { recent, top, popular, movies } = animes;

   return (
      <div className="flex flex-1 flex-col bg-black text-white justify-center items-center">
         <main>
            {/* Hero Section */}
            {animes.highlighted && (
               <section className="relative h-[70dvh] overflow-hidden">
                  <MainHero highlighted={animes.highlighted} />
               </section>
            )}

            {/* Content Sections */}
            <section className="py-12">
               <div className="container">
                  <Tabs
                     defaultValue="recent"
                     value={tabVal}
                     onValueChange={setTabVal}
                     className="mb-12"
                  >
                     <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold">
                           {sectionName}
                        </h2>
                        <TabsList className="bg-zinc-900">
                           <TabsTrigger
                              value="recent"
                              className="data-[state=active]:bg-rose-500"
                           >
                              Recent
                           </TabsTrigger>
                           <TabsTrigger
                              value="trending"
                              className="data-[state=active]:bg-rose-500"
                           >
                              Trending
                           </TabsTrigger>
                           <TabsTrigger
                              value="movies"
                              className="data-[state=active]:bg-rose-500"
                           >
                              Movies
                           </TabsTrigger>
                           <TabsTrigger
                              value="popular"
                              className="data-[state=active]:bg-rose-500"
                           >
                              Popular
                           </TabsTrigger>
                        </TabsList>
                     </div>

                     <TabsContent value="recent" className="mt-0">
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                           {recent.results.map((anime, i) => (
                              <AnimeCard key={i} anime={anime} />
                           ))}
                        </div>
                     </TabsContent>

                     <TabsContent value="trending" className="mt-0">
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                           {top.results.map((anime, i) => (
                              <AnimeCard key={i} anime={anime} />
                           ))}
                        </div>
                     </TabsContent>

                     <TabsContent value="movies" className="mt-0">
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                           {movies.results.map((anime, i) => (
                              <AnimeCard key={i} anime={anime} />
                           ))}
                        </div>
                     </TabsContent>

                     <TabsContent value="popular" className="mt-0">
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                           {popular.results.map((anime, i) => (
                              <AnimeCard key={i} anime={anime} />
                           ))}
                        </div>
                     </TabsContent>
                  </Tabs>

                  {/* Continue Watching Section */}
                  {/* <MainContinue histories={histories} /> */}

                  {/* Genres Section */}
                  {/* <MainGenres genres={genres} /> */}

                  {/* Upcoming Releases */}
                  {/* <MainUpcoming upcomings={upcomings} /> */}
               </div>
            </section>
         </main>
      </div>
   );
}
