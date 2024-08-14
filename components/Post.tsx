import React, { useEffect, useRef, useState } from "react";
import PFP from "./ui/PFP";
import {
  FiBookmark,
  FiHeart,
  FiMessageCircle,
  FiMessageSquare,
  FiMoreVertical,
  FiShare,
  FiShare2,
} from "react-icons/fi";
import { BiMessage, BiMessageAlt, BiMessageAltDetail, BiMessageAltDots, BiShare } from "react-icons/bi";
import { BsDot } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/navigation";

const USER = {
  name: "Krishan Murari",
  username: "knightwor_",
  password: "1234567890",
  image: "/pfp.png",
};

interface Author {
  name: string;
  username: string;
  image: string;
}

interface Comments {
  count: number;
  data: string;
}

interface Reactions {
  likes: number;
  comments: Comments;
  saves: number;
  shares: number;
}

interface Post {
  caption: string;
  timePosted: string;
  author: Author;
  audio?: string;
  image: string;
  reactions: Reactions;
  action?: any;
  id: number;
  likedUser: string[];
}

export default function Post({
  caption,
  image,
  audio = "Original Audio",
  author = { image: "/default-user-pfp.png", name: "", username: "" },
  timePosted,
  reactions = {
    likes: 0,
    comments: {
      count: 0,
      data: "",
    },
    saves: 0,
    shares: 0,
  },
  action = () => {},
  id,
  likedUser = [],
}: Post) {
  
  const PostRef = useRef<HTMLDivElement>(null);
  const [isPostLiked, setPostLiked] = useState(
    likedUser.includes(USER.username )
  );

  const router = useRouter();

  function handlePostLike() {
    action(PostRef.current?.id, "like");

    isPostLiked ? setPostLiked(false) : setPostLiked(true);
  }

  return (
    <div
      className=" w-[600px] post flex flex-col items-center justify-start gap-5 mt-5"
      id={`${id}`}
      ref={PostRef}
    >
      <div className="w-[600px] nav flex items-center justify-between">
        <div className="flex items-center justify-start gap-5">
          <PFP image={author.image} width={50} height={50} action={() => router.push(`/@${author.username}`)} />
          <div>
            <h1 className="text-[.9rem] flex items-center justify-start gap-1 cursor-pointer" onClick={() => router.push(`/@${author.username}`)}>
              {author.name}
            </h1>
            <p className="text-[#888] text-[.8rem]">{timePosted}</p>
          </div>
        </div>
        <span className="icon only-icon h-[100%] flex items-center justify-center text-[1.4rem]">
          <FiMoreVertical />
        </span>
      </div>

      <div
        className="w-[100%] h-[auto] image border-[1px] border-foreground-color/70 rounded-lg overflow-hidden"
      >
        <Image
          src={image}
          alt="post2"
          className="w-[100%] h-[100%] object-contain rounded-lg"
          loading="lazy"
          width={1000}
          height={1000}
        />
      </div>

      <div className="w-[100%] flex items-center justify-between">
        <div className="flex items-center justify-start gap-5">
          <span
            className="icon only-icon text-[1.5rem]"
            onClick={handlePostLike}
          >
            {isPostLiked ? (
              <span className="text-red-500">
                <FaHeart />
              </span>
            ) : (
              <FiHeart />
            )}
          </span>
          <span
            className="icon only-icon text-[1.5rem]"
            onClick={(e) => action(PostRef.current?.id, "comment")}
          >
            <BiMessageAltDetail />
          </span>
          <span
            className="icon only-icon text-[1.5rem]"
            onClick={(e) => action(PostRef.current?.id, "share")}
          >
            <FiShare2 />
          </span>
        </div>

        <div
          className="icon only-icon text-[1.5rem]"
          onClick={(e) => action(PostRef.current?.id, "save")}
        >
          <FiBookmark />
        </div>
      </div>

      <div className="w-[100%] flex justify-start items-start flex-col">
        <p className="w-[100%] text-left text-[.9rem] text-primary-color">
          {Intl.NumberFormat("en", { notation: "compact" }).format(
            reactions.likes
          )}{" "}
          likes
        </p>
        <caption className="w-[100%] text-left text-[1rem] text-primary-color overflow-hidden whitespace-nowrap text-ellipsis">
          {caption}
        </caption>
        <p className="w-[100%] text-left text-[.9rem] text-secondary-color">
          {reactions.comments.count >= 1
            ? `View ${
                reactions.comments.count == 1 ? "" : "all"
              } ${Intl.NumberFormat("en", { notation: "compact" }).format(
                reactions.comments.count
              )} ${reactions.comments.count == 1 ? "comment" : "comments"}`
            : "No comment yet"}
        </p>
      </div>
    </div>
  );
}
