import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "STAEM Challenge - Next SSG",
  description: "Catalogo de jogos com App Router, SSG e arquitetura MVVM.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={sora.variable}>
      <body>{children}</body>
    </html>
  );
}
