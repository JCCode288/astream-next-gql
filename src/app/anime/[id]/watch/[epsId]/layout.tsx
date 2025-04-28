import type { Metadata } from "next";

export const metadata: Metadata = {
   title: "Anime Streaming (Astreamline) | Watch",
   description: "Streaming animes",
};

export default function SearchLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return <>{children}</>;
}
