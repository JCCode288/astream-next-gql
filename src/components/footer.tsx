import Image from "next/image";
import Link from "next/link";

export default function Footer() {
   return (
      <footer className="border-t border-zinc-800 bg-zinc-950 py-2">
         <div className="grid grid-cols-1 ">
            <div className="flex gap-2 items-center">
               <Link
                  href="/"
                  className="my-2 flex items-center gap-1 font-bold text-xl text-white"
               >
                  <span className="text-rose-500">A</span>stream
               </Link>
               <p className="text-sm mt-3 mb-2 text-zinc-400">
                  The best place to stream your favorite anime shows and
                  movies.
               </p>
            </div>
         </div>
         <div className="my-4 border-t border-zinc-800 pt-8 text-center">
            <p className="text-sm text-zinc-400">
               &copy;2025 Astream. All rights reserved.
            </p>
         </div>
      </footer>
   );
}
