"use client";
import authStore from "@/lib/stores/auth.store";
import Link from "next/link";
import UserMenu from "../auth/user-menu";
import GoogleButton from "../auth/google-button";
import SearchCombobox from "./search-combobox";

export default function Navbar() {
   const isLoggedIn = authStore().isLoggedIn;

   return (
      <header className="sticky flex top-0 z-50 w-full border-b border-zinc-800 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
         <div className="flex-1 mx-4 flex w-full min-h-16 max-h-24 h-full items-center justify-between">
            <div className="flex items-center gap-6">
               <Link
                  href="/"
                  className="flex items-center font-bold text-xl text-white"
               >
                  <span className="text-rose-500 text-2xl">A</span>
                  <p className="hidden md:block">stream</p>
               </Link>
               <nav className="hidden md:flex gap-6">
                  <Link
                     href="/"
                     className="text-sm font-medium text-zinc-400 transition-colors hover:text-white"
                  >
                     Home
                  </Link>
                  {/* <Link
                     href="/genres"
                     className="text-sm font-medium text-zinc-400 transition-colors hover:text-white"
                  >
                     Genres
                  </Link> */}
                  {/* <Link
                     href="/mylist"
                     className="text-sm font-medium text-zinc-400 transition-colors hover:text-white"
                  >
                     My List
                  </Link> */}
               </nav>
            </div>
            <div className="flex items-center gap-4">
               <div className="relative w-full max-w-sm">
                  <SearchCombobox />
               </div>
               {isLoggedIn ? <UserMenu /> : <GoogleButton />}
            </div>
         </div>
      </header>
   );
}
