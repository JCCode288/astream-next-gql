import { ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import GenreCard from "./main-card";

export interface IGenreProps {
   genres: string[];
}

export default function MainGenres({ genres }: IGenreProps) {
   return (
      <div className="mb-12">
         <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Top Genres</h2>
            <Button
               variant="link"
               className="text-rose-500 hover:text-rose-400 p-0"
            >
               Browse All <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
         </div>
         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {genres.map((genre, i) => (
               <GenreCard key={i} genre={genre} index={i} />
            ))}
         </div>
      </div>
   );
}
