import { createWriteStream } from "fs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
   req: NextRequest,
   { params }: { params: Promise<{ url: string[] }> }
) {
   try {
      console.log("proxy triggered");
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

      return new NextResponse(res.body, {
         headers: {
            ...res.headers,
            Connection: "keep-alive",
         },
      });
   } catch (err) {
      throw err;
   }
}
