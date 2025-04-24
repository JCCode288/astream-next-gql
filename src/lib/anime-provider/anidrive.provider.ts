import { ANIME, IAnimeResult, ISource } from "@consumet/extensions";
import { IZoroPagination, ProviderStrategy } from "./provider.interfaces";
import { assert } from "node:console";

export default class AniDriveProvider
   implements ProviderStrategy<IAnimeResult, ISource>
{
   private readonly provider = new ANIME.AnimeDrive();

   async getMainPage(page: number | IZoroPagination) {
      try {
         if (typeof page !== "number")
            throw new Error("method not implemented");

         return await this.provider.fetchRecentEpisodes(page);
      } catch (err) {
         console.error(err, "[Anidrive Error]");
         throw err;
      }
   }
   async getDetail(id: string) {
      try {
         if (!id || typeof id !== "string")
            throw new Error("Invalid ID Provided");

         return await this.provider.fetchAnimeInfo(id);
      } catch (err) {
         console.error(err, "[Anidrive Error]");
         throw err;
      }
   }
   async watch(id: string) {
      try {
         if (!id || typeof id !== "string")
            throw new Error("Invalid ID Provided");

         return await this.provider.fetchEpisodeSources(id);
      } catch (err) {
         console.error(err, "[Anidrive Error]");
         throw err;
      }
   }
   async search(query: string, page: number = 1) {
      try {
         return await this.provider.search(query, page);
      } catch (err) {
         console.error(err, "[Anidrive Error]");
         throw err;
      }
   }
}
