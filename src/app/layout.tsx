import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nexoil-landing.vercel.app"),
  title: "Nexoil Distribution Sdn Bhd — Malaysia's Leading Industrial Fuel Partner",
  description:
    "Nexoil Distribution Sdn Bhd powers Malaysia's industries with premium petroleum products, reliable logistics, and two decades of fuel distribution expertise.",
  keywords: [
    "Petronas",
    "industrial fuel",
    "diesel",
    "lubricant",
    "Malaysia",
    "Nexoil",
    "petroleum",
  ],
  icons: {
    icon: "/images/nexoil-logo.png",
    apple: "/images/nexoil-logo.png",
  },
  openGraph: {
    title: "Nexoil Distribution Sdn Bhd — Malaysia's Leading Industrial Fuel Partner",
    description:
      "Premium petroleum products, reliable logistics, and two decades of fuel distribution expertise.",
    url: "https://nexoil-landing.vercel.app",
    siteName: "Nexoil",
    locale: "en_MY",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexoil Distribution Sdn Bhd",
    description:
      "Premium petroleum products, reliable logistics, and two decades of fuel distribution expertise.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased ${inter.variable} ${sora.variable} ${inter.className}`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
