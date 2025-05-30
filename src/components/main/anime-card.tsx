"use client";

import Link from "next/link";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { IAnimeResult } from "@consumet/extensions";
import { durationToHourMin } from "@/lib/utils.duration";

export default function AnimeCard({ anime }: { anime: IAnimeResult }) {
   const { cover, title, id, image, releaseDate, duration } = anime;
   const imageUrl = cover ?? image;

   return (
      <Link href={"/anime/" + id} className="group flex justify-center">
         <Card className="overflow-hidden bg-zinc-900 border-zinc-800 transition-all hover:border-rose-500/50 hover:shadow-md hover:shadow-rose-500/10 max-w-72 w-full p-1">
            {!!imageUrl && (
               <div className="aspect-[4/5] relative overflow-hidden">
                  <Image
                     src={imageUrl}
                     alt={title as string}
                     className="object-cover transition-transform group-hover:scale-105"
                     loading="eager"
                     height={450}
                     width={300}
                  />
               </div>
            )}
            <CardContent className="p-3">
               <h3 className="font-medium line-clamp-1 group-hover:text-rose-500 transition-colors text-gray-300">
                  {title.toString()}
               </h3>
               <div className="flex items-center justify-between mt-1 text-xs text-zinc-400">
                  <span>{releaseDate}</span>
               </div>
               {!!duration && (
                  <div className="flex items-center justify-between mt-1 text-xs text-zinc-400">
                     <span>{durationToHourMin(duration)}</span>
                  </div>
               )}
            </CardContent>
         </Card>
      </Link>
   );
}
