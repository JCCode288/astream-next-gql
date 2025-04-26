import type Option from "artplayer/types/option";
import Hls, { HlsConfig } from "hls.js";
import { IGenerateOpts } from "./stores/interfaces/vid-player.interfaces";
import { error } from "console";

export default function playerConfig({
   currentSource,
   referer,
   qualities,
   currentSubs,
   div,
}: IGenerateOpts) {
   const params = new URLSearchParams();
   if (referer) params.append("ref", encodeURIComponent(referer));

   const videoUrl = `/api/stream/${
      currentSource?.url
   }?${params.toString()}`;

   const opts: Option = {
      container: div ?? "#artplayer-app",
      url: videoUrl,
      customType: {
         m3u8: function (this, video, url, art) {
            if (Hls.isSupported()) {
               if (this.hls) this.hls.destroy();
               const hls = new Hls();

               hls.loadSource(url);
               hls.attachMedia(video);
               this.hls = hls;

               hls.on(Hls.Events.ERROR, (_, data) => {
                  if (data.fatal) {
                     switch (data.type) {
                        case Hls.ErrorTypes.NETWORK_ERROR:
                           console.error(
                              "Network error, trying to recover..."
                           );
                           hls.startLoad();
                           break;
                        case Hls.ErrorTypes.MEDIA_ERROR:
                           console.error(
                              "Media error, trying to recover..."
                           );
                           hls.recoverMediaError();
                           break;
                        default:
                           console.error("Unrecoverable error");
                           hls.destroy();
                           break;
                     }
                  }
               });

               this.on("destroy", () => hls.destroy());
            } else if (
               video.canPlayType("application/vnd.apple.mpegurl")
            ) {
               video.src = url;
            } else {
               art.notice.show = "Unsupported playback format";
            }
         },
      },
      title: "",
      poster: "",
      volume: 1,
      isLive: false,
      muted: false,
      autoplay: false,
      autoOrientation: true,
      pip: true,
      autoSize: false,
      autoMini: false,
      screenshot: true,
      setting: true,
      loop: false,
      flip: true,
      playbackRate: true,
      aspectRatio: true,
      fullscreen: true,
      fullscreenWeb: false,
      subtitleOffset: false,
      miniProgressBar: false,
      mutex: true,
      backdrop: true,
      playsInline: true,
      autoPlayback: true,
      airplay: true,
      theme: "#77CF6D",
      whitelist: ["*"],
      moreVideoAttr: {
         crossOrigin: "anonymous",
      },
      thumbnails: {
         url: "",
         number: 60,
         column: 10,
      },
      quality: qualities,
   } as Option;

   if (currentSubs) {
      opts.subtitle = {
         url: currentSubs,
         type: "vtt",
         style: {
            color: "#fff",
         },
         encoding: "utf-8",
      };
   }

   return opts;
}
