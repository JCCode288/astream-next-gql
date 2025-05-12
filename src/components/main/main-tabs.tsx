"use client";
import { useMemo, useState } from "react";
import {
   Tabs,
   TabsContent,
   TabsList,
   TabsTrigger,
} from "@/components/ui/tabs";
import AnimeCard from "@/components/main/anime-card";
import capitalize from "@/lib/utils.capitalize";

export default function MainTabs({ animes }: any) {
   const [tabVal, setTabVal] = useState(() => "recent");
   const sectionName = useMemo(() => {
      return `${capitalize(tabVal)} Animes`;
   }, [tabVal]);

   return (
      <Tabs
         defaultValue="recent"
         value={tabVal}
         onValueChange={setTabVal}
         className="mb-12"
      >
         <div className="flex items-center justify-between mb-6 gap-2 flex-col md:flex-row">
            <h2 className="text-2xl font-bold">{sectionName}</h2>
            <TabsList className="bg-zinc-900">
               {animes.keys.map((k: string, i: number) => {
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

         {animes.keys.map((k: any, i: number) => {
            const animeDatas = animes?.datas[k];
            if (!animeDatas) return null;

            return (
               <TabsContent
                  key={`content-${i}`}
                  value={k}
                  className="mt-0"
               >
                  <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                     {animeDatas.results.map((anime: any, i: number) => (
                        <AnimeCard key={i} anime={anime} />
                     ))}
                  </div>
               </TabsContent>
            );
         })}
      </Tabs>
   );
}
