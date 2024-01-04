import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "@fontsource/paytone-one";
import Header from "@/components/header";
import MobileNavbar from "@/components/mobile-navbar";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="min-h-[calc(100dvh-56px)] w-full  bg-contain py-5 md:py-10 px-4">
        {children}
      </main>
      <MobileNavbar />
    </>
  );
}
