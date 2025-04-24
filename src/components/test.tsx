"use client";
import animeStore from "@/lib/stores/animes.store";
import useMainAnimes from "./hooks/useAnimes";
import useDetailAnime from "./hooks/useDetail";
import useWatchAnime from "./hooks/useWatch";
import useSearchAnime from "./hooks/useSearch";
import { ChangeEvent, useCallback, useEffect } from "react";

export default function TestQuery() {
   // const { loading, animes, error } = useMainAnimes();
   // const id = "rezero-starting-life-in-another-world-season-3-19301";
   // const { loading, detail, error } = useDetailAnime(id);
   const epsId =
      "rezero-starting-life-in-another-world-season-3-19301$episode$128356";
   const { loading, watch, error } = useWatchAnime(epsId);
   // const { loading, search, error, query } = useSearchAnime();
   // const setQuery = animeStore().setQuery;
   // const handleQuery = useCallback(
   //    (e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value),
   //    [setQuery]
   // );
   // if (loading) return <>Loading</>;
   // return (
   //    <div>
   //       <div>
   //          <div className="text-green-400 text-2xl">Recent</div>
   //          <div>{JSON.stringify(animes?.recent?.results, null, 3)}</div>
   //       </div>
   //       <div>
   //          <div className="text-green-400 text-2xl">Top</div>
   //          <div>{JSON.stringify(animes?.top?.results, null, 3)}</div>
   //       </div>
   //       <div>
   //          <div className="text-green-400 text-2xl">Movie</div>
   //          <div>{JSON.stringify(animes?.movies?.results, null, 3)}</div>
   //       </div>
   //       <div>
   //          <div className="text-green-400 text-2xl">Popular</div>
   //          <div>{JSON.stringify(animes?.popular?.results, null, 3)}</div>
   //       </div>
   //    </div>
   // );
   // return (
   //    <div>
   //       <div>{id}</div>
   //       <div>MAL ID: {detail?.malId}</div>
   //       <div>{JSON.stringify(detail)}</div>
   //    </div>
   // );
   return (
      <div>
         <div>{epsId}</div>
         <div>{JSON.stringify(watch)}</div>
      </div>
   );
   // return (
   //    <div>
   //       <div>{query}</div>
   //       <div>
   //          <div>Query</div>
   //          <input onChange={handleQuery} value={query} type="text" />
   //       </div>
   //       {loading ? <>Loading</> : <div>{JSON.stringify(search)}</div>}
   //    </div>
   // );
}
