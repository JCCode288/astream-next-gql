import { IAnimeResult, ISearch } from "@consumet/extensions";

export interface IZoroPagination {
   recent_page: number;
   top_page: number;
   movie_page: number;
   popular_page: number;
   search_page: number;
}

export interface IMainResult<T> {
   keys: string[];
   datas: T;
}

export interface ProviderStrategy<
   T,
   K,
   V = IMainResult<Record<string, ISearch<IAnimeResult>>>
> {
   getMainPage(page: number): Promise<V>;
   getMainPage(paginations: IZoroPagination): Promise<V>;
   getDetail(id: string | number): Promise<T>;
   watch(id: string | number): Promise<K>;
   search?(query: string, page: number): Promise<ISearch<T>>;
}

export enum ProviderEnum {
   ZORO = "zoro",
   ANIDRV = "anidrive",
   GOGO = "gogoanime",
}

export interface IPagination {
   currentPage?: number;
   hasNextPage?: boolean;
   totalPages?: number;
   totalResults?: number;
}
