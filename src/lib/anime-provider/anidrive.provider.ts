import {
   ANIME,
   IAnimeResult,
   ISearch,
   ISource,
} from "@consumet/extensions";
import { IZoroPagination, ProviderStrategy } from "./provider.interfaces";

export default class AniDriveProvider
   implements ProviderStrategy<IAnimeResult, ISource>
{
   private readonly provider = new ANIME.AnimeDrive();

   getMainPage(page: number | IZoroPagination) {
      try {
         if (typeof page !== "number")
            throw new Error("method not implemented");

         return this.provider.fetchRecentEpisodes(page);
      } catch (err) {
         console.error(err, "[Anidrive Error]");
         throw err;
      }
   }
   getDetail(id: string) {
      return this.provider.fetchAnimeInfo(id);
   }
   watch(id: string) {
      return this.provider.fetchEpisodeSources(id);
   }
   search(query: string, page: number = 1) {
      return this.provider.search(query, page);
   }
}
