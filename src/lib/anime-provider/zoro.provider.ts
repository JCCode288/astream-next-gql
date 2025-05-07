import {
   ANIME,
   IAnimeResult,
   ISearch,
   ISource,
   StreamingServers,
} from "@consumet/extensions";
import {
   IZoroMain,
   IZoroPagination,
   ProviderStrategy,
} from "./provider.interfaces";
import { durationToNumber } from "../utils.duration";

export default class ZoroProvider
   implements
      ProviderStrategy<
         IAnimeResult,
         ISource,
         IZoroMain<ISearch<IAnimeResult>>
      >
{
   private readonly provider = new ANIME.Zoro();

   async getMainPage(page: number | IZoroPagination) {
      if (typeof page === "number")
         throw new Error("method not implemented");

      const {
         recent_page = 1,
         top_page = 1,
         movie_page = 1,
         popular_page = 1,
      }: IZoroPagination = page;

      const recent_prom = this.provider.fetchRecentlyAdded(recent_page);
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
         recent,
         top,
         movies,
         popular,
      };
   }
   getDetail(id: string) {
      return this.provider.fetchAnimeInfo(id);
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
