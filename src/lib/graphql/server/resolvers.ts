import AniDriveProvider from "@/lib/anime-provider/anidrive.provider";
import ZoroProvider from "@/lib/anime-provider/zoro.provider";
import {
   IZoroPagination,
   ProviderEnum,
} from "@/lib/anime-provider/provider.interfaces";
import {
   IContextBody,
   IVariableID,
   IVariableQuery,
   IVariableUser,
} from "./interfaces/context.interface";
import { IAnimeResult, ISearch } from "@consumet/extensions";
import APIProvider from "@/lib/api/provider";
import GogoProvider from "@/lib/anime-provider/gogo.provider";

export type MainPagination = { page?: number } & IZoroPagination;

export type ICommentVariable = { epsId: string };

const providers = {
   [ProviderEnum.ANIDRV]: new AniDriveProvider(),
   [ProviderEnum.ZORO]: new ZoroProvider(),
   [ProviderEnum.GOGO]: new GogoProvider(),
};

const apiProvider = new APIProvider();

/**
 * @todo move API provider operation to this layer
 */
const resolvers = {
   Query: {
      main: async (
         _: unknown,
         pagination: MainPagination,
         { provider }: IContextBody
      ) => {
         try {
            const aniProvider = getProvider(ProviderEnum.ZORO);
            const page = getPagination(pagination, ProviderEnum.ZORO);

            if (!page) throw new Error("invalid pagination");

            const data = await aniProvider.getMainPage(
               page as IZoroPagination
            );

            return data;
         } catch (err) {
            console.error(err, "[Main Error]");
            throw err;
         }
      },
      hello: () => "world",

      detail: async (
         _: unknown,
         { id }: IVariableID,
         { provider }: IContextBody
      ) => {
         try {
            let detail = await apiProvider.getAnime(id);
            if (detail && detail.status === "Completed") {
               detail.id = detail.animeId;
               return detail;
            }

            const aniProvider = getProvider(provider);
            detail = await aniProvider.getDetail(id);

            await apiProvider.saveAnime(detail);

            return detail;
         } catch (err) {
            console.log(err);
            throw err;
         }
      },
      watch: async (
         _: unknown,
         { id }: IVariableID,
         { provider }: IContextBody
      ) => {
         try {
            console.log(id, "[Watch ID]");
            const aniProvider = getProvider(provider);

            const [animeId, episodeId] = id.split("$episode$");

            // let watch = await apiProvider.getSources(animeId, episodeId);
            // if (watch) return watch;

            const watch = await aniProvider.watch(id);
            const params = new URLSearchParams();
            if (watch.headers?.Referer)
               params.append("ref", watch.headers.Referer);

            watch.sources.map((src) => {
               src.url = `/api/stream/${src.url}?${params.toString()}`;
               return src;
            });

            watch.subtitles?.map((sub) => {
               const subParams = new URLSearchParams({
                  url: encodeURIComponent(sub.url),
                  animeId,
                  episodeId,
               });
               sub.url = `/api/subs?${subParams.toString()}`;
               return sub;
            });

            // @notes - seems like saving sources is bad idea unless i know exactly what to save from stream segments
            // await apiProvider.saveSources(animeId, episodeId, watch);

            return watch;
         } catch (err) {
            console.log(err);
            throw err;
         }
      },

      user: async (
         _: unknown,
         { userId }: IVariableUser,
         { clientId }: IContextBody
      ) => {},
   },
   Mutation: {
      search: async (
         _: unknown,
         { query, page }: IVariableQuery,
         { provider }: IContextBody
      ) => {
         console.log({ query, page }, "[Search Query]");
         if (!query)
            return {
               results: [],
               totalPages: 1,
               currentPage: 1,
               hasNextPage: false,
               totalResults: 0,
            } as ISearch<IAnimeResult>;

         const aniProvider = getProvider(provider);

         const search = await aniProvider.search(query, page);
         return search;
      },

      login: async (
         _: unknown,
         loginData: unknown,
         context: IContextBody
      ) => {},

      register: async (
         _: unknown,
         registerData: unknown,
         context: IContextBody
      ) => {},

      addComment: async (
         _: unknown,
         commentBody: unknown,
         context: IContextBody
      ) => {},

      editComment: async (
         _: unknown,
         commentBody: unknown,
         context: IContextBody
      ) => {},

      deleteComment: async (
         _: unknown,
         commentId: unknown,
         context: IContextBody
      ) => {},
   },

   Subscription: {
      commentSection: async (
         _: unknown,
         { epsId }: ICommentVariable,
         context: IContextBody
      ) => {},
   },
};

function getProvider(provider?: string) {
   if (provider && provider === ProviderEnum.ANIDRV)
      return providers[ProviderEnum.ANIDRV];

   return providers[ProviderEnum.ZORO];
}

function getPagination(pagination: MainPagination, provider?: string) {
   if (provider && provider === ProviderEnum.ANIDRV)
      return pagination.page;

   delete pagination.page;
   return pagination;
}

export default resolvers;
