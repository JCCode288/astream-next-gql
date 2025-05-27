"use client";
import { useMutation } from "@apollo/client";
import { useEffect } from "react";
import animeStore from "@/lib/stores/animes.store";
import { SEARCH_QUERY } from "./queries/search.query";

export default function useSearchAnime() {
   const search = animeStore().search;
   const page = animeStore().search_page;
   const query = animeStore().query;

   const setSearch = animeStore().setSearch;

   const [fn, { loading, data, error }] = useMutation(SEARCH_QUERY);

   useEffect(() => {
      if (query)
         fn({
            variables: { page, query },
         });
   }, [query]);

   useEffect(() => {
      if (data && data.search) setSearch(data.search);

      return () => {
         setSearch(null);
      };
   }, [data]);

   return { loading, search, error, query };
}
