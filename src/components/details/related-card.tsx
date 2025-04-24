import Link from "next/link";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import { Play, Star } from "lucide-react";

export default function RelatedAnimeCard({ index }: { index: number }) {
   const titles = [
      "Demon Slayer: Mugen Train",
      "Demon Slayer: Entertainment District Arc",
      "Demon Slayer: Swordsmith Village Arc",
      "Demon Slayer: Hashira Training Arc",
      "Demon Slayer: Infinity Castle Arc",
      "Jujutsu Kaisen",
      "Attack on Titan",
      "My Hero Academia",
      "Chainsaw Man",
      "Spy x Family",
   ];

   const title = titles[index] || `Related Anime ${index + 1}`;

   return (
      <Link href="#" className="group">
         <Card className="overflow-hidden bg-zinc-900 border-zinc-800 transition-all hover:border-rose-500/50 hover:shadow-md hover:shadow-rose-500/10">
            <div className="aspect-[2/3] relative overflow-hidden">
               <Image
                  src={`/placeholder.svg?height=450&width=300&text=${
                     index < 5 ? "Related" : "Recommended"
                  }`}
                  alt={title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
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
               <h3 className="font-medium line-clamp-1 group-hover:text-rose-500 transition-colors">
                  {title}
               </h3>
               <div className="flex items-center justify-between mt-1 text-xs text-zinc-400">
                  <span>{2019 + (index % 5)}</span>
                  <div className="flex items-center">
                     <Star className="h-3 w-3 fill-yellow-500 text-yellow-500 mr-1" />
                     <span>{(4 + (index % 10) / 10).toFixed(1)}</span>
                  </div>
               </div>
            </CardContent>
         </Card>
      </Link>
   );
}
