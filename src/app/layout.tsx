import type { Metadata } from "next";
import { DM_Serif_Display, Manrope } from "next-google-fonts"; // or next/font/google
import { DM_Serif_Display as DMSerif, Manrope as FontManrope } from "next/font/google";
import "./globals.css";


const dmSerif = DMSerif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dm-serif",
});

const manrope = FontManrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "KO Realty Ltd",
  description: "KO realty ltd helps families buy and sell with confidence in calgary and surrounding rural areas.",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSerif.variable} ${manrope.variable}`}>
      <body className="font-sans bg-bg-ivory text-brand-dark antialiased selection:bg-accent-champagne selection:text-white">
        {children}
      </body>
    </html>
  );
}