import { IAnimeResult } from "@consumet/extensions";
import { Card } from "../ui/card";
import Image from "next/image";

export interface ISearchCardProps {
   anime: IAnimeResult;
}

export default function SearchCard({ anime }: ISearchCardProps) {
   const { title, image, cover } = anime;
   const imageUrl = cover ?? image;
   return (
      <Card className="flex flex-1 bg-zinc-900 border-zinc-800 text-gray-300 flex-row items-center justify-center p-2">
         <div className="flex max-w-1/3 bg-none">
            {imageUrl && (
               <Image
                  src={imageUrl}
                  alt={`image-${title}`}
                  className="aspect-3/4"
                  width={300}
                  height={400}
               />
            )}
         </div>
         <div className="flex-1 flex w-full bg-none">
            {title.toString()}
         </div>
      </Card>
   );
}
