"use client"

import React, { useEffect, useState } from "react";
import { BsThreads } from "react-icons/bs";
import {
  FiCompass,
  FiHeart,
  FiHome,
  FiInstagram,
  FiMenu,
  FiPlayCircle,
  FiPlusCircle,
  FiSearch,
  FiUser,
} from "react-icons/fi";
import { RiMessengerLine } from "react-icons/ri";
import PFP from "../ui/PFP";
import UploadPost from "../UploadPost/UploadPost";
import ChooseFile from "../UploadPost/ChooseFile";
import { useRouter } from "next/navigation";
import GetTheme from "@/app/api/getTheme";
import uploadPost from "@/app/api/uploadPost";
import userData from "@/app/api/userData";
import Item from "./Item";

type User = {
  image: string;
};

export default function Sidebar({ action = () => {} }: { action?: any }) {
  const [isFileChoosing, setFileChoosing] = useState(false);
  const [isFileUploading, setFileUploading] = useState(false);
  const [choosedFile, setChoosedFile] = useState("");
  const router = useRouter();
  const User: User = fetchUser();

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.body.classList.value = GetTheme() ?? "";
    }
  }, []);

  function fetchUser() {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("logged-user") ?? "{}");
    }
  }

  function getFile(val: string) {
    setChoosedFile(val);
    setFileChoosing(false);
    setFileUploading(true);
  }

  function logout() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("logged-user");
    }
    router.replace("/login");
  }

  const Items = [
    {
      id: 0,
      isActive: true,
      type: "link",
      path: "/",
      title: "Home",
      icon: <FiHome />,
    },
    {
      id: 1,
      isActive: false,
      type: "link",
      path: "/search",
      title: "Search",
      icon: <FiSearch />,
    },
    {
      id: 2,
      isActive: false,
      type: "link",
      path: "/explore",
      title: "Explore",
      icon: <FiCompass />
    },
    {
      id: 3,
      isActive: false,
      type: "link",
      path: "/reels",
      title: "Reels",
      icon: <FiPlayCircle />,
    },
    {
      id: 4,
      isActive: false,
      type: "link",
      path: "/dm",
      title: "Messages",
      icon: <RiMessengerLine />,
    },
    {
      id: 5,
      isActive: false,
      type: "link",
      path: "/notifications",
      title: "Notification",
      icon: <FiHeart />,
    },
    {
      id: 6,
      isActive: false,
      type: "normal",
      title: "Create",
      icon: <FiPlusCircle />,
      action: () => {
        setFileChoosing(true);
      },
    },
    {
      id: 7,
      isActive: false,
      type: "link",
      path: `/@${userData.fetchUser() && userData.fetchUser().username}`,
      title: "Profile",
      icon: <PFP image={userData.fetchUser() ? userData.fetchUser().image : "/defualt-user-pfp.png"} />,
    },
  ];

  return (
    <>
      <section className="h-full px-5 py-5 flex flex-col items-start justify-between sidebar">
        <div className="flex items-center justify-start text-[2.2rem] title">
          <span className="title-icon text-[1.7rem] icon">
            <FiInstagram />
          </span>
          <span className="title-text">Instagram</span>
        </div>

        <ul className="h-[70%] flex flex-col items-center justify-start gap-5">
        {Items.map((item, index) => (
            <Item
              id={item.id}
              isActive={item.isActive}
              type={item.type}
              path={item.path}
              key={index}
              title={item.title}
              icon={item.icon}
              action={item.action}
            />
          ))}
        </ul>

        <div className="h-[10%] flex flex-col items-center justify-start">
          <ul className="h-[100%] flex flex-col items-center justify-start gap-2">
            <li className="w-[200px] sidebar-item h-[40px] icon flex items-center justify-start gap-5">
              <span className="text-[1.7rem]">
                <BsThreads />
              </span>
              <p className="text-[1.2rem]">Threads</p>
            </li>
            <li className="w-[200px] sidebar-item h-[40px] icon flex items-center justify-start gap-5">
              <span className="text-[1.7rem]">
                <FiMenu />
              </span>
              <p className="text-[1.2rem]">More</p>
            </li>
          </ul>
        </div>
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
