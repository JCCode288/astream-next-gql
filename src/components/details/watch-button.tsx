"use client";

import Link from "next/link";
import { useMemo } from "react";
import { Button } from "../ui/button";
import { Play } from "lucide-react";

export default function WatchButton({ eps, id }: any) {
   const firstEps = useMemo(() => {
      if (!eps?.length) return null;

      const splitted = eps[0].id.split("$");
      return splitted[splitted.length - 1];
   }, [eps]);
   return (
      <Link
         href={`/anime/${id}/watch/${firstEps}`}
         className="flex-1 flex gap-2"
      >
         <Button className="bg-rose-500 hover:bg-rose-600 flex-1 cursor-pointer">
            <Play className="h-4 w-4" />
            Watch
         </Button>
      </Link>
   );
}
