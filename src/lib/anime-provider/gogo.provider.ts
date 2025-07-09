import {
   ANIME,
   IAnimeResult,
   ISearch,
   ISource,
} from "@consumet/extensions";
import {
   IMainResult,
   IZoroPagination,
   ProviderStrategy,
} from "./provider.interfaces";

export default class GogoProvider
   implements ProviderStrategy<IAnimeResult, ISource>
{
   private readonly provider = new ANIME.AnimeKai();
   getMainPage(
      page: number
   ): Promise<IMainResult<Record<string, ISearch<IAnimeResult>>>>;
   getMainPage(
      paginations: IZoroPagination
   ): Promise<IMainResult<Record<string, ISearch<IAnimeResult>>>>;
   async getMainPage(
      page: number | IZoroPagination
   ): Promise<IMainResult<Record<string, ISearch<IAnimeResult>>>> {
      try {
         if (typeof page === "number")
            throw new Error("method not implemented");

         const { recent_page = 1, movie_page = 1 }: IZoroPagination = page;

         const recent_prom =
            this.provider.fetchRecentlyUpdated(recent_page);
         const movie_prom = this.provider.fetchMovie(movie_page);

         const [recent, movies] = await Promise.all([
            recent_prom,
            movie_prom,
         ]);

         return {
            keys: ["recent", "movies"],
            datas: {
               recent,
               movies,
            },
         };
      } catch (err) {
         console.error(err, "[Anime Main Error]");
         throw err;
      }
   }

   getDetail(id: string): Promise<IAnimeResult> {
      return this.provider.fetchAnimeInfo(id);
   }
   watch(id: string): Promise<ISource> {
      return this.provider.fetchEpisodeSources(id);
   }
   search(
      query: string,
      page: number = 1
   ): Promise<ISearch<IAnimeResult>> {
      return this.provider.search(query, page);
   }
}
