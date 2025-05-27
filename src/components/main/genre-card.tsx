import Link from "next/link";
import { Card } from "../ui/card";
import Image from "next/image";

export default function GenreCard({ genre }: { genre: string }) {
   return (
      <Link href="#" className="group">
         <Card className="overflow-hidden bg-zinc-900 border-zinc-800 transition-all hover:border-rose-500/50">
            <div className="aspect-video relative">
               <Image
                  src={`/placeholder.svg?height=180&width=320&text=${genre}`}
                  alt={genre}
                  fill
                  className="object-cover brightness-75 group-hover:brightness-100 transition-all"
               />
               <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="font-bold text-white text-lg">{genre}</h3>
               </div>
            </div>
         </Card>
      </Link>
   );
}
