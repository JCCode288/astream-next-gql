import Link from "next/link";
import { Button } from "./ui/button";
import { Bell, Menu, Search } from "lucide-react";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function Navbar() {
   return (
      <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
         <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center gap-6">
               <Link
                  href="/"
                  className="flex items-center gap-2 font-bold text-xl text-white"
               >
                  <span className="text-rose-500">A</span>stream
               </Link>
               <nav className="hidden md:flex gap-6">
                  <Link
                     href="#"
                     className="text-sm font-medium text-zinc-400 transition-colors hover:text-white"
                  >
                     Home
                  </Link>
                  <Link
                     href="#"
                     className="text-sm font-medium text-zinc-400 transition-colors hover:text-white"
                  >
                     Discover
                  </Link>
                  <Link
                     href="#"
                     className="text-sm font-medium text-zinc-400 transition-colors hover:text-white"
                  >
                     Categories
                  </Link>
                  <Link
                     href="#"
                     className="text-sm font-medium text-zinc-400 transition-colors hover:text-white"
                  >
                     My List
                  </Link>
               </nav>
            </div>
            <div className="flex items-center gap-4">
               <div className="relative hidden md:block w-full max-w-sm">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
                  <Input
                     type="search"
                     placeholder="Search anime..."
                     className="w-full bg-zinc-900 pl-8 text-sm text-white border-zinc-800 focus-visible:ring-rose-500"
                  />
               </div>
               <Button
                  variant="ghost"
                  size="icon"
                  className="text-zinc-400 hover:text-white"
               >
                  <Bell className="h-5 w-5" />
                  <span className="sr-only">Notifications</span>
               </Button>
               <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden text-zinc-400 hover:text-white"
               >
                  <Search className="h-5 w-5" />
                  <span className="sr-only">Search</span>
               </Button>
               <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden text-zinc-400 hover:text-white"
               >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Menu</span>
               </Button>
               <Avatar className="h-8 w-8 border border-zinc-800">
                  <AvatarImage
                     src="/placeholder.svg?height=32&width=32"
                     alt="User"
                  />
                  <AvatarFallback className="bg-zinc-900 text-zinc-400">
                     U
                  </AvatarFallback>
               </Avatar>
            </div>
         </div>
      </header>
   );
}
