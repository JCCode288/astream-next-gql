import { Bell, Menu, Search } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function UserMenu() {
   return (
      <>
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
      </>
   );
}
