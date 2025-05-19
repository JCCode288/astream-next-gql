"use client";

import Image from "next/image";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Calendar, Play } from "lucide-react";
import { Badge } from "../ui/badge";
import { IAnimeEpisode } from "@consumet/extensions";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function EpisodeCard({
   animeId,
   episode,
   latest,
   watched,
}: {
   animeId: string;
   episode: IAnimeEpisode;
   latest: boolean;
   watched: boolean;
}) {
   const splitted = episode.id.split("$");
   const epsId = splitted.length
      ? splitted[splitted.length - 1]
      : episode.id;

   return (
      <Link href={animeId + "/watch/" + epsId}>
         <Card className="bg-zinc-900 border-zinc-800 overflow-hidden hover:border-zinc-700 transition-colors text-zinc-400 cursor-pointer">
            <div className="flex flex-col sm:flex-row">
               <div className="relative sm:w-48 aspect-video">
                  {episode.image && (
                     <Image
                        src={episode.image}
                        alt={episode.title!}
                        height={1080}
                        width={1920}
                        className="object-cover"
                     />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 hover:opacity-100 transition-opacity">
                     <Button
                        size="sm"
                        className="cursor-pointer gap-1 bg-rose-500 hover:bg-rose-600"
                     >
                        <Play className="h-4 w-4" />
                        Play
                     </Button>
                  </div>
                  {latest && (
                     <div className="absolute top-2 left-2">
                        <Badge className="bg-rose-500">Latest</Badge>
                     </div>
                  )}
               </div>

               <div className="p-4 flex flex-col justify-between flex-1">
                  <div>
                     <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                           <span className="font-medium">
                              Episode {episode.number}
                           </span>
                           {watched && (
                              <Badge
                                 variant="outline"
                                 className="text-xs border-zinc-700 text-zinc-400"
                              >
                                 WATCHED
                              </Badge>
                           )}
                        </div>
                     </div>
                     <h3 className="font-medium mt-1">{episode.title}</h3>
                  </div>

                  <div className="mt-2 text-sm text-zinc-400 line-clamp-3">
                     {episode.description}
                  </div>

                  <div className="flex items-center justify-between mt-3">
                     <div className="flex items-center text-sm text-zinc-400">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{episode.releaseDate}</span>
                     </div>

                     {/* <div className="flex gap-2">
                        <Button
                           variant="ghost"
                           size="sm"
                           className="h-8 text-zinc-400 hover:text-zinc-800"
                        >
                           <Info className="h-4 w-4" />
                           <span className="sr-only">Details</span>
                        </Button>
                        <Button
                           variant="ghost"
                           size="sm"
                           className="h-8 text-zinc-400 hover:text-zinc-800"
                        >
                           <Plus className="h-4 w-4" />
                           <span className="sr-only">Add to List</span>
                        </Button>
                     </div> */}
                  </div>
               </div>
            </div>
         </Card>
      </Link>
   );
}
