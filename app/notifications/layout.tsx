import React from "react";

export default function NotificationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col pt-[100px] w-full h-screen items-center justify-start">
      {children}
    </div>
  );
}