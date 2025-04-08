"use client";
import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import animeStore from "@/lib/stores/animes.store";
import { SEARCH_QUERY } from "./queries/search.query";

export default function useSearchAnime() {
   const search = animeStore().search;
   const page = animeStore().search_page;
   const query = animeStore().query ?? "";

   const setSearch = animeStore().setSearch;
   const setQuery = animeStore().setQuery;

   const { loading, data, error } = useQuery(SEARCH_QUERY, {
      variables: { page, query },
      pollInterval: 5_000,
   });

   useEffect(() => {
      if (data && data.search) setSearch(data.search);

      return () => {
         setSearch(null);
      };
   }, [data]);

   return { loading, search, error, query };
}
