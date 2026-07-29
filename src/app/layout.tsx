import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "CrypServer - Crypto-Powered Server Hosting",
  description:
    "Rent VPS, Dedicated, GPU and Cloud Servers instantly using cryptocurrency. Fully autonomous infrastructure with instant deployment. No KYC required.",
  keywords: [
    "crypto server hosting",
    "VPS crypto",
    "dedicated server bitcoin",
    "anonymous hosting",
    "GPU server crypto",
    "cloud hosting cryptocurrency",
    "CrypServer",
  ],
  authors: [{ name: "CrypServer Team" }],
  creator: "CrypServer",
  publisher: "CrypServer",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://crypserver.io",
    siteName: "CrypServer",
    title: "CrypServer - Crypto-Powered Server Hosting",
    description:
      "Rent VPS, Dedicated, GPU and Cloud Servers instantly using cryptocurrency. Fully autonomous infrastructure with instant deployment.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CrypServer - Crypto-Powered Server Hosting",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CrypServer - Crypto-Powered Server Hosting",
    description:
      "Rent servers with crypto. Instant deployment, no KYC, full privacy.",
    creator: "@CrypServer",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: [{ url: "/logo.png", type: "image/png" }],
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#4AFF7A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-black text-white antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
