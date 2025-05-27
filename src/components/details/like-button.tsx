import { Heart } from "lucide-react";
import { Button } from "../ui/button";

export interface ILikeButtonProps {
   liked?: boolean;
}

export default function LikeButton({ liked = false }: ILikeButtonProps) {
   return (
      <Button
         variant="outline"
         size="icon"
         className="border-zinc-700 bg-zinc-900/50 text-white hover:bg-zinc-900 hover:text-rose-500 hover:border-rose-500 cursor-pointer"
      >
         <Heart
            className={`h-4 w-4 ${liked ? "bg-rose-500" : "bg-none"}`}
         />
      </Button>
   );
}
