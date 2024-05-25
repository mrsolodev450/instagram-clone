import React, { useState } from "react";
import PFP from "../ui/PFP";
import { useRouter } from "next/navigation";
import { FiUserCheck, FiUserPlus } from "react-icons/fi";

type FollowNotify = {
  user: User;
  action?: any;
};

type User = {
  image: string;
  username: string;
  name: string;
};

export default function FollowNotify({ user, action }: FollowNotify) {
  const [isFollowing, setFollowing] = useState(false);
  const router = useRouter();
  function followUser() {
    setFollowing(!isFollowing);
  }

  function openProfile() {
    router.push(`/@${user.username}`);
  }

  const style = {
    backgroundColor: isFollowing
      ? "rgb(var(--foreground-color) / 1)"
      : "royalblue",
    color: isFollowing ? "rgb(var(--secondary-color))" : "white",
  };
  return (
    <div className="user-card w-[500px] pl-3.5 py-3 flex items-center justify-center gap-6 rounded-[30px] transition-all">
      <div
        className="flex items-center justify-center gap-6 w-full cursor-pointer"
        onClick={openProfile}
      >
        <PFP image={user.image} />
        <div className="flex w-full items-center justify-start gap-[1px]">
          <h2 className=" text-ellipsis overflow-hidden">
            {user.username} <span className=" text-secondary-color  text-ellipsis overflow-hidden">
            start following you
          </span>
          </h2>
          
        </div>
      </div>
      <ul className=" flex justify-end items-center gap-5 text-[1rem] actn-btn">
        <li
          className="px-4 pr-[16px] py-2 flex gap-2 items-center justify-center rounded-full transition-transform active:scale-95 cursor-pointer"
          style={style}
          onClick={followUser}
        >
          <span>{isFollowing ? <FiUserCheck /> : <FiUserPlus />}</span>
          <span className=" font-medium">
            {isFollowing ? "Following" : "Follow"}
          </span>
        </li>
      </ul>
    </div>
  );
}
