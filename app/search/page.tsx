"use client";

import UserCard from "@/components/UserCard";
import Sidebar from "@/components/sidebar/Sidebar";
import React, { use, useState } from "react";
import userData from "../api/userData";
import BottomNavbar from "@/components/bottomnav/BottomNavbar";
import SearchBar from "@/components/SearchBar";

export default function SearchPage() {
 
  const users = userData.UserList;
  const [findedUsers, setFindedUsers] = useState(users)

  function findUser(value: string) {
    let temp: any = []
    if (value === '') setFindedUsers(users)
    users.forEach((user) => {
      if (user.username.includes(value.replace(' ', '_')) || user.name.includes(value.replace(' ', '_'))) {
        temp.push(user)
      }
    })
    setFindedUsers(temp)
  }

  return (
    <>
      <SearchBar action={findUser}/>
      <Sidebar />
      <BottomNavbar />
      <section className="w-full h-full px-5 pl-3 py-3 flex flex-col items-center justify-start gap-5">
        {findedUsers.map((user, index) => (
          <UserCard user={user} key={index} />
        ))}
      </section>
    </>
  );
}
