"use client";

import React from "react";
import PFP from "../ui/PFP";
import { useRouter } from "next/navigation";
import Link from "next/link";

type User = {
  name: string;
  username: string;
  image: string;
};

export default function DmSidebar({ user }: { user: User[] }) {
  const router = useRouter();

  return (
    <section className=" px-5 py-5 flex flex-col items-center justify-start  dm-sidebar gap-10">
      <div className="flex items-center justify-start w-full gap-5 text-[2.2rem] title">
        <span className="text-[1.4rem] font-semibold">Messages</span>
      </div>

      <ul className=" flex flex-col items-center justify-start gap-5">
        {user.map((user, index) => (
          <li
            key={index}
            className="w-[200px] sidebar-item h-[40px] icon flex items-center justify-start gap-5"
          >
            <Link
              className="w-full h-full flex items-center justify-start gap-5"
              href={`/dm/${user.username}`}
            >
              <span className="text-[1.7rem]">
                {<PFP image={user.image} />}
              </span>
              <p className="text-[1.05rem]">{user.name}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

// onClick={() => {
//   if (typeof window !== "undefined" && window.history.state === '/dm') {
//     router.replace(`/dm/${user.username}`);
//   } else router.push(`/${user.username}`);
// }}
