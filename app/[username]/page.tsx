"use client";

import { notFound, useRouter } from "next/navigation";
import React, { useState } from "react";
import userData from "../api/userData";
import PFP from "@/components/ui/PFP";
import {
  FiDelete,
  FiEdit,
  FiGrid,
  FiPlayCircle,
  FiSend,
  FiTrash,
  FiTrash2,
  FiUser,
  FiUserCheck,
  FiUserPlus,
} from "react-icons/fi";
import { RiUserUnfollowLine } from "react-icons/ri";
import BottomNavbar from "@/components/bottomnav/BottomNavbar";
import Sidebar from "@/components/sidebar/Sidebar";
import deletePost from "../api/deletePost";

type User = {
  name: string;
  username: string;
  image: string;
  followers: string[];
  following: string[];
  userId: number;
  country: string;
  bio: string;
};

export default function Profile({ params }: { params: { username: string } }) {
  const username: string = params.username.replace("%40", "");
  const UserList = userData.UserList;
  const loggedInUser: User = userData.fetchUser();
  const user: User = getUser();
  const [isFollowing, setFollowing] = useState(user.followers.includes(loggedInUser.username) || loggedInUser.following.includes(username));
  const router = useRouter();

  function getUser(): User {
    let user: User = {
      name: "",
      username: "",
      image: "",
      followers: [],
      following: [],
      userId: 0,
      country: "Unknown",
      bio: "",
    };

    if (loggedInUser && username === loggedInUser.username) {
      user = loggedInUser;
    }

    UserList.forEach((item) => {
      if (item.username === username) {
        user = item;
      }
    });
    return user;
  }

  function followUser() {
    setFollowing(!isFollowing);

    if (!user.followers.includes(username)) {
      user.followers.push(user.username)
      loggedInUser.following.push(username)
    }
    else {
      let temp: any = []
      user.followers.forEach(item => {
        if (item == username) return

        temp.push(item)
      })

      user.followers = temp
    }
  }

  function openDm() {
    router.push(`/dm/${username}`);
  }

  const style = {
    backgroundColor: isFollowing
      ? "rgb(var(--foreground-color) / 1)"
      : "royalblue",
    color: isFollowing ? "rgb(var(--secondary-color))" : "white",
  };

  if (params.username.startsWith("%40"))
    if (user.username == username)
      return (
        <>
          <Sidebar />
          <BottomNavbar />
          <div className=" profile-pg w-full h-[100vh] px-5 flex flex-col items-end justify-start py-10 overflow-y-auto">
            <div className="main-content w-[800px] flex flex-col items-center justify-start gap-6">
              <div className="info w-full flex items-center justify-between">
                <div className="usr-dtl flex items-center justify-center gap-5">
                  <PFP image={user.image} size={75} />
                  <div className="flex flex-col items-start justify-center gap-1">
                    <h1 className="name text-[1.2rem] font-medium">
                      {user.name}
                    </h1>
                    <p className="usrname text-secondary-color font-medium">
                      @{username}
                    </p>
                  </div>
                </div>
                <div className="content-counts flex justify-center items-center gap-7 text-[1.02rem] text-secondary-color">
                  <div className="ccc flex flex-col justify-center items-center gap-2 w-[100px]">
                    <span className="num text-[1.5rem] text-primary-color font-medium">
                      {Intl.NumberFormat("en", { notation: "compact" }).format(
                        userData.fetchPost("feed-post", user.userId).length
                      )}
                    </span>
                    <div>
                      <span>Posts</span>
                    </div>
                  </div>
                  <div className="ccc flex flex-col justify-center items-center gap-2 w-[100px]">
                    <span className="num text-[1.5rem] text-primary-color font-medium">
                      {Intl.NumberFormat("en", { notation: "compact" }).format(
                        user.followers.length
                      )}
                    </span>
                    <div>
                      <span>Followers</span>
                    </div>
                  </div>
                  <div className="ccc flex flex-col justify-center items-center gap-2 w-[100px]">
                    <span className="num text-[1.5rem] text-primary-color font-medium">
                      {Intl.NumberFormat("en", { notation: "compact" }).format(
                        user.following.length
                      )}
                    </span>
                    <div>
                      <span>Following</span>
                    </div>
                  </div>
                </div>
              </div>
                        
              <section className="bio w-[800px] flex flex-col items-center justify-start text-secondary-color px-1 py-5 gap-5">
                <div className="w-full flex flex-col justify-start gap-3 items-start">
                  <pre className="ctgry-info w-[500px] text-secondary-color text-[1.1rem] flex items-center justify-start gap-5">
                    {user.bio}
                  </pre>
                </div>
              </section>

              <ul className="flex w-full justify-end items-center gap-5text-[1rem] gap-5">
                {loggedInUser && loggedInUser.username !== username ? (
                  <li
                    className="px-4 pr-[16px] py-2 flex gap-2 items-center justify-center rounded-full transition-transform active:scale-95 cursor-pointer"
                    style={style}
                    onClick={followUser}
                  >
                    <span>
                      {isFollowing ? <FiUserCheck /> : <FiUserPlus />}
                    </span>
                    <span className=" font-medium">
                      {isFollowing ? "Following" : "Follow"}
                    </span>
                  </li>
                ) : (
                  <></>
                )}
                {loggedInUser && loggedInUser.username !== username ? (
                  <li
                    className="px-4 pr-[16px] py-2 flex gap-2 items-center justify-center rounded-full transition-all active:scale-95 cursor-pointer"
                    style={{
                      backgroundColor: "rgb(var(--foreground-color) / 1)",
                      color: "rgb(var(--secondary-color)",
                    }}
                    onClick={openDm}
                  >
                    <span>
                      <FiSend />
                    </span>
                    <span className=" font-medium">Message</span>
                  </li>
                ) : (
                  <></>
                )}
                {loggedInUser && loggedInUser.username === username ? (
                  <li
                    className="px-4 pr-[16px] py-2 flex gap-2 items-center justify-center rounded-full transition-all active:scale-95 cursor-pointer"
                    style={{
                      backgroundColor: "rgb(var(--foreground-color) / 1)",
                      color: "rgb(var(--secondary-color)",
                    }}
                  >
                    <span>
                      <FiEdit />
                    </span>
                    <span className=" font-medium">Edit</span>
                  </li>
                ) : (
                  <></>
                )}
              </ul>
            </div>

            <section className="post-prt w-[800px] flex flex-col items-center justify-start mt-10 ml-2 gap-7">
              <div className="w-full flex items-center justify-between">
                <h1 className="ctgry-title w-full cursor-pointer text-primary-color text-[1.5rem] flex items-center justify-start gap-5 font-semibold">
                  <span className=" text-secondary-color">
                    <FiGrid />
                  </span>
                  Posts
                </h1>

                <h1 className="ctgry-title cursor-pointer w-full text-secondary-color text-[1.5rem] flex items-center justify-start gap-5 font-semibold">
                  <span className=" text-secondary-color">
                    <FiPlayCircle />
                  </span>
                  Reels
                </h1>
              </div>

              <div className="w-full flex flex-wrap items-start justify-start">
                {userData.fetchPost("feed-post", user.userId).map((item) => (
                  <div
                    key={crypto.randomUUID()}
                    className="post-prvw size-[266.6px] relative"
                  >
                    <img
                      src={item.image}
                      alt=""
                      className="size-full object-cover aspect-square"
                    />

                    {loggedInUser && loggedInUser.username === username ? (
                      <span
                        className=" text-[1.3rem] bg-foreground-color/40 text-[#eeecff] transition-all active:scale-95 cursor-pointer rounded-full px-3 py-3 absolute top-2 left-2 hover:bg-red-500"
                        onClick={() => {
                          deletePost(item.id);
                        }}
                      >
                        <FiTrash2 />
                      </span>
                    ) : (
                      <></>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>
        </>
      );
    else
      return (
        <div className=" w-full h-[100vh] flex flex-col justify-center items-center gap-5">
          <span className="text-[15rem] text-foreground-color">
            <RiUserUnfollowLine />
          </span>
          <h1 className=" text-secondary-color text-[2rem] font-medium">
            User Not Found!
          </h1>
        </div>
      );
  else return notFound();
  // return (
  //   <div className=" w-full h-[100vh] flex flex-col justify-center items-center gap-5">
  //     <span className="text-[15rem] text-foreground-color">
  //       <BiError />
  //     </span>
  //     <h1 className=" text-secondary-color text-[2rem] font-medium">
  //       Page Not Found!
  //     </h1>
  //   </div>
  // );
}
