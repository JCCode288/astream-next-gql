import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function BackHomeButton() {
   return (
      <div className="container relative z-10 pt-8">
         <Link
            href="/"
            className="inline-flex items-center text-sm text-zinc-400 hover:text-white transition-colors"
         >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Home
         </Link>
      </div>
   );
}
