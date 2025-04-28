import { NextRequest, NextResponse } from "next/server";

export async function GET(
   req: NextRequest,
   { params }: { params: Promise<{ url: string[] }> }
) {
   try {
      const query = req.nextUrl.searchParams;
      const { url } = await params;

      let referer = query.get("ref");
      let paramsUrl = url.join("/");

      if (!paramsUrl) throw new Error("Referer or URL is invalid");

      const headers: Record<string, any> = {};

      if (referer) headers["Referer"] = decodeURIComponent(referer);

      const res = await fetch(paramsUrl, {
         method: "GET",
         headers,
      });
      const resHeaders: Record<string, any> = {};

      resHeaders["Expires"] = res.headers.get("Expires");
      resHeaders["Connection"] = "keep-alive";
      resHeaders["Origin"] = req.nextUrl.origin;
      resHeaders["Cache-Control"] = "no-cache, no-store, must-revalidate";
      resHeaders["Content-Type"] =
         res.headers.get("Content-Type") ?? "video/mp4";

      const data = await res.arrayBuffer();

      // if (res.headers.has("Content-Type"))
      // resHeaders["Content-Type"] = res.headers.get("Content-Type");

      return new NextResponse(data, {
         headers: resHeaders,
      });
   } catch (err) {
      throw err;
   }
}
