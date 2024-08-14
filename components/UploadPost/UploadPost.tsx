"use client";

import React, { useState } from "react";
import TitleBar from "./TitleBar";
import PostImage from "./PostImage";
import PostCaption from "./PostCaption";
import PFP from "../ui/PFP";
import userData from "@/app/api/userData";

type UploadPost = {
  action?: any;
  image?: string;
  close?: any;
  show?: boolean;
};

export default function UploadPost({
  action = () => {},
  close = () => {},
  image,
  show = false,
}: UploadPost) {
  const [caption, setCaption] = useState("");
  const FeedPosts = GetData('feed-post')

  function getCaption(val: string) {
    setCaption(val);
  }

  function GetData(key: string) {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem(key) ?? "[{}]");
    }
  
  }

  function postData() {
    const obj = {
      caption: caption,
      timePosted: getCurrentTime(),
      image: image ? image : '',
      reactions: {
        likes: 0,
        comments: {
          count: 0,
          data: "null",
        },
        shares: 0,
        saves: 0,
      },
      likedUser: [],
      id: (FeedPosts.length - 1) * userData.fetchUser().userId,
      userId: userData.fetchUser().userId
    };
    action(obj);

    close();
    
  }

  function getCurrentTime() {
    const MonthNames = ["Jan", "Feb", "March", "May", "Jun", "July", "Aug", "Nov", "Dec"]

    let time = new Date(Date.now())
    let hours: any
    let minutes = time.getMinutes() 
    let date = time.getDate()
    let month = MonthNames[time.getMonth() - 1]
    let year = time.getFullYear()
    let AoP = time.getHours() <= 12 ? "AM" : "PM"

    if (time.getHours() > 12) 
      hours = time.getHours() - 12

    if (hours < 10)
      hours = `0${hours}`

    return `${date} ${month} ${year}, ${hours}:${minutes} ${AoP}`
    
  }

  if (show)
    return (
      <>
        <div className="absolute upload-file-popup transition-all inset-0 z-[999] m-auto w-fit h-fit bg-foreground-color rounded-[14px] flex flex-col justify-start items-center overflow-hidden shadow-md shadow-background-color/20  overflow-x-hidden overflow-y-auto">
          <TitleBar
            title="Create Post"
            showBackIcon
            showNextButton
            action={postData}
            close={close}
          />
          <div className="w-full flex items-center justify-between gap-1 main-prt">
            <PostImage image={image ? image : ""} />
            <div className="h-[500px] overflow-auto flex flex-col items-center justify-start gap-3  py-3 px-2 post-dtl">
              <div className="user-dtl flex items-center justify-start gap-4 w-full">
                <PFP image={userData.fetchUser() ? userData.fetchUser().image : "/default-user-pfp.png"} />
                <h1 className="text-[.9rem] flex items-center justify-start gap-1">
                  {userData.fetchUser().name}
                </h1>
              </div>
              <PostCaption action={getCaption} />
            </div>
          </div>
        </div>

        <div className="w-screen h-screen bg-[#000]/60 fixed inset-0 z-[997]"></div>
      </>
    );
  else return <></>;
}
