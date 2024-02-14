import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Instagram Clone",
  description: "Created By Krishan Murari",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="system-scheme" suppressHydrationWarning>{children}</body>
    </html>
  );
}
