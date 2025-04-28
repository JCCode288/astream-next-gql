import Link from "next/link";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { Star } from "lucide-react";
import { IAnimeResult } from "@consumet/extensions";

export default function SimilarAnimeCard({ rec }: { rec: IAnimeResult }) {
   return (
      <Link href={"/anime/" + rec.id} className="group cursor-pointer">
         <Card className="overflow-hidden bg-zinc-900 border-zinc-800 transition-all hover:border-rose-500/50 hover:shadow-md hover:shadow-rose-500/10 aspect-[3/5]">
            <div className="aspect-[2/3] relative overflow-hidden">
               <Image
                  src={rec.image!}
                  alt={rec.id}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
               />
            </div>
            <CardContent className="p-3">
               <h3 className="font-medium line-clamp-1 group-hover:text-rose-500 transition-colors text-gray-300">
                  {rec.title as string}
               </h3>
               <div className="flex items-center justify-between mt-1 text-xs text-zinc-400">
                  <span>{rec.releaseDate}</span>
                  {rec.rating && (
                     <div className="flex items-center">
                        <Star className="h-3 w-3 fill-yellow-500 text-yellow-500 mr-1" />
                        <span>{rec.rating}</span>
                     </div>
                  )}
               </div>
            </CardContent>
         </Card>
      </Link>
   );
}
