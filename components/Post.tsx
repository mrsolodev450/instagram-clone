import React from "react";
import PFP from "./ui/PFP";
import {
  FiBookmark,
  FiHeart,
  FiMessageCircle,
  FiMoreHorizontal,
  FiMoreVertical,
  FiShare,
} from "react-icons/fi";
import { BiShare } from "react-icons/bi";

interface Post {
  caption: string
  timeposted: number
  author: string
  audio?: string
  image: string
}

export default function Post({caption, image, audio = 'Orignal Audio', author, timeposted}: Post) {
  const time = timeposted > 60 ? `${timeposted / 60}min` : `${timeposted}` || timeposted > 3600 ? timeposted / 3600 : timeposted 
  return (
    <div className=" w-[600px] flex flex-col items-center justify-start gap-5 mt-5">
      <div className="w-[600px] flex items-center justify-between">
        <div className="flex items-center justify-start gap-5">
          <PFP image={"/defualt-user-pfp.png"} width={50} height={50} />
          <div>
            <h1 className="text-[.9rem]">
              {author}
              <span className="text-[#888] text-[.8rem]">{time} ago</span>
            </h1>
            <p className="text-[#888] text-[.8rem]">{audio}</p>
          </div>
        </div>
        <span className="icon h-[100%] flex items-center justify-center text-[1.4rem]">
          <FiMoreVertical />
        </span>
      </div>

      <div className="w-[100%] h-[600px] border-[1px] border-[#888]/20">
        <img
          src={image}
          alt="post2"
          className="w-[100%] h-[100%] object-contain"
        />
      </div>

      <div className="w-[100%] flex items-center justify-between">
        <div className="flex items-center justify-start gap-5">
          <span className="icon text-[1.5rem]">
            <FiHeart />
          </span>
          <span className="icon text-[1.5rem]">
            <FiMessageCircle />
          </span>
          <span className="icon text-[1.5rem]">
            <BiShare />
          </span>
        </div>

        <div className="icon text-[1.5rem]">
          <FiBookmark />
        </div>
      </div>

      <div className="w-[100%] flex justify-start items-start flex-col">
        <p className="w-[100%] text-left text-[.9rem] text-[#888]">
          100,000 likes
        </p>
        <caption className="w-[100%] text-left text-[1rem] overflow-hidden whitespace-nowrap text-ellipsis">
          {caption}
        </caption>
        <p className="w-[100%] text-left text-[.9rem] text-[#888]">
          View all comments
        </p>
      </div>
    </div>
  );
}
