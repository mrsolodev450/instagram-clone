"use client";

import React from "react";
import PFP from "./ui/PFP";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import userData from "@/app/api/userData";

type User = {
  name: string;
  username: string;
  image: string;
};

export default function DmList({ user }: { user: User[] }) {
  const router = useRouter();
  const loggedInUser = userData.fetchUser()

  return (
    <section className=" px-5 py-5 dm-list gap-5">
      <div className="flex max-[750px]:hidden items-center justify-start w-full gap-5 text-[2.2rem]">
        <span className="text-[1.4rem] font-semibold">Messages</span>
      </div>

      <section className=" notes w-[250px] h-[200px] overflow-x-auto flex justify-start items-center gap-5 px-2" >

        <div className="w-[70px] flex-shrink-0 relative flex flex-col justify-center items-center gap-3">
          <div className=" w-[60px] h-[60px] relative before:absolute before:content-['+'] before:rounded-full before:w-[20px] before:h-[20px] before:bg-royalblue before:text-[#eeecff] before:bottom-0 before:right-1 before:flex before:justify-center before:items-center before:font-bold before:border before:border-primary-color">
            <Image src={loggedInUser.image ?? "/default-user-pfp.png"} alt={""} width={150} height={150} className="w-full h-full rounded-full" />
          </div>
          <h1 className="text-[0.9rem] whitespace-nowrap w-full text-ellipsis text-secondary-color overflow-hidden text-center">Your Note</h1>
          <div className="w-full h-auto max-h-[50px] bg-foreground-color absolute top-[-20px] left-[-5px] overflow-hidden rounded-[15px] px-3 py-2 text-secondary-color text-[0.8rem]">
             Note
          </div> 
        </div>

        <div className="w-[70px] flex-shrink-0 relative flex flex-col justify-center items-center gap-3">
          <div className=" w-[60px] h-[60px]">
            <Image src={userData.UserList[1].image ?? "/default-user-pfp.png"} alt={""} width={150} height={150} className="w-full h-full rounded-full" />
          </div>
          <h1 className="text-[0.9rem] whitespace-nowrap w-full text-ellipsis text-secondary-color overflow-hidden text-center">{userData.UserList[1].username}</h1>

          <div className="w-full h-auto max-h-[50px] bg-foreground-color absolute top-[-20px] left-[-5px] overflow-hidden rounded-[15px] px-3 py-1 text-primary-color text-[0.8rem]">
            Lorem ipsum...
          </div>
        </div>

      </section>

      <ul className=" flex flex-col items-center justify-start gap-7">
        {user.map((user, index) => (
          <li
            key={index}
            className="w-[400px] px-3 sidebar-item h-[40px] icon flex items-center justify-start gap-5"
          >
            <Link
              className="w-full h-full flex items-center justify-start gap-5"
              href={`/dm/${user.username}`}
            >
              <span className="text-[1.7rem]">
                {<PFP image={user.image} />}
              </span>
              <p className="text-[1.05rem] text-primary-color">{user.name}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

