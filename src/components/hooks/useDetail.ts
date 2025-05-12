import animeStore from "@/lib/stores/animes.store";
import { DETAIL_QUERY } from "./queries/detail.query";
import { createClient } from "@/lib/graphql/client";

export default async function useDetailAnime(id: string) {
   const setDetail = animeStore.getState().setDetail;
   const client = createClient();

   const { loading, data, error } = await client.query({
      query: DETAIL_QUERY,
      variables: { id },
   });

   if (data?.detail) setDetail(data.detail);
   const detail = animeStore.getState().detail;

   return { loading, detail, error };
}
