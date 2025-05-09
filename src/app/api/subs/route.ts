import client from "@/lib/database";
import { Binary } from "bson";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
   try {
      const query = req.nextUrl.searchParams;

      let paramsUrl = query.get("url");
      let animeId = query.get("animeId");
      let episodeId = query.get("episodeId");

      if (!paramsUrl) throw new Error("Referer or URL is invalid");
      paramsUrl = decodeURIComponent(paramsUrl);

      const filter = {
         animeId,
         episodeId,
      };
      let resHeaders: Record<string, string> = {};

      let subsData = await client.collection("subs").findOne(filter);

      if (subsData) {
         console.log("<< DB Hit Subs >>");
         return new NextResponse(subsData.data?.buffer, {
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

      try {
         const streamData = {
            ...filter,
            data: new Binary(Buffer.from(data)),
            headers: resHeaders,
         };

         console.log(streamData);

         const _ = await client.collection("subs").insertOne(streamData);
      } catch (err) {
         console.error(err);
         console.log("[Failed to save stream]");
      }

      return new NextResponse(data, {
         headers: resHeaders,
      });
   } catch (err) {
      console.log(err);
      throw err;
   }
}
