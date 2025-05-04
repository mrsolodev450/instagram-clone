import React, { useState } from "react";
import PFP from "./ui/PFP";
import { FiUserCheck, FiUserPlus } from "react-icons/fi";
import { useRouter } from "next/navigation";
import userData from "@/app/api/userData";

type UserCard = {
  user: User;
  action?: any;
};

type User = {
  name: string;
  username: string;
  image: string;
  userId: number
};


export default function UserCard({ user }: UserCard) {
  const [isFollowing, setFollowing] = useState(false);
  const router = useRouter()
  function followUser() {
    setFollowing(!isFollowing);
  }

  function openProfile() {
    router.push(`/${user.username}`)
  }


  const style = {
    backgroundColor: isFollowing
      ? "rgb(var(--foreground-color) / 1)"
      : "royalblue",
    color: isFollowing
      ? "rgb(var(--secondary-color))"
      : "white",
  };
  return (
    <div className="user-card w-[500px] pl-3.5 py-3 flex items-center justify-center gap-6 rounded-[30px] transition-all">
      <div className="flex items-center justify-center gap-6 w-full cursor-pointer" onClick={openProfile}>
        <PFP image={user.image} />
        <div className="flex w-full flex-col items-start justify-center gap-[0.5px]">
          <h2 className="whitespace-nowrap text-ellipsis overflow-hidden w-[200px]">
            {user.name}
          </h2>
          <p className=" text-secondary-color whitespace-nowrap text-ellipsis overflow-hidden w-[200px]">
            {user.username}
          </p>
        </div>
      </div>
      {userData.fetchUser() && user.username !== userData.fetchUser().username ? <ul className=" flex justify-end items-center gap-5 text-[0.9rem] actn-btn">
        <li
          className="px-4 pr-[16px] py-2 flex gap-2 items-center justify-center rounded-[13px] transition-transform active:scale-95 cursor-pointer"
          style={style}
          onClick={followUser}
        >
          {/* <span>{isFollowing ? <FiUserCheck /> : <FiUserPlus />}</span> */}
          <span className=" font-medium">
            {isFollowing ? "Following" : "Follow"}
          </span>
        </li>
      </ul> : <></>}
    </div>
  );
}
