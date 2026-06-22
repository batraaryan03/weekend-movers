import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, IBM_Plex_Serif } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const ibmPlexSerif = IBM_Plex_Serif({
  variable: "--font-ibm-plex-serif",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#011936",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://weekendmovers.com.au"),
  title: "Weekend Movers - Trusted, Reliable & Transparent",
  description:
    "Melbourne local movers and removalists. Transparent pricing, same-day & weekend availability. Professional service rated 5★ by Melbourne locals. Call now for a free quote!",
  keywords:
    "Melbourne movers, local movers Melbourne, removalists Melbourne, weekend movers, same-day movers, furniture movers Melbourne, house moving Melbourne, affordable movers",
  openGraph: {
    title: "Weekend Movers",
    description:
      "Melbourne local movers and removalists. Transparent pricing, same-day & weekend availability.",
    siteName: "Weekend Movers",
    locale: "en_AU",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Weekend Movers",
    description: "Melbourne local movers and removalists.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${ibmPlexSerif.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" href="/logo.png" />
        <link rel="apple-touch-icon" href="/logo.png" />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-white text-navy">
        {children}
      </body>
    </html>
  );
}
