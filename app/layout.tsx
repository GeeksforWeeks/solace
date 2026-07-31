import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SOLACE | Premium Streetwear",
  description:
    "Wear Quiet. Leave an Impression. High-end luxury minimal streetwear designed for presence, crafted in Portugal, sourced in Italy.",
  metadataBase: new URL("https://solace.luxury"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "SOLACE | Premium Streetwear",
    description:
      "Wear Quiet. Leave an Impression. Minimal monochrome luxury garments.",
    url: "https://solace.luxury",
    siteName: "SOLACE",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SOLACE | Premium Streetwear",
    description:
      "Wear Quiet. Leave an Impression. Luxury outerwear, footwear, and accessories.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-black">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased text-white font-sans bg-black`}
      >
        {children}
      </body>
    </html>
  );
}
