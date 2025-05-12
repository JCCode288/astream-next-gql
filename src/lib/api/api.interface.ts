export interface IStreamData {
   animeId: string;
   episodeId: string;
   segment: string;
   data: string; // Buffer to base64
   headers: Record<string, string>;
}
