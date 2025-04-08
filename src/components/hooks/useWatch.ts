"use client";
import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import historyStore from "@/lib/stores/history.store";
import { WATCH_QUERY } from "./queries/watch.query";

export default function useWatchAnime(id: string) {
   const watch = historyStore().current;
   const setCurrent = historyStore().setCurrent;

   const { loading, data, error } = useQuery(WATCH_QUERY, {
      variables: { id },
      pollInterval: 5_000,
   });

   useEffect(() => {
      if (data && data.watch) setCurrent(data.watch);

      return () => {
         setCurrent(null);
      };
   }, [data]);

   return { loading, watch, error };
}
