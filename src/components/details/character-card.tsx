import Link from "next/link";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";

export default function CharacterCard({ index }: { index: number }) {
   const characters = [
      { name: "Tanjiro Kamado", role: "Main" },
      { name: "Nezuko Kamado", role: "Main" },
      { name: "Zenitsu Agatsuma", role: "Main" },
      { name: "Inosuke Hashibira", role: "Main" },
      { name: "Giyu Tomioka", role: "Supporting" },
      { name: "Shinobu Kocho", role: "Supporting" },
      { name: "Kyojuro Rengoku", role: "Supporting" },
      { name: "Muzan Kibutsuji", role: "Antagonist" },
   ];

   const character = characters[index] || {
      name: `Character ${index + 1}`,
      role: "Supporting",
   };

   return (
      <Link href="#" className="group">
         <Card className="overflow-hidden bg-zinc-900 border-zinc-800 transition-all hover:border-rose-500/50">
            <div className="aspect-[3/4] relative">
               <Image
                  src={`/placeholder.svg?height=400&width=300&text=${character.name}`}
                  alt={character.name}
                  fill
                  className="object-cover"
               />
            </div>
            <CardContent className="p-3">
               <h3 className="font-medium line-clamp-1 group-hover:text-rose-500 transition-colors">
                  {character.name}
               </h3>
               <div className="text-xs text-zinc-400">
                  {character.role}
               </div>
            </CardContent>
         </Card>
      </Link>
   );
}
