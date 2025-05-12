import { createHmac } from "crypto";
import { IStreamData, ISubsData, ISubsFilter } from "./api.interface";
import client from "../database";
import { headers } from "next/headers";
import keyBuilder from "../utils.keybuilder";

/**
 * @description interface provider for API data processing. this class method will call api and all error from API will be handled as not error here. this will separate API logic from this web app logic
 */
export default class APIProvider {
   /**
    *
    * @param BASE_URL url to BE. if empty will resolve to BE_URL env or `/api` route
    */
   constructor(private readonly BASE_URL = process.env.BE_URL ?? "/api") {}

   /**
    *
    * @param animeId anime ID from Zoro anime
    * @param episodeId episode ID from Zoro anime
    * @param segment segment pointer from m3u8 parameter
    * @returns stream data either saved or fetched from original source
    */
   async getStream(animeId: string, episodeId: string, segment: string) {
      try {
         const query = {
            animeId,
            episodeId,
            segment,
         };
         const streamParams = new URLSearchParams(query);

         const streamUrl = `${
            this.BASE_URL
         }/api/v1/stream?${streamParams.toString()}`;
         const key = keyBuilder({ animeId, episodeId, segment });

         const headers = {
            "X-Validation": this.getValidationHash(key),
         };

         const res = await fetch(streamUrl, { headers });
         if (!res.ok) throw await res.text();
         const eps = await res.json();

         if (!eps?.data?.data) {
            return;
         }

         eps.data.data = Buffer.from(eps.data.data, "base64");
         return eps.data;
      } catch (err) {
         console.log("[Failed to get data]");
         console.error(err);

         return;
      }
   }

   /**
    *
    * @param data stream data to save
    */
   async saveStream(data: IStreamData) {
      try {
         const body = JSON.stringify(data);
         const key = keyBuilder({
            animeId: data.animeId,
            episodeId: data.episodeId,
            segment: data.segment,
            data: data.data,
         });

         const headers = {
            "X-Validation": this.getValidationHash(key),
            "Content-Type": "application/json",
         };

         const res = await fetch(`${this.BASE_URL}/api/v1/stream`, {
            method: "POST",
            body,
            headers,
         });

         if (!res.ok) throw await res.text();
      } catch (err) {
         console.error(err);
         console.log("[Failed to save stream]");
      }
   }
   async getSubs(filter: ISubsFilter): Promise<ISubsData | undefined> {
      try {
         const params = new URLSearchParams();
         params.append("animeId", filter.animeId);
         params.append("episodeId", filter.episodeId);

         const key = keyBuilder({
            animeId: filter.animeId,
            episodeId: filter.episodeId,
         });

         const headers = {
            "X-Validation": this.getValidationHash(key),
         };

         const res = await fetch(
            `${this.BASE_URL}/api/v1/stream/subs?${params.toString()}`,
            { method: "GET", headers }
         );

         if (!res.ok) throw await res.text();
         const { data } = await res.json();

         return data;
      } catch (err) {
         console.log("[Failed to retrieve subtitle] ", err);
         return;
      }
   }

   async saveSubs(subsData: ISubsData) {
      try {
         const key = keyBuilder({
            animeId: subsData.animeId,
            episodeId: subsData.episodeId,
            data: subsData.data,
         });
         const headers = {
            "X-Validation": this.getValidationHash(key),
            "Content-Type": "application/json",
         };

         const res = await fetch(`${this.BASE_URL}/api/v1/stream/subs`, {
            method: "POST",
            body: JSON.stringify(subsData),
            headers,
         });

         if (!res.ok) throw await res.text();
      } catch (err) {
         console.error(err);
         console.log("[Failed to save subs]");
      }
   }

   private getValidationHash(payload: string) {
      const validation = createHmac(
         process.env.SECRET_ALG!,
         process.env.APP_SECRET!
      );
      validation.update(Buffer.from(payload));

      return validation.digest().toString("base64url");
   }
}
