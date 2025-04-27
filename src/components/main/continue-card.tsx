import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Clock, Play } from "lucide-react";
import { IAnimeEpisode } from "@consumet/extensions";

export default function ContinueWatchingCard({
   anime,
}: {
   anime: IAnimeEpisode;
}) {
   return (
      <Card className="overflow-hidden bg-zinc-900 border-zinc-800">
         <div className="aspect-video relative">
            <Image
               src={anime.image!}
               alt={anime.id}
               height={1080}
               width={1920}
               className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4">
               <h3 className="font-medium text-white">
                  {anime.title as string}
               </h3>
               <p className="text-sm text-zinc-300">
                  Episode {anime.number}
               </p>
            </div>
            <Button
               size="icon"
               className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-rose-500/90 hover:bg-rose-600 h-12 w-12 rounded-full"
            >
               <Play className="h-6 w-6" />
               <span className="sr-only">Play</span>
            </Button>
            {/* Progress Bar */}
            {/* <div className="absolute bottom-0 left-0 right-0 h-1 bg-zinc-700">
               <div
                  className="h-full bg-rose-500"
                  style={{ width: `${30 + index * 15}%` }}
               />
            </div> */}
         </div>
         <CardContent className="p-3 flex items-center justify-between">
            <Button
               variant="ghost"
               size="sm"
               className="h-8 text-zinc-400 hover:text-white"
            >
               Details
            </Button>
         </CardContent>
      </Card>
   );
}
