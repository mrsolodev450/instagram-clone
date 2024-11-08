"use client";

import React from "react";
import {
  FiInstagram,
} from "react-icons/fi";
import { useRouter } from "next/navigation";
import Item from "./Item";
import { RiMessengerLine } from "react-icons/ri";
import HomeNavbar from "./HomeNavbar";
import DMListNavbar from "./DMListNavbar";
import ProfileNavbar from "./ProfileNavbar";

type ForType = 'HOME' | "DMList" | "PROFILE"
export default function Navbar({title, type}: {title: string, type: ForType}) {
  const router = useRouter();

  const Items = [
    {
      title: "Messages",
      icon: <RiMessengerLine />,
      action: () => {
        if (window.history.state !== '/dm') {
          router.replace(`/dm`);
        }
      }
    },
    
  ];

  if (type === "HOME") return <HomeNavbar title={title}/>
  else if (type === "DMList") return <DMListNavbar title={title}/>
  else if (type === "PROFILE") return <ProfileNavbar title={title}/>
  
}
