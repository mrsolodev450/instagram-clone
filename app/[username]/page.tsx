"use client";

import { notFound, useRouter } from "next/navigation";
import React, { use, useEffect, useRef, useState } from "react";
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
import BottomNavbar from "@/components/bottomnav/BottomNavbar";
import Sidebar from "@/components/sidebar/Sidebar";
import deletePost from "../api/deletePost";
import Navbar from "@/components/navbar/Navbar";
import { useAppDispatch, useAppSelector } from "../lib/store/hooks";
import { remove } from "../lib/store/features/post/postSlice";
import { changeImage, removePost } from "../lib/store/features/user/userSlice";

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
  const username: string = params.username;
  const UserList = userData.UserList;
  const loggedInUser: User = userData.fetchUser();
  const user: User = getUser();
  const [isFollowing, setFollowing] = useState(
    user.followers.includes(loggedInUser.username) ||
      loggedInUser.following.includes(username)
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const bioRef = useRef<HTMLParagraphElement>(null);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.users.items);

  const userImage = currentUser.username == user.username ? currentUser.image : user.image 

  useEffect(() => {
    if (bioRef.current) {
      bioRef.current.textContent = user.bio;
    }
  }, []);

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
      user.followers.push(user.username);
      loggedInUser.following.push(username);
    } else {
      let temp: any = [];
      user.followers.forEach((item) => {
        if (item == username) return;

        temp.push(item);
      });

      user.followers = temp;
    }
  }

  function openDm() {
    router.push(`/dm/${username}`);
  }

  function handleRemovePost(id: number) {
    dispatch(remove(id));
    dispatch(removePost(id));
  }

  const style = {
    backgroundColor: isFollowing
      ? "rgb(var(--foreground-color) / 1)"
      : "royalblue",
    color: isFollowing ? "rgb(var(--secondary-color))" : "white",
  };

  function handleProfileEdit() {
    if (currentUser.username == username)
      fileInputRef.current?.click();
  }

  function chooseFile(e: any) {
    const reader = new FileReader();

    if (e.target && e.target.files !== null) {
      reader.readAsDataURL(e.target.files[0]);
      reader.addEventListener("load", () => {
        dispatch(changeImage(reader.result))
      });
    }
  }

  if (user.username == username)
    return (
      <>
        <Sidebar />
        <Navbar title={user.username} type="PROFILE" />
        <BottomNavbar />
        <div className=" profile-pg w-full h-[100vh] px-5 flex flex-col items-end justify-start py-10 overflow-x-hidden overflow-y-auto">
          <div className="main-content max-[850px]:w-full w-[800px] flex items-center justify-start max-[750px]:gap-5 gap-[70px]">
            <div className="w-full max-[850px]:w-auto flex items-center justify-start gap-5">
              <PFP image={userImage} width={250} action={handleProfileEdit}/>
              <div className=" max-[500px]:flex hidden justify-center w-full items-center gap-5 text-[0.8rem] text-primary-color">
                <div className="ccc flex flex-col justify-center items-center gap-2">
                  <span className="text-[1.4rem] text-primary-color font-semibold">
                    {Intl.NumberFormat("en", { notation: "compact" }).format(
                      currentUser.posts.length
                    )}
                  </span>
                  <div>
                    <span>Posts</span>
                  </div>
                </div>
                <div className="ccc flex flex-col justify-center items-center gap-2">
                  <span className="text-[1.4rem] text-primary-color font-semibold">
                    {Intl.NumberFormat("en", { notation: "compact" }).format(
                      user.followers.length
                    )}
                  </span>
                  <div>
                    <span>Followers</span>
                  </div>
                </div>
                <div className="ccc flex flex-col justify-center items-center gap-2">
                  <span className="text-[1.4rem] text-primary-color font-semibold">
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
            <div className="info w-full flex flex-col max-[500px]:flex-col-reverse items-center justify-start gap-3">
              <div className="usr-dtl w-full flex items-center justify-center gap-5">
                <div className="w-full flex items-center justify-start gap-5">
                  <p className="usrname max-[500px]:hidden block text-primary-color text-[1.1rem] font-medium">
                    {username}
                  </p>

                  <ul className="flex max-[500px]:w-full max-[500px]:justify-start justify-center items-center text-[0.9rem] gap-2">
                    {loggedInUser && loggedInUser.username !== username ? (
                      <li
                        className="px-4 max-[500px]:w-full pr-[16px] py-2 flex gap-2 items-center justify-center rounded-[13px] transition-transform active:scale-95 cursor-pointer"
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
                        className="px-4 max-[500px]:w-full pr-[16px] py-2 flex gap-2 items-center justify-center rounded-[13px] transition-all active:scale-95 cursor-pointer"
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
                        className="px-4 pr-[16px] py-2 flex gap-2 items-center justify-center rounded-[13px] transition-all active:scale-95 cursor-pointer"
                        style={{
                          backgroundColor: "rgb(var(--foreground-color) / 1)",
                          color: "rgb(var(--secondary-color)",
                        }}
                        onClick={() => {
                          handleProfileEdit();
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
              </div>
              <div className="content-counts max-[500px]:hidden flex justify-start w-full items-center gap-7 text-[1.02rem] text-secondary-color">
                <div className="ccc flex justify-start items-center gap-2 w-[100px]">
                  <span className="num text-[1.5rem] text-primary-color font-medium">
                    {Intl.NumberFormat("en", { notation: "compact" }).format(
                      currentUser.posts.length
                    )}
                  </span>
                  <div>
                    <span>Posts</span>
                  </div>
                </div>
                <div className="ccc flex justify-center items-center gap-2 w-[100px]">
                  <span className="num text-[1.5rem] text-primary-color font-medium">
                    {Intl.NumberFormat("en", { notation: "compact" }).format(
                      user.followers.length
                    )}
                  </span>
                  <div>
                    <span>Followers</span>
                  </div>
                </div>
                <div className="ccc flex justify-center items-center gap-2 w-[100px]">
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
              <section className="bio w-[800px] flex flex-col items-center justify-start text-secondary-color px-1 py-5 gap-5">
                <div className="w-full flex flex-col justify-start gap-3 items-start">
                  <h1 className="max-[750px]:text-[1rem] text-[1.2rem] font-semibold text-primary-color">
                    {user.name}
                  </h1>
                  <p
                    className=" w-[300px] max-[350px]:w-full text-primary-color text-[1rem] max-[750px]:text-[0.8rem] flex items-center justify-start gap-5"
                    ref={bioRef}
                  ></p>
                </div>
              </section>
            </div>
          </div>

          <section className="post-prt w-[800px] flex flex-col items-center justify-start mt-10 ml-2 gap-7">
            <div className="w-full flex items-center justify-center gap-10 border-t border-t-foreground-color/50 py-3">
              <h1 className="ctgry-title cursor-pointer text-primary-color text-[1.2rem] flex items-center justify-start gap-2 font-semibold">
                <span>
                  <FiGrid />
                </span>
                Posts
              </h1>

              <h1 className="ctgry-title cursor-pointer text-secondary-color text-[1.2rem] flex items-center justify-start gap-2 font-semibold">
                <span>
                  <FiPlayCircle />
                </span>
                Reels
              </h1>
            </div>

            <div className="w-full flex flex-wrap items-start justify-start">
              {currentUser.posts.map((item, index) => (
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
                      className=" text-[1.3rem] max-[750px]:text-[1rem] bg-foreground-color/40 text-[#eeecff] transition-all active:scale-95 cursor-pointer rounded-full px-3 py-3 absolute top-2 left-2 hover:bg-red-500"
                      onClick={() => handleRemovePost(index)}
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
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => chooseFile(e)}
          hidden
        />
      </>
    );
  else return notFound();
}
