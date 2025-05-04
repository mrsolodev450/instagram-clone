import React, { Children } from "react";

export default function ReelsPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="w-dvw h-dvh bg-background-color flex items-center justify-center">{children}</div>;
}
