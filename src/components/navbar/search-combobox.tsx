"use client";

import { ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
   Command,
   CommandInput,
   CommandList,
} from "@/components/ui/command";
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import useSearchAnime from "@/hooks/useSearch";
import SearchData from "./search-data";
import animeStore from "@/lib/stores/animes.store";
import useDebouncer from "@/hooks/useDebouncer";

export default function SearchCombobox() {
   const [open, setOpen] = useState(false);

   const query = animeStore().query;
   const setQuery = animeStore().setQuery;
   const debouncedSetQuery = useDebouncer(300, setQuery);

   const handleSearch = (val?: string) => {
      debouncedSetQuery(val ?? "");
   };

   const data = useSearchAnime();

   return (
      <Popover open={open} onOpenChange={setOpen}>
         <PopoverTrigger asChild>
            <Button
               variant="outline"
               role="combobox"
               aria-expanded={open}
               className="w-[200px] justify-between"
            >
               {data.search
                  ? data.search.results.find(
                       (animes) => animes.title === query
                    )?.label
                  : "Select animes..."}
            </Button>
         </PopoverTrigger>
         <PopoverContent className="w-[200px] p-0">
            <Command>
               <CommandInput
                  onValueChange={handleSearch}
                  placeholder="Search animes..."
               />
               <CommandList>
                  <SearchData {...data} setOpen={setOpen} />
               </CommandList>
            </Command>
         </PopoverContent>
      </Popover>
   );
}
