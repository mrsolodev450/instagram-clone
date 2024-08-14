"use client";

import Sidebar from "@/components/sidebar/Sidebar";
import React, { useEffect, useRef } from "react";
import {
  FiChevronRight,
  FiLock,
  FiMoon,
  FiUser,
} from "react-icons/fi";
import { LiaUserLockSolid } from "react-icons/lia";
import GetTheme from "../api/getTheme";
import BottomNavbar from "@/components/bottomnav/BottomNavbar";


export default function SettingsPage() {
  const inputRef = useRef<HTMLInputElement>(null);

  function EnableDarkTheme() {
    if (typeof window !== "undefined") {
      document.body.classList[0] == "light-scheme"
        ? document.body.classList.replace("light-scheme", "dark-scheme")
        : document.body.classList.replace("dark-scheme", "light-scheme");

      localStorage.setItem("theme", document.body.classList[0]);
    }
  }

  useEffect(() => {
    if (inputRef.current) {
      if (GetTheme() == "dark-scheme") {
        inputRef.current.checked = true;
      } else {
        inputRef.current.checked = false;
      }
    }
  }, []);

  return (
    <>
      <Sidebar />
      <BottomNavbar />
      <div className="flex setting-pg h-screen items-center justify-center">
        <section className="w-full h-full px-5 pl-3 py-3 flex flex-col items-center justify-start gap-5">

          <div className="w-[500px] search-opt pl-10 py-3 flex items-center justify-center gap-6 rounded-[30px] transition-all">
            <div className="flex items-center justify-center gap-6 w-full cursor-pointer">
              <span className="text-[1.6rem] text-secondary-color">
                <FiLock />
              </span>
              <div className="flex w-full flex-col items-center justify-center">
                <h2 className="whitespace-nowrap text-ellipsis overflow-hidden w-[200px]">
                  Change Password
                </h2>
              </div>
            </div>
            <ul className="flex w-full justify-end items-center gap-5 text-[1rem]">
              <li className="px-4 pr-[16px] py-2 flex gap-2 items-center justify-center text-[1.6rem] text-secondary-color rounded-full transition-transform active:scale-95 cursor-pointer">
                <FiChevronRight />
              </li>
            </ul>
          </div>

          <div className="w-[500px] search-opt pl-10 py-3 flex items-center justify-center gap-6 rounded-[30px] transition-all">
            <div className="flex items-center justify-center gap-6 w-full cursor-pointer">
              <span className="text-[1.6rem] text-secondary-color">
                <FiUser />
              </span>
              <div className="flex w-full flex-col items-center justify-center">
                <h2 className="whitespace-nowrap text-ellipsis overflow-hidden w-[200px]">
                  Change Username
                </h2>
              </div>
            </div>
            <ul className="flex w-full justify-end items-center gap-5 text-[1rem]">
              <li className="px-4 pr-[16px] py-2 flex gap-2 items-center justify-center text-[1.6rem] text-secondary-color rounded-full transition-transform active:scale-95 cursor-pointer">
                <FiChevronRight />
              </li>
            </ul>
          </div>

          <div className="w-[500px] search-opt pl-10 py-3 flex items-center justify-center gap-6 rounded-[30px] transition-all">
            <div className="flex items-center justify-center gap-6 w-full cursor-pointer">
              <span className="text-[1.6rem] text-secondary-color">
                <LiaUserLockSolid />
              </span>
              <div className="flex w-full flex-col items-center justify-center">
                <h2 className="whitespace-nowrap text-ellipsis overflow-hidden w-[200px]">
                  Private Account
                </h2>
              </div>
            </div>
            <ul className="flex w-full justify-end items-center gap-5 text-[1rem]">
              <li className="px-4 pr-[16px] py-2 flex gap-2 items-center justify-center text-[1.6rem] text-secondary-color rounded-full transition-transform cursor-pointer">
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    value=""
                    className="sr-only peer"
                  ></input>
                  <div className="relative w-[50px] h-[30px] rounded-full bg-foreground-color peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:bg-white after:rounded-full after:h-[22px] after:start-[3px] after:w-[22px] after:transition-all peer-checked:bg-royalblue"></div>
                </label>
              </li>
            </ul>
          </div>

          <div className="w-[500px] search-opt pl-10 py-3 flex items-center justify-center gap-10 rounded-[30px] transition-all">
            <div className="flex items-center justify-center gap-6 w-full cursor-pointer">
              <span className="text-[1.6rem] text-secondary-color">
                <FiMoon />
              </span>
              <div className="flex w-full flex-col items-center justify-center">
                <h2 className="whitespace-nowrap text-ellipsis overflow-hidden w-[200px]">
                  Dark Theme
                </h2>
              </div>
            </div>
            <ul className="flex w-full justify-end items-center gap-5 text-[1rem]">
              <li className="px-4 pr-[16px] py-2 flex gap-2 items-center justify-center text-[1.6rem] text-secondary-color rounded-full transition-transform cursor-pointer">
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    value=""
                    className="sr-only peer"
                    onChange={EnableDarkTheme}
                    ref={inputRef}
                  ></input>
                  <div className="relative w-[50px] h-[30px] rounded-full bg-foreground-color peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:bg-white after:rounded-full after:h-[22px] after:start-[3px] after:w-[22px] after:transition-all peer-checked:bg-royalblue"></div>
                </label>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </>
  );
}
