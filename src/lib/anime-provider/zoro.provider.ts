import {
   ANIME,
   IAnimeInfo,
   IAnimeResult,
   ISource,
   StreamingServers,
} from "@consumet/extensions";
import { IZoroPagination, ProviderStrategy } from "./provider.interfaces";

/**
 * @description class implementation for Zoro Anime anime provider
 * @todo move API / Save to DB operation out of this provider
 */
export default class ZoroProvider
   implements ProviderStrategy<IAnimeResult, ISource>
{
   private readonly provider = new ANIME.Zoro();
   constructor() {}

   /**
    *
    * @param page pagination for main page
    * @description Main page will returns all
    */
   async getMainPage(page: number | IZoroPagination) {
      try {
         if (typeof page === "number")
            throw new Error("method not implemented");

         const {
            recent_page = 1,
            top_page = 1,
            movie_page = 1,
            popular_page = 1,
         }: IZoroPagination = page;

         const recent_prom =
            this.provider.fetchRecentlyUpdated(recent_page);
         const top_prom = this.provider.fetchTopAiring(top_page);
         const movie_prom = this.provider.fetchMovie(movie_page);
         const popular_prom = this.provider.fetchMostPopular(popular_page);

         const [recent, top, movies, popular] = await Promise.all([
            recent_prom,
            top_prom,
            movie_prom,
            popular_prom,
         ]);

         return {
            keys: ["recent", "top", "movies", "popular"],
            datas: {
               recent,
               top,
               movies,
               popular,
            },
         };
      } catch (err) {
         console.error(err, "[Anime Main Error]");
         throw err;
      }
   }
   /**
    *
    * @param id anime ID based on provider ID
    * @description this methods find anime by ID by checking to DB and provider to accomodate provider request limit
    */
   async getDetail(id: string) {
      const anime = await this.provider.fetchAnimeInfo(id);

      return anime as IAnimeInfo;
   }
   watch(id: string) {
      return this.provider.fetchEpisodeSources(
         id,
         StreamingServers.VidCloud
      );
   }

   search(query: string, page = 1) {
      return this.provider.search(query, page);
   }
}
