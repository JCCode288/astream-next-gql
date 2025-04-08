"use client";
import useMainAnimes from "./hooks/useAnimes";
import useDetailAnime from "./hooks/useDetail";

export default function TestQuery() {
   // const { loading, animes, error } = useMainAnimes();
   const id = "tales-of-herding-gods-19409";
   const { loading, detail, error } = useDetailAnime(id);

   if (loading) return <>Loading</>;

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

   return (
      <div>
         <div>{id}</div>
         <div>{JSON.stringify(detail)}</div>
      </div>
   );
}
