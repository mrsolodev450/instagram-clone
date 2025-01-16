import type { Metadata } from "next";
import "./globals.css";
import StoreProvider from "./StoreProvider";

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
      <StoreProvider>
        <body className="light-scheme" suppressHydrationWarning>{children}</body>
      </StoreProvider>
    </html>
  );
}
