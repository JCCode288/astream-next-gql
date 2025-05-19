"use client";

import { ChevronLeft } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function PreviousButton() {
   const router = useRouter();

   const handleBack = () => {
      router.back();
   };

   return (
      <div className="container relative z-10 pt-8">
         <Button
            onClick={handleBack}
            className="inline-flex items-center text-sm text-zinc-400 hover:text-white bg-transparent cursor-pointer transition-colors"
         >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back
         </Button>
      </div>
   );
}
