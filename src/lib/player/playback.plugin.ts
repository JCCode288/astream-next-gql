import Artplayer from "artplayer";
import { IWatchEpisodes } from "../stores/interfaces/anime.interfaces";

/**
 *
 * @param params passing through defined save function and current eps history
 * @description this is a custom plugins based on artplayer auto-playback plugins. there's a need for this plugins to persisting playback data and initiate it using outside source. as originals only used the local storage
 * @returns only name of plugins
 */
export default function customAutoPlayback({
   save,
   current,
}: ICustomPlayback) {
   return (art: Artplayer) => {
      if (!save) return {};

      const {
         i18n,
         icons,
         proxy,
         template: { $poster },
      } = art;

      const $autoPlayback = art.layers.add({
         name: "auto-playback",
         html: `
         <div class="art-auto-playback-close"></div>
         <div class="art-auto-playback-last"></div>
         <div class="art-auto-playback-jump"></div>
     `,
      });

      const $last = Artplayer.utils.query(
         ".art-auto-playback-last",
         $autoPlayback
      );
      const $jump = Artplayer.utils.query(
         ".art-auto-playback-jump",
         $autoPlayback
      );
      const $close = Artplayer.utils.query(
         ".art-auto-playback-close",
         $autoPlayback
      );
      Artplayer.utils.append($close, icons.close);

      let timer: any = null;

      art.on("video:timeupdate", async () => {
         if (art.playing) {
            try {
               await save({
                  timestamp: art.currentTime,
                  duration: art.duration,
               });
            } catch (err) {
               // @notes - do not handle for now
            }
         }
      });

      function init() {
         if (!current.timestamp || !current.duration) return;

         const currentTime = current.timestamp;

         Artplayer.utils.setStyle($autoPlayback, "display", "flex");

         $last.innerText = `${i18n.get(
            "Last Seen"
         )} ${Artplayer.utils.secondToTime(currentTime)}`;
         $jump.innerText = i18n.get("Jump Play");

         proxy($close as any, "click", () => {
            Artplayer.utils.setStyle($autoPlayback, "display", "none");
         });

         proxy($jump as any, "click", () => {
            art.seek = currentTime;
            art.play();
            Artplayer.utils.setStyle($poster, "display", "none");
            Artplayer.utils.setStyle($autoPlayback, "display", "none");
         });

         art.once("video:timeupdate", () => {
            timer = setTimeout(() => {
               Artplayer.utils.setStyle($autoPlayback, "display", "none");
            }, Artplayer.AUTO_PLAYBACK_TIMEOUT);
         });
      }

      art.on("ready", init);
      art.on("restart", init);

      return {
         name: "custom-playback",
      };
   };
}

export type SavePlayback = Omit<IWatchEpisodes, "episode">;

interface ICustomPlayback {
   save: (data: SavePlayback) => void;
   current: Partial<SavePlayback>;
}
