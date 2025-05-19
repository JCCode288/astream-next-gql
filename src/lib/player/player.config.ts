"use client";

import type Option from "artplayer/types/option";
import Hls from "hls.js";
import { IGenerateOpts } from "../stores/interfaces/vid-player.interfaces";
import ArtplayerChapter from "artplayer-plugin-chapter";
import Artplayer from "artplayer";
import ArtplayerThumbnailPlugin from "artplayer-plugin-auto-thumbnail";
import skipPlugin from "./skip.plugin";

export default function playerConfig({
   currentSource,
   qualities,
   currentSubs,
   hls,
   div,
   intro,
   outro,
}: IGenerateOpts) {
   const opts: Option = {
      container: div ?? "#artplayer-app",
      url: currentSource?.url,
      customType: {
         m3u8: function (this, video, url, art) {
            if (Hls.isSupported()) {
               if (this.hls) this.hls.destroy();

               hls.loadSource(url);
               hls.attachMedia(video);

               this.hls = hls;

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
      fastForward: true,
      setting: true,
      loop: false,
      flip: true,
      playbackRate: true,
      aspectRatio: true,
      plugins: [skipPlugin, ArtplayerThumbnailPlugin({})],
      fullscreen: true,
      fullscreenWeb: false,
      subtitleOffset: false,
      miniProgressBar: false,
      mutex: true,
      backdrop: true,
      playsInline: true,
      airplay: true,
      theme: "#77CF6D",
      quality: qualities,
   } as Option;

   const chapters = [];

   if (intro)
      chapters.push({
         start: intro.start,
         end: intro.end,
         title: "intro",
      });

   if (outro)
      chapters.push({
         start: outro.start,
         end: outro.end,
         title: "outro",
      });

   if (chapters.length) {
      opts.plugins?.push(ArtplayerChapter({ chapters }));
   }

   if (!currentSubs) {
      return opts;
   }

   opts.subtitle = {
      url: currentSubs,
      type: "vtt",
      style: {
         color: "#fff",
      },
      encoding: "utf-8",
   };

   return opts;
}
