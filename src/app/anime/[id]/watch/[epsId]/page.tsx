"use client";

import type React from "react";

import { useCallback, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import useWatchAnime from "@/hooks/useWatch";
import Loading from "./loading";
import { Badge } from "@/components/ui/badge";
import { IAnimeEpisode } from "@consumet/extensions";
import Player from "@/components/player";
import PreviousButton from "@/components/back-home-button";
import historyStore from "@/lib/stores/history.store";
import { SavePlayback } from "@/lib/stores/interfaces/anime.interfaces";

export default function WatchPage() {
   const { id: animeId, epsId: episodeId } = useParams();

   const id = `${animeId}$episode$${episodeId}`;

   const {
      loading,
      anime,
      watch: episode,
   } = useWatchAnime(animeId as string, id);

   const addToWatchList = historyStore().addToWatchList;

   const currentEpisode = useMemo(() => {
      return anime?.episodes?.find((ani: IAnimeEpisode) => ani.id === id);
   }, [episode, anime]);

   const saveHist = useCallback(
      (data: SavePlayback) => {
         // @notes - saving it to store for later implementation of load and save on app initialization
         if (!currentEpisode) return;

         addToWatchList({
            animeId: anime.id,
            aniName: anime.title.toString(),
            img: anime.image,
            episode: currentEpisode,
            timestamp: data.timestamp,
            duration: data.duration,
         });
      },
      [currentEpisode]
   );

   if (loading || !anime || !animeId || !episodeId) return <Loading />;

   return (
      <div className="min-h-screen bg-black text-white flex flex-col">
         {/* Video Player Container */}
         <PreviousButton />
         <div>
            <h1 className="mt-4 mb-2 lg:ml-4 md:ml-2 ml-1">
               {anime.title.toString()} - {currentEpisode?.number}
            </h1>
         </div>
         <Player
            epsId={episodeId?.toString()}
            animeId={animeId?.toString()}
            key={`${episodeId?.toString()}-${animeId?.toString()}`}
            save={saveHist}
         />

         {/* Episode Information Section */}
         <div className="container py-6">
            <div className="flex items-center justify-between mb-4">
               <div>
                  {/* <h1 className="text-xl font-bold">
                     Episode {episode.number}: {episode.title}
                  </h1> */}
                  <div className="flex items-center gap-2 text-sm text-zinc-400 mt-1">
                     <span>•</span>
                     <span>HD</span>
                     <span>•</span>
                     <span>SUB</span>
                  </div>
               </div>

               <div className="flex gap-2">
                  {/* episode.prevEpisode && (
                     <Button
                        variant="outline"
                        className="border-zinc-700 bg-zinc-900/50 text-white hover:bg-zinc-900 hover:text-white"
                        onClick={() =>
                           navigateToEpisode(episode.prevEpisode!)
                        }
                     >
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        Previous
                     </Button>
                  ) */}

                  {/*episode.nextEpisode && (
                     <Button
                        className="bg-rose-500 hover:bg-rose-600"
                        onClick={() =>
                           navigateToEpisode(episode.nextEpisode!)
                        }
                     >
                        Next
                        <ChevronRight className="h-4 w-4 ml-1" />
                     </Button>
                  ) */}
               </div>
            </div>

            {/* <p className="text-zinc-300 mb-6">{episode.description}</p> */}

            <Separator className="bg-zinc-800 mb-6" />

            {/* Episode List */}
            <div>
               <h2 className="text-lg font-bold mb-4">Episodes</h2>

               <div className="grid grid-cols-1 mx-4 sm:mx-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {/* Handle Episode pagination */}
                  {anime.episodes?.map((eps: IAnimeEpisode) => {
                     const isCurrentEpisode =
                        eps.id === currentEpisode?.id;

                     const splitted = eps.id.split("$");
                     const epId = splitted[splitted.length - 1];

                     return (
                        <Link
                           key={"eps-" + epId}
                           href={`/anime/${animeId}/watch/${epId}`}
                           className={cn(
                              "group relative aspect-video overflow-hidden rounded-md border-2",
                              isCurrentEpisode
                                 ? "border-rose-500"
                                 : "border-transparent hover:border-zinc-700"
                           )}
                        >
                           {eps.image && (
                              <Image
                                 src={eps.image!}
                                 alt={`Episode ${eps.number}`}
                                 fill
                                 className="object-cover"
                              />
                           )}

                           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-2">
                              <span className="text-sm font-medium">
                                 Episode {eps.number}
                              </span>
                              {isCurrentEpisode && (
                                 <Badge className="absolute top-2 right-2 bg-rose-500">
                                    Current
                                 </Badge>
                              )}
                           </div>
                        </Link>
                     );
                  })}
               </div>
            </div>
         </div>
      </div>
   );
}
