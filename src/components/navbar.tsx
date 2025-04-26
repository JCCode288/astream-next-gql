"use client";
import authStore from "@/lib/stores/auth.store";
import Link from "next/link";
import UserMenu from "./auth/user-menu";
import GoogleButton from "./auth/google-button";

export default function Navbar() {
   const isLoggedIn = authStore().isLoggedIn;

   return (
      <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
         <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center gap-6">
               <Link
                  href="/"
                  className="flex items-center font-bold text-xl text-white"
               >
                  <span className="text-rose-500 text-2xl">A</span>stream
               </Link>
               <nav className="hidden md:flex gap-6">
                  <Link
                     href="/"
                     className="text-sm font-medium text-zinc-400 transition-colors hover:text-white"
                  >
                     Home
                  </Link>
                  <Link
                     href="/categories"
                     className="text-sm font-medium text-zinc-400 transition-colors hover:text-white"
                  >
                     Categories
                  </Link>
                  <Link
                     href="/mylist"
                     className="text-sm font-medium text-zinc-400 transition-colors hover:text-white"
                  >
                     My List
                  </Link>
               </nav>
            </div>
            <div className="flex items-center gap-4">
               {isLoggedIn ? <UserMenu /> : <GoogleButton />}
            </div>
         </div>
      </header>
   );
}
