import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModalProvider";
import ToasterProvider from "@/providers/ToasterProvider";
import getSongsByUserId from "@/actions/getSongsByUserID";
import Player from "@/components/Player";
import { useEffect } from "react";
const font = Figtree({ subsets: ["latin"] });
//Acá esta el manifest.json que se usa para la instalación de la app en el celular y el favicon.ico
export const metadata: Metadata = {
  title: "MusicDev",
  description: "One of the best music streaming app",
  manifest: "/manifest.json",
  icons: {
    apple: "/favicon.ico",
  },
};
declare const window: any;
export const revalidate = 0;
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userSongs = await getSongsByUserId();
  useEffect(() => {
    var ads = document.getElementsByClassName("adsbygoogle").length;
    for (var i = 0; i < ads; i++) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {}
    }
  }, []);
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8563047377957074"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className={font.className}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider />
            <Sidebar songs={userSongs}>{children}</Sidebar>
            <Player />
          </UserProvider>
        </SupabaseProvider>
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-8563047377957074"
          data-ad-slot="2356575768"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </body>
    </html>
  );
}
