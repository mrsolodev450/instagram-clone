"use client";

import React, { useEffect, useState } from "react";
import { BsThreads } from "react-icons/bs";
import {
  FiCompass,
  FiHeart,
  FiHome,
  FiInstagram,
  FiLogOut,
  FiMenu,
  FiPlayCircle,
  FiPlusCircle,
  FiSearch,
  FiSettings,
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
import Link from "next/link";


export default function Sidebar() {
  const [isFileChoosing, setFileChoosing] = useState(false);
  const [isFileUploading, setFileUploading] = useState(false);
  const [chooserFile, setChooserFile] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.body.classList.value = GetTheme() ?? "";
    }
  }, []);

  function getFile(val: string) {
    setChooserFile(val);
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
      type: "link",
      path: "/",
      title: "Home",
      icon: <FiHome />,
    },
    {
      id: 1,
      type: "link",
      path: "/search",
      title: "Search",
      icon: <FiSearch />,
    },
    {
      id: 2,
      type: "link",
      path: "/explore",
      title: "Explore",
      icon: <FiCompass />,
    },
    {
      id: 3,
      type: "link",
      path: "/dm",
      title: "Messages",
      icon: <RiMessengerLine />,
    },
    {
      id: 4,
      type: "link",
      path: "/notifications",
      title: "Notification",
      icon: <FiHeart />,
    },
    {
      id: 5,
      type: "normal",
      title: "Create",
      icon: <FiPlusCircle />,
      action: () => {
        setFileChoosing(true);
      },
    },
    {
      id: 6,
      type: "link",
      path: `/@${userData.fetchUser() && userData.fetchUser().username}`,
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
              <Link href={"/settings"} className="w-full h-full flex items-center justify-start gap-5">
              <span className="text-[1.7rem]">
                <FiSettings />
              </span>
              <p className="text-[1.2rem] text-primary-color">Settings</p>
              </Link>
            </li>

            <li
              className="w-[200px] sidebar-item h-[40px] icon flex items-center justify-start gap-5"
              onClick={logout}
            >
              <span className="text-[1.7rem]">
                <FiLogOut />
              </span>
              <p className="text-[1.2rem] text-primary-color">LogOut</p>
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
        image={chooserFile}
        action={uploadPost}
      ></UploadPost>
    </>
  );
}
