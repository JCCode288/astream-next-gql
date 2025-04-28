import { ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import UpcomingCard from "./upcoming-card";

export interface IUpcomingProps {
   upcomings: Record<string, any>[]; //placeholder
}

export default function MainUpcoming({ upcomings }: IUpcomingProps) {
   return (
      <div>
         <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Upcoming Releases</h2>
            <Button
               variant="link"
               className="text-rose-500 hover:text-rose-400 p-0"
            >
               View Calendar <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
               <UpcomingCard key={i} index={i} />
            ))}
         </div>
      </div>
   );
}
