"use client";

import userData from "@/app/api/userData";
import DmSidebar from "@/components/sidebar/DmSidebar";
import PFP from "@/components/ui/PFP";
import EmojiPicker, { EmojiStyle, Theme } from "emoji-picker-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { KeyboardEvent, useRef, useState } from "react";
import { FiChevronLeft, FiImage, FiMic, FiSend } from "react-icons/fi";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { RiUserUnfollowLine } from "react-icons/ri";

type User = {
  name: string;
  username: string;
  image: string;
  userId: number;
};

interface IMsgDataTypes {
  roomId: String | number;
  user: String;
  msg: String;
  time: String;
}

export default function DmPage({ params }: { params: { username: string } }) {
  const username: string = params.username;
  const router = useRouter();
  const msgInputRef = useRef<HTMLInputElement>(null);
  const msgBoxRef = useRef<HTMLDivElement>(null);
  const [isMessaged, setMessaged] = useState(false);
  const [isEmojiPickerActive, setEmojiPickerActive] = useState(false);
  const [msg, setMessage] = useState<IMsgDataTypes[]>([]);
  const user: User = getUser();
  const [roomId, setRoomId] = useState("");


  function getUser(): User {
    let user: User = {
      name: "",
      username: "",
      image: "",
      userId: 0,
    };

    userData.UserList.forEach((item) => {
      if (item.username === username) {
        user = item;
      }
    });
    return user;
  }

  async function sendMessage(message: any) {
    setEmojiPickerActive(false);

    const msgData: IMsgDataTypes = {
      roomId,
      user: username,
      msg: message,
      time:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),
    };

    if (message == "") return;

    if (isMessaged) {
      setMessage([...msg, msgData]);
    } else {
      setMessage([msgData]);
      setMessaged(true);
    }

    if (msgInputRef.current) {
      msgInputRef.current.value = "";
    }

    if (msgBoxRef.current) {
      msgBoxRef.current.scrollBy({
        top: 1000000,
      });
    }
  }

  function chooseEmoji() {
    isEmojiPickerActive
      ? setEmojiPickerActive(false)
      : setEmojiPickerActive(true);
  }

  function handleKeyCapture(e: KeyboardEvent) {
    if (e.key == "Enter") sendMessage(msgInputRef.current?.value);
  }

  return (
    <>
      <DmSidebar user={userData.UserList} />
      {user.username === username ? (
        <div className="chat-pg w-full h-[100vh] flex justify-center px-5 items-center gap-5">
          <div className="chat-top-nav w-[500px] h-full relative flex flex-col items-center justify-end">
            <div className="nav-box fixed top-[0px] pt-5 flex flex-col justify-center items-center z-40 gap-5 bg-background-color">
              <nav className="w-[500px] flex items-center justify-between gap-5 bg-background-color px-4  py-3 ">
                <div className="flex justify-start items-center gap-5">
                  <Link
                    href={"/dm"}
                    className="back-ic hidden text-secondary-color icon only-icon text-[1.5rem]"
                  >
                    <FiChevronLeft />
                  </Link>

                  <Link href={`/@${user.username}`}>
                    <PFP image={user.image} />
                  </Link>
                  <div>
                    <p className=" whitespace-nowrap text-ellipsis w-[300px] cursor-pointer">
                      {user.name}
                    </p>
                    <p className=" whitespace-nowrap text-ellipsis w-[300px] cursor-pointer text-secondary-color">
                      {user.username}
                    </p>
                  </div>
                </div>
              </nav>
            </div>

            <div
              className="w-[500px] relative flex flex-col items-center justify-start py-[100px] gap-5 overflow-y-auto msg-box"
              ref={msgBoxRef}
            >
              {isMessaged ? (
                msg.map((item, index) => (
                  <div
                    key={index}
                    className="w-full flex-shrink-0 px-5 flex justify-end items-center sended-msg"
                  >
                    <p className="break-words px-5 rounded-[25px] font-medium max-w-[300px] bg-royalblue text-white py-2">
                      {item.msg}
                    </p>
                  </div>
                ))
              ) : (
                <></>
              )}
            </div>

            <div className=" chat-bottom-nav w-[500px] fixed bottom-[0px] pb-5 flex justify-center items-center bg-background-color">
              <div className="chat-bar w-[500px] flex items-center justify-between gap-5  bg-foreground-color/50 px-2 pl-4 py-2 rounded-full relative">
                <span
                  className="icon only-icon text-secondary-color text-[1.4rem] emoji "
                  onClick={chooseEmoji}
                >
                  <MdOutlineEmojiEmotions />
                </span>
                <EmojiPicker
                  style={{
                    position: "absolute",
                    bottom: "calc(100% + 10px)",
                    left: "30px",
                  }}
                  open={isEmojiPickerActive}
                  theme={Theme.AUTO}
                  lazyLoadEmojis
                  emojiStyle={EmojiStyle.GOOGLE}
                  previewConfig={{ showPreview: false }}
                  searchDisabled
                  onEmojiClick={(e) => {
                    if (msgInputRef.current) {
                      msgInputRef.current.value += e.emoji;
                    }
                  }}
                />
                <input
                  type="text"
                  className="w-full h-full bg-transparent outline-none border-none "
                  placeholder="Type here..."
                  ref={msgInputRef}
                  onKeyDown={(e) => handleKeyCapture(e)}
                />
                <ul className="flex justify-center items-center gap-5 text-secondary-color text-[1.3rem]">
                  <li className="icon only-icon">
                    <FiImage />
                  </li>
                  <li className="icon only-icon">
                    <FiMic />
                  </li>

                  <li
                    className="ic bg-royalblue text-[#fff] px-4 pr-[16px] py-2 rounded-full transition-all active:scale-95 cursor-pointer"
                    onClick={() => sendMessage(msgInputRef.current?.value)}
                  >
                    <FiSend />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className=" w-full h-[100vh] flex flex-col justify-center items-center gap-5">
          <span className="text-[15rem] text-foreground-color">
            <RiUserUnfollowLine />
          </span>
          <h1 className=" text-secondary-color text-[2rem] font-medium">
            User Not Found!
          </h1>
        </div>
      )}
    </>
  );
}
