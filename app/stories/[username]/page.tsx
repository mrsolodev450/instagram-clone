"use client"

import fetchStories from "@/app/api/fetchStories";
import userData from "@/app/api/userData";
import { useAppDispatch, useAppSelector } from "@/app/lib/store/hooks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

type Author = {
  name: string;
  image: string;
};

type Story = {
  author: Author
  content: string
  time: string
}

type User = {
  name: string;
  username: string;
  image: string;
  followers: string[];
  following: string[];
  userId: number;
  country: string;
  bio: string;
  stories?: Story[]
};

export default function Story({ params }: { params: { username: string } }) {
  const username: string = params.username;
  const UserList = userData.UserList;
  const loggedInUser: User = userData.fetchUser();
  const user: User = getUser();
  const router = useRouter();
  const { stories, storiesCount } = fetchStories();
  const [currentStory, setCurrentStory] = useState()

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
      stories: []
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

  if (typeof window !== "undefined") {
    window.addEventListener("keydown", e => {
        if (e.key == "Escape") {
            router.replace("/")
        }
    })
  }

  function goBack() {
    
  }

  function goForward() {

  }

  return (
    <div className="w-[350px] flex flex-col items-center justify-center gap-5">
      <div className="w-full flex items-center justify-start gap-5 px-3">
        <Link href={`/${username}`}>
          <img
            src={user.image ?? "default-user-pfp.png"}
            className="w-[50px] h-auto aspect-square object-fill rounded-full"
          />
        </Link>
        <div className="flex flex-col justify-center items-start gap-0">
          <h1 className="text-[1rem] font-semibold text-primary-color">
            <Link href={`/${username}`}>{username}</Link>
          </h1>
          <p className="text-secondary-color font-medium text-[0.9rem]">
            5sec ago
          </p>
        </div>
      </div>
      <div className="w-full bg-foreground-color h-auto aspect-[9/16] flex justify-center items-center text-[2rem] uppercase font-extrabold rounded-[20px]">
         {user.stories && user.stories[0].content}
      </div>

      <div className=" fixed left-[20%] w-[50px] h-auto aspect-square bg-foreground-color rounded-full text-primary-color flex justify-center items-center text-[1.3rem] cursor-pointer transition-all active:scale-90 opacity-60 hover:opacity-100"
      onClick={goBack}>
        <FiArrowLeft />
      </div>

      <div className=" fixed right-[20%] w-[50px] h-auto aspect-square bg-foreground-color rounded-full text-primary-color flex justify-center items-center text-[1.3rem] cursor-pointer transition-all active:scale-90 opacity-60 hover:opacity-100"
      onClick={goForward}>
        <FiArrowRight />
      </div>
    </div>
  );
}
