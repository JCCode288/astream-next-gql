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
import { useMemo, useState } from "react";
import Loading from "./loading";
import capitalize from "@/lib/utils.capitalize";

export default function HomePage() {
   const { loading, error, animes } = useMainAnimes();

   console.log(animes);

   const [tabVal, setTabVal] = useState(() => "recent");
   const sectionName = useMemo(() => {
      return `${capitalize(tabVal)} Animes`;
   }, [tabVal]);

   if (loading)
      return (
         <div className="flex-1">
            <Loading />
         </div>
      );

   if (!animes || error)
      return (
         <div
            className="flex flex-1 bg-black text-white text-center
   "
         >
            Server had trouble. Please comeback again later
         </div>
      );

   return (
      <div className="flex flex-1 flex-col bg-black text-white justify-center items-center">
         <main>
            {/* Hero Section */}
            {animes?.datas?.highlighted && (
               <section className="relative h-[70dvh] overflow-hidden">
                  <MainHero
                     highlighted={animes.datas?.highlighted?.results[0]}
                  />
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
                     <div className="flex items-center justify-between mb-6 gap-2 flex-col md:flex-row">
                        <h2 className="text-2xl font-bold">
                           {sectionName}
                        </h2>
                        <TabsList className="bg-zinc-900">
                           {animes.keys.map((k, i) => {
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

                     {animes.keys.map((k, i) => {
                        const animeDatas = animes?.datas[k];
                        if (!animeDatas) return null;

                        return (
                           <TabsContent
                              key={`content-${i}`}
                              value={k}
                              className="mt-0"
                           >
                              <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                 {animeDatas.results.map((anime, i) => (
                                    <AnimeCard key={i} anime={anime} />
                                 ))}
                              </div>
                           </TabsContent>
                        );
                     })}
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
