import client from "@/lib/database";
import { Binary } from "bson";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
   try {
      const query = req.nextUrl.searchParams;

      let paramsUrl = query.get("url");
      let animeId = query.get("animeId");
      let episodeId = query.get("episodeId");

      if (!paramsUrl || !animeId || !episodeId)
         throw new Error("Referer or URL is invalid");
      paramsUrl = decodeURIComponent(paramsUrl);

      const filter = {
         animeId,
         episodeId,
      };
      let resHeaders: Record<string, string> = {};

      const subsData = await getFromAPI(filter);

      if (subsData) {
         console.log("<< DB Hit Subs >>");
         if (subsData.data instanceof Binary)
            return new NextResponse(subsData.data?.buffer, {
               headers: subsData.headers,
            });

         return new NextResponse(subsData.data, {
            headers: subsData.headers,
         });
      }

      console.log("<< DB Miss >>");

      const res = await fetch(paramsUrl, {
         method: "GET",
      });

      if (!res.ok)
         return NextResponse.json(
            { message: "Something Happened" },
            { status: 500 }
         );

      resHeaders["Origin"] = req.nextUrl.origin;
      resHeaders["Content-Type"] = res.headers.get("Content-Type")!;

      const data = await res.arrayBuffer();

      const saveSubs: ISubsData = {
         animeId,
         episodeId,
         data: new Binary(Buffer.from(data)),
         headers: resHeaders,
      };
      await saveToAPI(saveSubs);

      return new NextResponse(data, {
         headers: resHeaders,
      });
   } catch (err) {
      console.log(err);
      throw err;
   }
}

// @todo - later refactor the interfaces
export interface ISubsFilter {
   animeId: string;
   episodeId: string;
}

export interface ISubsData extends ISubsFilter {
   data: string | Binary; // base64 from buffer subtitle @todo - later change to only string
   headers: Record<string, string>;
}

async function getFromAPI(
   filter: ISubsFilter
): Promise<ISubsData | undefined> {
   try {
      let subsData = await client
         .collection<ISubsData>("subs")
         .findOne(filter);

      if (subsData) return subsData;

      return;
   } catch (err) {
      console.log("[Failed to retrieve subtitle] ", err);
      return;
   }
}

async function saveToAPI(subsData: ISubsData) {
   try {
      const _ = await client.collection("subs").insertOne(subsData);
   } catch (err) {
      console.error(err);
      console.log("[Failed to save stream]");
   }
}
