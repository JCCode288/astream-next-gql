import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MainProvider from "@/components/providers/main-provider";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import animeStore from "@/lib/stores/animes.store";

const geistSans = Geist({
   variable: "--font-geist-sans",
   subsets: ["latin"],
});

const geistMono = Geist_Mono({
   variable: "--font-geist-mono",
   subsets: ["latin"],
});

export const metadata: Metadata = {
   title: "Anime Streaming Online (Astreamline) | Main",
   description:
      "Anime Streaming Online Main Page where you can navigate to see any animes",
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="en">
         <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased flex min-h-screen max-w-screen overflow-x-hidden`}
         >
            <MainProvider>
               <Navbar />
               {children}
               <Footer />
            </MainProvider>
         </body>
      </html>
   );
}
