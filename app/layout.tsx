import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { PageTransition } from "@/components/shared/PageTransition";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Outfy — Your Virtual Wardrobe",
  description: "Quản lý tủ quần áo ảo, thử outfit với avatar 3D và nhận gợi ý từ AI Stylist.",
  keywords: ["fashion", "wardrobe", "outfit", "AI stylist", "thời trang"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${montserrat.variable} antialiased`}>
        <Providers><PageTransition>{children}</PageTransition></Providers>
      </body>
    </html>
  );
}
