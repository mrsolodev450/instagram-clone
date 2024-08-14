"use client";

import React, { useState } from "react";
import { FiHome, FiPlusCircle, FiSearch } from "react-icons/fi";
import { useRouter } from "next/navigation";
import userData from "@/app/api/userData";
import uploadPost from "@/app/api/uploadPost";
import PFP from "../ui/PFP";
import Item from "./Item";
import { IoMdNotificationsOutline } from "react-icons/io";
import UploadPost from "../UploadPost/UploadPost";
import ChooseFile from "../UploadPost/ChooseFile";

export default function BottomNavbar() {
  const [isFileChoosing, setFileChoosing] = useState(false);
  const [isFileUploading, setFileUploading] = useState(false);
  const [choosedFile, setChoosedFile] = useState("");
  const router = useRouter();

  const Items = [
    {
      title: "Home",
      icon: <FiHome />,
      action: () => {
        router.replace(`/`);
      },
    },
    {
      title: "Search",
      icon: <FiSearch />,
      action: () => {
        router.replace(`/search`);
      },
    },
    {
      title: "Create",
      icon: <FiPlusCircle />,
      action: () => {
        setFileChoosing(true);
      },
    },
    {
      title: "Notification",
      icon: <IoMdNotificationsOutline />,
      action: () => {
        router.replace("/notifications");
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
        router.replace(`/@${userData.User.username}`);
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
      <section className="w-full h-[50px] px-1 fixed left-0 bottom-0 z-50 bg-foreground-color flex items-center justify-center bottom-nav">
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
