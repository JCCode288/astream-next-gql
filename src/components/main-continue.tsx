import { ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import ContinueWatchingCard from "./main/continue-card";
import { IAnimeEpisode } from "@consumet/extensions";

export interface IContinueProps {
   histories: IAnimeEpisode[];
}

export default function MainContinue({ histories }: IContinueProps) {
   return (
      <div className="mb-12">
         <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Continue Watching</h2>
            <Button
               variant="link"
               className="text-rose-500 hover:text-rose-400 p-0"
            >
               See All <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
         </div>
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {histories.map((a, i) => (
               <ContinueWatchingCard key={`hist-${i}`} anime={a} />
            ))}
         </div>
      </div>
   );
}
