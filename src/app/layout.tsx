import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FloatingWhatsapp } from "@/components/floating-whatsapp";
import { getBaseUrl } from "@/lib/base-url";
import { city } from "@/lib/city";
import { Analytics } from "@vercel/analytics/next";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baseUrl = getBaseUrl();
const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: city.config.copy.metadataTitle,
    template: "%s | Coroa de Flores",
  },
  description: city.config.copy.metadataDescription,
  icons: {
    icon: [
      { url: "/icon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: city.config.copy.metadataTitle,
    description: city.config.copy.metadataDescription,
    url: "/",
    siteName: "Coroa de Flores",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: city.config.copy.metadataOgImageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: city.config.copy.metadataTitle,
    description: city.config.copy.metadataDescription,
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      {gtmId && (
        <Script
          id="gtm-script"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`,
          }}
        />
      )}
      <body className="min-h-full flex flex-col">
        <Header />
        {children}
        <Footer />
        <FloatingWhatsapp />
      </body>
      <Analytics />
    </html>
  );
}
