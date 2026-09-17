import type { Metadata } from "next";
import { Big_Shoulders, Barlow_Condensed } from "next/font/google";
import { site } from "@/data/site";
import "./globals.css";

const display = Big_Shoulders({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-aperture-display",
});

const body = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-aperture-body",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.samfiallos.com"),
  title: site.title,
  description: site.description,
  openGraph: {
    title: "Sam Fiallos - Portfolio",
    description: site.description,
    url: "https://www.samfiallos.com",
    siteName: "Sam Fiallos - Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Sam Fiallos - Portfolio logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sam Fiallos - Portfolio",
    description: site.description,
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
