"use client";
import authStore from "@/lib/stores/auth.store";
import Link from "next/link";
import UserMenu from "./auth/user-menu";
import GoogleButton from "./auth/google-button";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import animeStore from "@/lib/stores/animes.store";
import { ChangeEvent, KeyboardEvent } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
   const isLoggedIn = authStore().isLoggedIn;
   const router = useRouter();

   const query = animeStore().query;
   const setQuery = animeStore().setQuery;

   const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target?.value);
   };

   const handleSubmitSearch = (e: KeyboardEvent<HTMLInputElement>) => {
      const key = e.key;

      if (key !== "Enter") return;
      if (!query) return;

      router.push("/search");
   };

   const handleIconTap = () => {
      if (!query) return;
      router.push("/search");
   };

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
                  <Search
                     onClick={handleIconTap}
                     className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500 cursor-pointer"
                  />
                  <Input
                     type="search"
                     placeholder="Search anime..."
                     className="w-full bg-zinc-900 pl-8 text-sm text-white border-zinc-800 focus-visible:ring-rose-500"
                     onChange={handleSearch}
                     onKeyDown={handleSubmitSearch}
                     value={query ?? ""}
                  />
               </div>
               {isLoggedIn ? <UserMenu /> : <GoogleButton />}
            </div>
         </div>
      </header>
   );
}
