import { createHmac } from "crypto";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
   req: NextRequest,
   { params }: { params: Promise<{ url: string[] }> }
) {
   try {
      req.signal.throwIfAborted();
      const query = req.nextUrl.searchParams;
      const { url } = await params;

      let referer = query.get("ref");
      let paramsUrl = url.join("/");
      const animeId = req.headers.get("X-Anime-ID");
      const episodeId = req.headers.get("X-Episode-ID");
      const segment = url[url?.length - 1].replaceAll("/", "");
      const filter = {
         animeId,
         episodeId,
         segment,
      };

      if (!paramsUrl || !animeId || !episodeId)
         throw new Error("Referer or URL is invalid");

      const streamEps = await getFromDB(animeId, episodeId, segment);

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
         ...filter,
         data: Buffer.from(data).toString("base64"),
         headers: resHeaders,
      };

      await saveToDB(streamData);

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

async function getFromDB(
   animeId: string,
   episodeId: string,
   segment: string
) {
   try {
      const query = {
         animeId,
         episodeId,
         segment,
      };
      const streamParams = new URLSearchParams(query);

      const streamUrl = `${
         process.env.BE_URL
      }/api/v1/stream?${streamParams.toString()}`;
      const key = `${query.animeId}:${query.episodeId}:${query.segment}`;

      const headers = {
         "X-Validation": getValidationHash(key),
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

async function saveToDB(data: Record<string, any>) {
   try {
      const body = JSON.stringify(data);
      const key = `${data.animeId}:${data.episodeId}:${data.segment}:${data.data}`;
      const headers = {
         "X-Validation": getValidationHash(key),
         "Content-Type": "application/json",
      };

      const res = await fetch(`${process.env.BE_URL}/api/v1/stream`, {
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

function getValidationHash(payload: string) {
   const validation = createHmac(
      process.env.SECRET_ALG!,
      process.env.APP_SECRET!
   );
   validation.update(Buffer.from(payload));

   return validation.digest().toString("base64url");
}
