"use client";

import Link from "next/link";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import { Play, Star } from "lucide-react";
import { IAnimeResult } from "@consumet/extensions";
import { useMemo } from "react";

export default function AnimeCard({ anime }: { anime: IAnimeResult }) {
   const { cover, title, id, image } = anime;

   return (
      <Link href={"/anime/" + id} className="group">
         <Card className="overflow-hidden bg-zinc-900 border-zinc-800 transition-all hover:border-rose-500/50 hover:shadow-md hover:shadow-rose-500/10 max-w-72 w-full p-1">
            <div className="aspect-[4/5] relative overflow-hidden">
               <Image
                  src={cover ?? image!}
                  alt={title as string}
                  className="object-cover transition-transform group-hover:scale-105"
                  height={450}
                  width={300}
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                  <Button
                     size="sm"
                     variant="ghost"
                     className="gap-1 text-white"
                  >
                     <Play className="h-4 w-4" />
                     Watch
                  </Button>
               </div>
            </div>
            <CardContent className="p-3">
               <h3 className="font-medium line-clamp-1 group-hover:text-rose-500 transition-colors text-gray-300">
                  {title.toString()}
               </h3>
               <div className="flex items-center justify-between mt-1 text-xs text-zinc-400">
                  <span>2023</span>
               </div>
            </CardContent>
         </Card>
      </Link>
   );
}
