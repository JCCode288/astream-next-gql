import { ISubsData } from "@/lib/api/api.interface";
import APIProvider from "@/lib/api/provider";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
   try {
      const apiProvider = new APIProvider();
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

      const subsData = await apiProvider.getSubs(filter);

      if (subsData) {
         console.log("<< DB Hit Subs >>");

         return new NextResponse(subsData.data, {
            headers: subsData.headers,
         });
      }

      console.log("<< DB Miss Subs >>");

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
         data: Buffer.from(data).toString("base64"),
         headers: resHeaders,
      };
      await apiProvider.saveSubs(saveSubs);

      return new NextResponse(data, {
         headers: resHeaders,
      });
   } catch (err) {
      console.log(err);
      throw err;
   }
}
