import type { Metadata } from "next";

export const metadata: Metadata = {
   title: "Anime Streaming (Astreamline) | Detail",
   description: "Anime Detail",
};

export default function DetailLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return <>{children}</>;
}
