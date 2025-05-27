"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { Play } from "lucide-react";

export default function WatchButton({ eps, id, isContinue }: any) {
   return (
      <Link
         href={`/anime/${id}/watch/${eps}`}
         className="flex-1 flex gap-2"
      >
         <Button className="bg-rose-500 hover:bg-rose-600 flex-1 cursor-pointer">
            <Play className="h-4 w-4" />
            {isContinue ? "Continue" : "Watch"}
         </Button>
      </Link>
   );
}
