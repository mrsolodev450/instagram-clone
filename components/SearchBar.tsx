"use client";

import { useRouter } from "next/navigation";
import React, { useRef } from "react";
import { FiSearch } from "react-icons/fi";

export default function SearchBar({action = () => {}}: {action?: any}) {
  const searchInputRef = useRef<HTMLInputElement>(null);
  return (
    <div className="w-[500px] fixed top-10 flex justify-center items-center search-bar">
      <div className="w-full flex items-center justify-between gap-5  bg-foreground-color px-2 pl-6 py-2 rounded-full relative">
        <input
          type="text"
          className="w-full h-full bg-transparent outline-none border-none "
          placeholder="Search here..."
          ref={searchInputRef}
          onChange={() => {
            action(searchInputRef.current?.value);
          }}
        />
        <ul className="flex justify-center items-center gap-5 text-secondary-color text-[1.3rem]">
          <li
            className=" bg-royalblue text-[#fff] px-4 pr-[16px] py-2 rounded-full transition-all active:scale-95 cursor-pointer"
            onClick={() => {
              action(searchInputRef.current?.value);
            }}
          >
            <FiSearch />
          </li>
        </ul>
      </div>
    </div>
  );
}
