"use client";

import UserCard from "@/components/UserCard";
import Sidebar from "@/components/sidebar/Sidebar";
import React, { useState } from "react";
import userData from "../api/userData";
import BottomNavbar from "@/components/bottomnav/BottomNavbar";
import SearchBar from "@/components/SearchBar";

export default function SearchPage() {
 
  const users = userData.UserList;
  const [findedUsers, setFindedUsers] = useState([])

  function findUser(value: string) {
    let temp: any = []
    users.forEach((user) => {
      if ((user.username.includes(value.trim().replace(' ', '_')) || user.name.includes(value.trim().replace(' ', '_'))) && value.trim() !== "") {
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
