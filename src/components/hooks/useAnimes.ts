// import { useQuery } from "@apollo/client";
import { ANIMES_QUERY } from "./queries/main.query";
import animeStore from "@/lib/stores/animes.store";
import { ProviderEnum } from "@/lib/anime-provider/provider.interfaces";
// import { useEffect } from "react";
import { createClient } from "@/lib/graphql/client";

export default async function useMainAnimes() {
   const page = animeStore.getState().page;
   const recent_page = animeStore.getState().recent_page;
   const top_page = animeStore.getState().top_page;
   const movie_page = animeStore.getState().movie_page;
   const popular_page = animeStore.getState().popular_page;
   const provider = animeStore.getState().provider;
   const setMain = animeStore.getState().setMain;

   const pagination =
      provider === ProviderEnum.ANIDRV
         ? { page }
         : {
              recent_page,
              top_page,
              movie_page,
              popular_page,
           };

   // const { loading, data, error, networkStatus } = useQuery(ANIMES_QUERY, {
   //    variables: { ...pagination },
   // });

   // useEffect(() => {
   //    if (data?.main) setMain(data.main);
   // }, [data]);
   const client = createClient();
   const { loading, data, error } = await client.query({
      query: ANIMES_QUERY,
      variables: pagination,
   });

   if (data.main) setMain(data.main);
   const animes = animeStore.getState().main;

   console.log(animes);

   return { loading, animes, error };
}
