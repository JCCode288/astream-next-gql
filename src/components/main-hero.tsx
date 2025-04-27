import Image from "next/image";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Play, Star } from "lucide-react";
import { IAnimeResult } from "@consumet/extensions";

export interface IMainHeroProps {
   highlighted: IAnimeResult;
}

export default function MainHero({ highlighted }: IMainHeroProps) {
   return (
      <>
         <div className="absolute inset-0 z-0">
            <Image
               src={highlighted.cover ?? highlighted.image!}
               alt={`hero-${highlighted.id}`}
               className="object-cover brightness-50"
               height={1080}
               width={1920}
               priority
            />
         </div>
         <div className="container relative z-10 flex h-full flex-col justify-end pb-16 pt-24">
            <Badge className="mb-4 w-fit bg-rose-500 hover:bg-rose-600">
               Highlighted
            </Badge>
            <h1 className="mb-2 max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
               {highlighted.title as string}
            </h1>
            <div className="flex flex-wrap gap-3">
               <Button className="gap-2 bg-rose-500 hover:bg-rose-600">
                  <Play className="h-4 w-4" />
                  Watch Now
               </Button>
               <Button
                  variant="outline"
                  className="border-zinc-700 bg-zinc-900/50 text-white hover:bg-zinc-900 hover:text-white"
               >
                  + Add to My List
               </Button>
            </div>
            <div className="mt-6 flex items-center gap-4">
               {highlighted.rating && (
                  <div className="flex items-center">
                     <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                     <span className="ml-1 text-sm font-medium">
                        {highlighted.rating}
                     </span>
                  </div>
               )}
               {highlighted.releaseDate && (
                  <div className="text-sm text-zinc-400">
                     {highlighted.releaseDate}
                  </div>
               )}
               {highlighted.type && (
                  <div className="text-sm text-zinc-400">
                     {highlighted.type}
                  </div>
               )}
            </div>
         </div>
      </>
   );
}
