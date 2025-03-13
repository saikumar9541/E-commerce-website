import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./context/CartContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: "ExploreWithMe - Your Adventure Fashion Destination",
  description: "Discover the latest trends in adventure clothing for men and women at ExploreWithMe. Quality apparel for your next journey.",
  keywords: ["fashion", "clothing", "adventure", "men's clothing", "women's clothing", "outdoor apparel", "travel gear"],
  authors: [{ name: "ExploreWithMe Team" }],
  creator: "ExploreWithMe",
  publisher: "ExploreWithMe",
  openGraph: {
    title: "ExploreWithMe - Your Adventure Fashion Destination",
    description: "Discover the latest trends in adventure clothing for men and women at ExploreWithMe. Quality apparel for your next journey.",
    url: "https://explorewithme.com",
    siteName: "ExploreWithMe",
    images: [
      {
        url: "/logo/explore-logo.svg",
        width: 40,
        height: 40,
        alt: "ExploreWithMe Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ExploreWithMe - Your Adventure Fashion Destination",
    description: "Discover the latest trends in adventure clothing for men and women at ExploreWithMe. Quality apparel for your next journey.",
    images: ["/logo/explore-logo.svg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
