"use client";

import useSearchAnime from "@/components/hooks/useSearch";
import SearchMain from "@/components/search-main";
import animeStore from "@/lib/stores/animes.store";
import { useEffect } from "react";
import Loading from "./loading";

export default function SearchPage() {
   const { loading, error, search } = useSearchAnime();
   const setQuery = animeStore().setQuery;

   useEffect(
      () => () => {
         setQuery(null);
      },
      []
   );

   if (loading || !search) return <Loading />;

   return <SearchMain search={search} />;
}
