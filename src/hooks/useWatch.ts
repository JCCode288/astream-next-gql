"use client";
import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { WATCH_QUERY } from "./queries/watch.query";
import videoStore from "@/lib/stores/video.store";
import { IAnimeInfo, ISubtitle } from "@consumet/extensions";

export default function useWatchAnime(animeId: string, episodeId: string) {
   const watch = videoStore().currentSource;
   const setSources = videoStore().setCurrentSource;
   const setSubs = videoStore().setSubs;
   const setQualities = videoStore().setQualities;
   const setCurrentSubs = videoStore().setCurrentSubs;
   const setHeaders = videoStore().setHeaders;
   const setIntro = videoStore().setIntro;
   const setOutro = videoStore().setOutro;

   const { loading, data, error, refetch } = useQuery(WATCH_QUERY, {
      variables: { id: episodeId, animeId },
   });

   useEffect(() => {
      if (!animeId || !episodeId) return;
      refetch({
         id: episodeId,
         animeId,
      });
   }, [animeId, episodeId]);

   useEffect(() => {
      if (!data) return;

      if (!data?.watch?.sources?.length) return;
      if (!data?.watch?.headers) return;

      const headers = data.watch.headers;
      setHeaders(headers);

      const sources = data.watch.sources[0];
      setSources(sources);

      const subs = data.watch.subtitles;
      setSubs(subs ?? []);

      const qualities = data.watch?.quality;
      setQualities(qualities ?? []);

      const intro = data.watch?.intro;
      setIntro(intro);

      const outro = data.watch?.outro;
      setOutro(outro);

      if (!subs) return;

      const currentSubs =
         subs?.find((sub: ISubtitle) => sub.lang === "English") ?? subs[0];
      setCurrentSubs(currentSubs);
   }, [data]);

   return {
      loading,
      watch,
      anime: data?.detail as IAnimeInfo,
      error,
      refetch,
   };
}
