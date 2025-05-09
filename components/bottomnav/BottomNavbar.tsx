"use client";

import React, { useState } from "react";
import { FiHome, FiPlayCircle, FiPlusCircle, FiSearch } from "react-icons/fi";
import { useRouter } from "next/navigation";
import userData from "@/app/api/userData";
import uploadPost from "@/app/api/uploadPost";
import PFP from "../ui/PFP";
import Item from "./Item";
import { IoMdNotificationsOutline } from "react-icons/io";
import UploadPost from "../UploadPost/UploadPost";
import ChooseFile from "../UploadPost/ChooseFile";
import { ChatLines, Facetime, Heart, Home, HomeAlt, HomeSimpleDoor, HouseRooms, Instagram, MediaVideo, PlusCircle, Search, Settings, VideoCamera, ViewGrid } from "iconoir-react";

export default function BottomNavbar() {
  const [isFileChoosing, setFileChoosing] = useState(false);
  const [isFileUploading, setFileUploading] = useState(false);
  const [choosedFile, setChoosedFile] = useState("");
  const router = useRouter();

  const Items = [
    {
      title: "Home",
      icon: <HomeSimpleDoor width={28} height={28} strokeWidth={1.5}/>,
      action: () => {
        router.replace(`/`);
      },
    },
    {
      title: "Search",
      icon: <Search width={28} height={28} strokeWidth={1.5}/>,
      action: () => {
        router.replace(`/search`);
      },
    },
    {
      title: "Create",
      icon: <PlusCircle width={28} height={28} strokeWidth={1.5}/>,
      action: () => {
        setFileChoosing(true);
      },
    },
    {
      title: "Reels",
      icon: <Facetime width={28} height={28} strokeWidth={1.5}/>,
      action: () => {
        router.replace("/reels");
      },
    },
    {
      title: "Profile",
      icon: (
        <PFP
          image={
            userData.fetchUser()
              ? userData.fetchUser().image
              : "/default-user-pfp.png"
          }
        />
      ),
      action: () => {
        router.replace(`/${userData.User.username}`);
      },
    },
  ];

  function getFile(val: string) {
    setChoosedFile(val);
    setFileChoosing(false);
    setFileUploading(true);
  }

  return (
    <>
      <section className="w-full h-[50px] px-1 fixed left-0 bottom-0 z-50 bg-background-color border-t border-t-foreground-color/50 flex items-center justify-center bottom-nav">
        <ul className="w-[80%] flex items-center justify-between">
          {Items.map((item, index) => (
            <Item
              key={index}
              title={item.title}
              icon={item.icon}
              action={item.action}
            />
          ))}
        </ul>
      </section>

      <ChooseFile
        show={isFileChoosing}
        close={() => setFileChoosing(false)}
        action={getFile}
      />
      <UploadPost
        show={isFileUploading}
        close={() => setFileUploading(false)}
        image={choosedFile}
        action={uploadPost}
      ></UploadPost>
    </>
  );
}
