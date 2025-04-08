export interface ILoadingData {
   loading: boolean;
}

export interface ILoadingStore extends ILoadingData {
   setLoading(loading: boolean): void;
}
