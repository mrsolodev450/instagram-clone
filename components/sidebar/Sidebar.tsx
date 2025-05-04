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
import { useAppDispatch, useAppSelector } from "@/app/lib/store/hooks";
import { upload } from "@/app/lib/store/features/post/postSlice";
import { addPost } from "@/app/lib/store/features/user/userSlice";
import { ChatLines, Facetime, Heart, Home, HomeAlt, HomeSimpleDoor, HouseRooms, Instagram, MediaVideo, PlusCircle, Search, Settings, VideoCamera, ViewGrid } from "iconoir-react";



type Author = {
  name: string;
  image: string;
  username: string
};

type Comments = {
  count: number;
  data: string;
};

type Reactions = {
  likes: number;
  comments: Comments;
  saves: number;
  shares: number;
};

type Post = {
  caption: string;
  timePosted: string;
  author: Author;
  audio?: string;
  image: string;
  reactions: Reactions;
  action?: any;
  likedUser: string[]
  id: number,
  userId: number
};


export default function Sidebar({type = "FULL"}: {type?: "FULL" | "ICON-ONLY"}) {
  const [isFileChoosing, setFileChoosing] = useState(false);
  const [isFileUploading, setFileUploading] = useState(false);
  const [chooserFile, setChooserFile] = useState("");
  const dispatch = useAppDispatch()
  const router = useRouter();
  const user = userData.fetchUser()
  const currentUser = useAppSelector(state => state.users.items)


  const Items = [
    {
      type: "link",
      path: "/",
      title: "Home",
      icon: <HomeSimpleDoor width={30} height={30} strokeWidth={1.5}/>,
    },
    {
      type: "link",
      path: "/search",
      title: "Search",
      icon: <Search width={30} height={30} strokeWidth={1.5}/>,
    },
    {
      type: "link",
      path: "/explore",
      title: "Explore",
      icon: <ViewGrid width={30} height={30} strokeWidth={1.5}/>,
    },
    {
      type: "normal",
      title: "Reels",
      icon: <Facetime width={30} height={30} strokeWidth={1.5}/>,
      action: () => {
        let reelId: string = "";
        let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        for (let i = 0; i < 6; i++) {
          reelId += chars[Math.floor(Math.random() * chars.length)]
        }
        router.replace(`/reels/${reelId}`)
      }
    },
    {
      type: "link",
      path: "/dm",
      title: "Messages",
      icon: <ChatLines width={30} height={30} strokeWidth={1.5}/>,
    },
    {
      type: "link",
      path: "/notifications",
      title: "Notification",
      icon: <Heart width={30} height={30} strokeWidth={1.5}/>,
    },
    {
      type: "normal",
      title: "Create",
      icon: <PlusCircle width={30} height={30} strokeWidth={1.5}/>,
      action: () => {
        setFileChoosing(true);
      },
    },
    {
      type: "link",
      path: `/${currentUser.username}`,
      title: "Profile",
      icon: (
        <PFP
          image={currentUser.image}
        />
      ),
    },
  ];

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

  function handleUploadPost(data: Post) {
    dispatch(upload(data))
    dispatch(addPost(data))
    // uploadPost(data)
  }

  return (
    <>
      <section className="h-full px-5 py-5 flex flex-col items-start justify-between sidebar">
        <div className="flex items-center justify-start text-[2.2rem] title">
          <span className={type != "FULL" ? "text-[1.7rem] text-secondary-color max-[1500px]:block" : "hidden text-[1.7rem] text-primery-color max-[1500px]:block"}>
            <Instagram width={30} height={30} strokeWidth={1.5}/>
          </span>

          {type == "FULL" ? <span className="title-text">Instagram</span> : <></>}
        </div>

        <ul className="h-[70%] flex flex-col items-start justify-start gap-5">
          {Items.map((item, index) => (
            <Item
              type={item.type}
              path={item.path}
              key={index}
              title={item.title}
              icon={item.icon}
              action={item.action}
              isIconOnly={type == "ICON-ONLY"}
            />
          ))}
        </ul>

        <div className="h-[10%] flex flex-col items-center justify-start">
          <ul className="h-[100%] flex flex-col items-center justify-start gap-2">
            <li className=" sidebar-item h-[40px] icon flex items-center justify-start gap-5">
              <Link href={"/settings"} className="w-full h-full flex items-center justify-start gap-5">
              <span className="text-[1.7rem]">
                <Settings width={30} height={30} strokeWidth={1.5}/>
              </span>
              {type == "FULL" ? <p className="text-[1.2rem] text-primary-color">Settings</p> : <></>}
              </Link>
            </li>

            <li
              className=" sidebar-item h-[40px] icon flex items-center justify-start gap-5"
              onClick={logout}
            >
              <span className="text-[1.7rem]">
                <FiLogOut />
              </span>
              {type == "FULL" ? <p className="text-[1.2rem] text-primary-color">LogOut</p> : <></>}
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
        action={handleUploadPost}
      ></UploadPost>
    </>
  );
}
