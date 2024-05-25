"use client";

import Sidebar from "@/components/sidebar/Sidebar";

import userData from "../api/userData";
import BottomNavbar from "@/components/bottomnav/BottomNavbar";
import FollowNotify from "@/components/notify/FollowNotify";

export default function NotificationPage() {

  const Users = userData.UserList;

  return (
    <>
      <Sidebar />
      <BottomNavbar />
      <section className="w-full h-full px-5 pl-3 py-3 flex flex-col items-center justify-start gap-5">
        {Users.map((user, index) => (
          <FollowNotify user={user} key={index} />
        ))}
      </section>
    </>
  );
}
