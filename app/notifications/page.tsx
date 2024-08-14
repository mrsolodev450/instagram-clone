"use client";

import Sidebar from "@/components/sidebar/Sidebar";

import BottomNavbar from "@/components/bottomnav/BottomNavbar";

export default function NotificationPage() {

  return (
    <>
      <Sidebar />
      <BottomNavbar />
      <section className="w-full h-full px-5 pl-3 py-3 flex flex-col items-center justify-start gap-5">
        No Notifications
      </section>
    </>
  );
}
