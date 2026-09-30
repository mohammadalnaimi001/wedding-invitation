import type { Metadata, Viewport } from "next";
import {
  weddingConfig,
  invitationTitle,
  invitationDescription,
  formatTime,
} from "@/lib/wedding-config";
import "./globals.css";
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#102822",
};
export const metadata: Metadata = {
  ...(weddingConfig.siteUrl
    ? { metadataBase: new URL(weddingConfig.siteUrl) }
    : {}),
  title: invitationTitle,
  description: invitationDescription,
  robots: { index: false, follow: false },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    title: invitationTitle,
    description: invitationDescription,
    type: "website",
    locale: "ar_JO",
    siteName: invitationTitle,
    images: [
      { url: "/og.png", width: 1200, height: 630, alt: invitationTitle },
    ],
    ...(weddingConfig.siteUrl ? { url: weddingConfig.siteUrl } : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: invitationTitle,
    description: invitationDescription,
    images: ["/og.png"],
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link
          rel="preload"
          href="/fonts/amiri-arabic.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/noto-sans-arabic.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        {children}
        <noscript>
          <div className="no-js">
            <h1>{invitationTitle}</h1>
            <p>{invitationDescription}</p>
            <p>
              من الساعة {formatTime(weddingConfig.weddingStartTime)} مساءً حتى{" "}
              {formatTime(weddingConfig.weddingEndTime)} مساءً
            </p>
            <a href={weddingConfig.mapsUrl}>موقع الحفل على خرائط Google</a>
            <p>للاستمتاع بالدعوة المتحركة، يرجى تفعيل JavaScript.</p>
          </div>
        </noscript>
      </body>
    </html>
  );
}
