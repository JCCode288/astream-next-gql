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
      paramsUrl = decodeURIComponent(paramsUrl);

      const headers: Record<string, any> = {};

      if (referer) headers["Referer"] = decodeURIComponent(referer);

      const res = await fetch(paramsUrl, {
         method: "GET",
         headers,
      });

      const data = await res.arrayBuffer();

      return new NextResponse(data, {
         headers: {
            ...res.headers,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Cache-Control": "no-cache, no-store, must-revalidate",
         },
      });
   } catch (err) {
      throw err;
   }
}
