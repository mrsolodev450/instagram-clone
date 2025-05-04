"use client";
import { ChatBubble, ChatLines, Heart, HeartSolid, Message, MoreVert, Send, SendDiagonal, ShareAndroid, ShareIos } from "iconoir-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { BiMessageAltDetail, BiSend } from "react-icons/bi";
import { FaHeart } from "react-icons/fa";
import { FiBookmark, FiHeart, FiMoreVertical } from "react-icons/fi";

export default function Reel({ params }: { params: { reel: string } }) {
  const router = useRouter();
  const [isReelLiked, setReelLiked] = useState(false);

  function handlePostLike() {
    // action(PostRef.current?.id, "like");

    isReelLiked ? setReelLiked(false) : setReelLiked(true);
  }

  function fetchReel() {
    let reelId: string = "";
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for (let i = 0; i < 6; i++) {
      reelId += chars[Math.floor(Math.random() * chars.length)];
    }
    router.push(`${reelId}`);
  }

  function handleScrollReel() {
    fetchReel();
  }
  return (
    <div className="flex items-center justify-center gap-5 h-auto aspect-[9/16]">
      <div className="w-[350px] flex flex-col items-center justify-center gap-5">
        <div className="w-full flex items-center justify-start gap-5 px-3">
          <Link href={`/`}>
            <img
              src={"/default-user-pfp.png"}
              className="w-[50px] h-auto aspect-square object-fill rounded-full"
            />
          </Link>
          <div className="flex flex-col justify-center items-start gap-0">
            <h1 className="text-[1rem] font-semibold text-primary-color">
              <Link href={`/`}>instauser</Link>
            </h1>
            <p className="text-secondary-color font-medium text-[0.9rem]">
              5sec ago
            </p>
          </div>
        </div>
        <div
          className="w-full bg-foreground-color h-auto aspect-[9/16] flex justify-center items-center text-[2rem] uppercase font-extrabold rounded-[20px]"
          onClick={fetchReel}
        >
          {/* {user.stories &&
          (user.stories[0].content.endsWith(".jpg") ? (
            <Image
              src={`${user.stories[0].content}`}
              alt={""}
              width={1000}
              height={1000}
              className=" object-cover aspect-[9/16] h-[90%] w-[90%] rounded-[20px] shadow-lg"
            />
          ) : (
            <video
              src={`${user.stories[0].content}`}
              autoPlay
              ref={videoRef}
              onClick={handleVideo}
              className=" object-cover aspect-[9/16] h-[90%] w-[90%] rounded-[20px] shadow-lg"
            />
          ))} */}

          {params.reel}
        </div>
      </div>

      <div className="h-[80%] flex flex-col justify-end items-center">
        <div className="flex flex-col items-center justify-start gap-5">
          <span
            className="icon only-icon text-[1.6rem]"
            onClick={handlePostLike}
          >
            {isReelLiked ? (
              <span className="text-red-500">
                <HeartSolid width={30} height={30} strokeWidth={1.5}/>
              </span>
            ) : (
              <Heart width={30} height={30} strokeWidth={1.5}/>
            )}
          </span>
          <span className="icon only-icon text-[1.6rem]">
            <ChatLines width={30} height={30} strokeWidth={1.5}/>
          </span>
          <span className="icon only-icon text-[1.6rem]">
            <SendDiagonal width={29} height={29} strokeWidth={1.5}/>
          </span>
          <span className="icon only-icon text-[1.6rem]">
            <FiMoreVertical />
          </span>
        </div>
      </div>
    </div>
  );
}
