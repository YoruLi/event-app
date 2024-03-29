import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import "@fontsource/paytone-one";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${inter.className} min-h-dvh w-full overflow-hidden scrollbar [overflow-y:overlay] [scrollbar-width:none]  `}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
