import SearchBar from "@/components/SearchBar";
import React from "react";

export default function SettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col pt-[100px] w-full h-screen items-center justify-start overflow-y-auto">
      
      {children}
    </div>
  );
}