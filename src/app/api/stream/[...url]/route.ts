import APIProvider from "@/lib/api/provider";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
   req: NextRequest,
   { params }: { params: Promise<{ url: string[] }> }
) {
   try {
      const apiProvider = new APIProvider();

      req.signal.throwIfAborted();
      const query = req.nextUrl.searchParams;
      const { url } = await params;

      let referer = query.get("ref");
      let paramsUrl = url.join("/");
      const animeId = req.headers.get("X-Anime-ID");
      const episodeId = req.headers.get("X-Episode-ID");
      const segment = url[url?.length - 1].replaceAll("/", "");

      if (!paramsUrl || !animeId || !episodeId)
         throw new Error("Referer or URL is invalid");

      const streamEps = await apiProvider.getStream(
         animeId,
         episodeId,
         segment
      );

      if (streamEps) {
         console.log("<< DB Hit >>");
         return new NextResponse(streamEps.data, {
            headers: streamEps.headers,
         });
      }

      console.log("<< DB Miss >>");
      const headers: Record<string, any> = {};
      if (referer) headers["Referer"] = decodeURIComponent(referer);

      const res = await fetch(paramsUrl, {
         method: "GET",
         headers,
      });

      const resHeaders: Record<string, string> = {};

      resHeaders["Connection"] = "keep-alive";
      resHeaders["Origin"] = req.nextUrl.origin;
      resHeaders["Content-Type"] =
         res.headers.get("Content-Type") ?? "video/mp4";
      resHeaders["Cache-Control"] = "no-cache, no-store";

      const data = await res.arrayBuffer();

      const streamData = {
         animeId,
         episodeId,
         segment,
         data: Buffer.from(data).toString("base64"),
         headers: resHeaders,
      };

      await apiProvider.saveStream(streamData);

      if (res.headers.has("Expires"))
         resHeaders["Expires"] = res.headers.get("Expires")!;

      return new NextResponse(data, {
         headers: resHeaders,
      });
   } catch (err) {
      console.log(err);
      throw err;
   }
}
