"use client";
import { useQuery } from "@apollo/client";
import animeStore from "@/lib/stores/animes.store";
import { useEffect } from "react";
import { DETAIL_QUERY } from "./queries/detail.query";

export default function useDetailAnime(id: string) {
   const detail = animeStore().detail;
   const setMain = animeStore().setDetail;

   const { loading, data, error } = useQuery(DETAIL_QUERY, {
      variables: { id },
      pollInterval: 10_000,
   });

   useEffect(() => {
      if (data?.detail) setMain(data.detail);
   }, [data]);

   return { loading, detail, error };
}
