"use client";
import { useQuery } from "@apollo/client";
import { ANIMES_QUERY } from "./queries/animes.query";
import animeStore from "@/lib/stores/animes.store";
import { ProviderEnum } from "@/lib/anime-provider/provider.interfaces";
import { useEffect } from "react";

export default function useMainAnimes() {
   const animes = animeStore().main;
   const page = animeStore().page;
   const recent_page = animeStore().recent_page;
   const top_page = animeStore().top_page;
   const movie_page = animeStore().movie_page;
   const popular_page = animeStore().popular_page;
   const provider = animeStore().provider;
   const setMain = animeStore().setMain;

   const pagination =
      provider === ProviderEnum.ANIDRV
         ? { page }
         : {
              recent_page,
              top_page,
              movie_page,
              popular_page,
           };

   console.log(pagination);

   const { loading, data, error } = useQuery(ANIMES_QUERY, {
      variables: { ...pagination },
      pollInterval: 10_000,
   });

   useEffect(() => {
      if (data?.main) setMain(data.main);
   }, [data]);
   console.log("data fetched", animes?.top.results[0]);

   return { loading, animes, error };
}
