import type { Metadata } from "next";

export const metadata: Metadata = {
   title: "Anime Streaming (Astreamline) | Search",
   description: "Searching animes",
};

export default function SearchLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return <>{children}</>;
}
