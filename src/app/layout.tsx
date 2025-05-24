import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MainProvider from "@/components/providers/main-provider";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar/navbar";
import { Suspense } from "react";

const geistSans = Geist({
   variable: "--font-geist-sans",
   subsets: ["latin"],
});

const geistMono = Geist_Mono({
   variable: "--font-geist-mono",
   subsets: ["latin"],
});

export const metadata: Metadata = {
   title: "Anime Streaming (Astreamline) | Main",
   description: "Anime Streaming Online, watch and stream anime free.",
};

export default async function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="en">
         <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased flex min-h-screen max-w-screen overflow-x-hidden`}
         >
            <Suspense>
               <MainProvider>
                  <Navbar />
                  {children}
                  <Footer />
               </MainProvider>
            </Suspense>
         </body>
      </html>
   );
}
