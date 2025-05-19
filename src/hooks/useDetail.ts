"use client";
import { useQuery } from "@apollo/client";
import animeStore from "@/lib/stores/animes.store";
import { useEffect } from "react";
import { DETAIL_QUERY } from "./queries/detail.query";

export default function useDetailAnime(id: string) {
   const detail = animeStore().detail;
   const setDetail = animeStore().setDetail;

   const { loading, data, error } = useQuery(DETAIL_QUERY, {
      variables: { id },
      pollInterval: 180_000,
   });

   useEffect(() => {
      if (data?.detail) setDetail(data.detail);
   }, [data]);

   return { loading, detail, error };
}
