import Image from "next/image";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Calendar, Info, Play, Plus } from "lucide-react";
import { Badge } from "../ui/badge";

export default function EpisodeCard({
   episodeNumber,
}: {
   episodeNumber: number;
}) {
   return (
      <Card className="bg-zinc-900 border-zinc-800 overflow-hidden hover:border-zinc-700 transition-colors">
         <div className="flex flex-col sm:flex-row">
            <div className="relative sm:w-48 aspect-video">
               <Image
                  src={`/placeholder.svg?height=1080&width=1920&text=Episode ${episodeNumber}`}
                  alt={`Episode ${episodeNumber}`}
                  height={1080}
                  width={1920}
                  className="object-cover"
               />
               <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 hover:opacity-100 transition-opacity">
                  <Button
                     size="sm"
                     className="gap-1 bg-rose-500 hover:bg-rose-600"
                  >
                     <Play className="h-4 w-4" />
                     Play
                  </Button>
               </div>
               {episodeNumber === 1 && (
                  <div className="absolute top-2 left-2">
                     <Badge className="bg-rose-500">NEW</Badge>
                  </div>
               )}
            </div>

            <div className="p-4 flex flex-col justify-between flex-1">
               <div>
                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-2">
                        <span className="font-medium">
                           Episode {episodeNumber}
                        </span>
                        {episodeNumber < 3 && (
                           <Badge
                              variant="outline"
                              className="text-xs border-zinc-700 text-zinc-400"
                           >
                              WATCHED
                           </Badge>
                        )}
                     </div>
                     <span className="text-sm text-zinc-400">24m</span>
                  </div>
                  <h3 className="font-medium mt-1">
                     {episodeNumber === 1
                        ? "Cruelty"
                        : episodeNumber === 2
                        ? "Trainer Sakonji Urokodaki"
                        : episodeNumber === 3
                        ? "Sabito and Makomo"
                        : `Episode Title ${episodeNumber}`}
                  </h3>
               </div>

               <div className="mt-2 text-sm text-zinc-400 line-clamp-2">
                  {episodeNumber === 1
                     ? "Tanjiro Kamado is a kind-hearted boy who sells charcoal for a living. His peaceful life is shattered when he returns home to find his family slaughtered by demons."
                     : "Tanjiro begins his training with the retired Demon Slayer, Sakonji Urokodaki, who puts him through rigorous physical tests to prepare him for the Final Selection."}
               </div>

               <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center text-sm text-zinc-400">
                     <Calendar className="h-4 w-4 mr-1" />
                     <span>Apr {episodeNumber + 5}, 2019</span>
                  </div>

                  <div className="flex gap-2">
                     <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 text-zinc-400 hover:text-white"
                     >
                        <Info className="h-4 w-4" />
                        <span className="sr-only">Details</span>
                     </Button>
                     <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 text-zinc-400 hover:text-white"
                     >
                        <Plus className="h-4 w-4" />
                        <span className="sr-only">Add to List</span>
                     </Button>
                  </div>
               </div>
            </div>
         </div>
      </Card>
   );
}
