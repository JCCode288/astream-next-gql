"use client";

import { IAnimeResult, ISearch } from "@consumet/extensions";
import { CommandEmpty, CommandGroup, CommandItem } from "../ui/command";
import { useRouter } from "next/navigation";
import { ApolloError } from "@apollo/client";
import Spinner from "../spinner";
import { Dispatch, SetStateAction } from "react";
import SearchCard from "./search-card";

export interface ISearchDataProps {
   loading: boolean;
   search: ISearch<IAnimeResult> | null;
   error?: ApolloError;
   setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function SearchData({
   loading,
   search,
   error,
   setOpen,
}: ISearchDataProps) {
   const router = useRouter();
   if (loading)
      return (
         <div className="flex w-full p-4 justify-center items-center">
            <Spinner dim={{ base: 4, md: 8 }} />
         </div>
      );

   if (error) return;
   if (!loading && !search?.results.length) return;

   const handleSelect = (aniId: string) => {
      router.push("/anime/" + aniId);
      setOpen(false);
   };

   return (
      <>
         <CommandEmpty>No Anime found.</CommandEmpty>
         <CommandGroup>
            {search?.results.map((ani) => (
               <CommandItem
                  key={`ani-${ani.id}`}
                  value={ani.id}
                  onSelect={handleSelect}
               >
                  <SearchCard anime={ani} />
               </CommandItem>
            ))}
         </CommandGroup>
      </>
   );
}
