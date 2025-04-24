import Image from "next/image";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

export default function UpcomingCard({ index }: { index: number }) {
   const date = new Date();
   date.setDate(date.getDate() + (index + 1) * 3);

   return (
      <Card className="overflow-hidden bg-zinc-900 border-zinc-800 flex">
         <div className="w-24 sm:w-32 shrink-0 bg-zinc-800 flex flex-col items-center justify-center p-3">
            <span className="text-sm text-zinc-400">
               {date.toLocaleString("default", { month: "short" })}
            </span>
            <span className="text-2xl font-bold">{date.getDate()}</span>
            <span className="text-sm text-zinc-400">
               {date.toLocaleString("default", { weekday: "short" })}
            </span>
         </div>
         <div className="flex flex-1 items-center p-4">
            <div className="mr-4 relative w-16 h-16 sm:w-20 sm:h-20 shrink-0">
               <Image
                  src={`/placeholder.svg?height=80&width=80&text=${
                     index + 1
                  }`}
                  alt={`Upcoming Anime ${index + 1}`}
                  fill
                  className="object-cover rounded"
               />
            </div>
            <div className="flex-1">
               <h3 className="font-medium">
                  Upcoming Anime Title {index + 1}
               </h3>
               <p className="text-sm text-zinc-400">
                  Season {index + 2} • Episode {index + 1}
               </p>
               <div className="mt-2 flex items-center gap-2">
                  <Badge
                     variant="outline"
                     className="text-xs border-zinc-700"
                  >
                     {index % 2 === 0 ? "SUB" : "DUB"}
                  </Badge>
                  <span className="text-xs text-zinc-400">
                     {index % 2 === 0 ? "9:00 PM" : "10:30 PM"} JST
                  </span>
               </div>
            </div>
            <Button
               size="sm"
               variant="outline"
               className="shrink-0 border-zinc-700 hover:bg-rose-500 hover:text-white hover:border-rose-500"
            >
               Remind Me
            </Button>
         </div>
      </Card>
   );
}
