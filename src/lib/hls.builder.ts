import Hls from "hls.js";

export default function hlsBuilder(animeId: string, epsId: string) {
   if (!animeId || !epsId) return;
   const hls = new Hls({
      enableWorker: true,
      xhrSetup: (xhr, url) => {
         xhr.setRequestHeader("X-Anime-ID", animeId);
         xhr.setRequestHeader("X-Episode-ID", epsId);
      },
   });

   hls.on(Hls.Events.ERROR, (_, data) => {
      if (data.fatal) {
         switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
               console.error("Network error, trying to recover...");
               hls.startLoad();
               break;
            case Hls.ErrorTypes.MEDIA_ERROR:
               console.error("Media error, trying to recover...");
               hls.recoverMediaError();
               break;
            default:
               console.error("Unrecoverable error");
               hls.destroy();
               break;
         }
      }
   });

   return hls;
}
