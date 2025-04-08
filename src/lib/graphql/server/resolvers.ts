import AniDriveProvider from "@/lib/anime-provider/anidrive.provider";
import ZoroProvider from "@/lib/anime-provider/zoro.provider";
import {
   IZoroPagination,
   ProviderEnum,
} from "@/lib/anime-provider/provider.interfaces";

export type MainPagination = { page?: number } & IZoroPagination;

const providers = {
   [ProviderEnum.ANIDRV]: new AniDriveProvider(),
   [ProviderEnum.ZORO]: new ZoroProvider(),
};

const resolvers = {
   Query: {
      main: async (
         _: unknown,
         pagination: MainPagination,
         { provider }: { provider: string }
      ) => {
         try {
            const aniProvider = getProvider(ProviderEnum.ZORO);
            const page = getPagination(pagination, ProviderEnum.ZORO);

            if (!page) throw new Error("invalid pagination");
            console.log("[page] ", page);

            const data = await aniProvider.getMainPage(page);

            console.log("[Animes] ", data);

            return data;
         } catch (err) {
            console.error(err, "[Main Error]");
            throw err;
         }
      },
      hello: () => "world",

      detail: (
         _: unknown,
         { id }: { id: string },
         { provider }: { provider: string }
      ) => {
         const aniProvider = getProvider(provider);

         return aniProvider.getDetail(id);
      },
      watch: async (
         _: unknown,
         { id }: { id: string },
         { provider }: { provider: string }
      ) => {
         console.log(id, "[Watch ID]");
         const aniProvider = getProvider(provider);

         const watch = await aniProvider.watch(id);
         console.log(watch, "[Watch Data]");
         return watch;
      },
   },
   Mutation: {
      search: async (
         _: unknown,
         { query, page }: { query: string; page: number },
         { provider }: { provider: string }
      ) => {
         console.log({ query, page }, "[Search Query]");
         const aniProvider = getProvider(provider);

         const search = await aniProvider.search(query, page);
         console.log(search, "[Search Data]");
         return search;
      },
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
