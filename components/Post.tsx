import React, { useEffect, useRef, useState } from "react";
import PFP from "./ui/PFP";
import {
  FiBookmark,
  FiHeart,
  FiMessageCircle,
  FiMessageSquare,
  FiMoreVertical,
  FiSend,
  FiShare,
  FiShare2,
  FiUserCheck,
  FiUserPlus,
} from "react-icons/fi";
import {
  BiMessage,
  BiMessageAlt,
  BiMessageAltDetail,
  BiMessageAltDots,
  BiSad,
  BiSend,
  BiShare,
} from "react-icons/bi";
import { BsDot } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/navigation";
import userData from "@/app/api/userData";
import style from "styled-jsx/style";
import { like, type Post } from "@/app/lib/store/features/post/postSlice";
import { useAppDispatch, useAppSelector } from "@/app/lib/store/hooks";

type User = {
  name: string;
  username: string;
  image: string;
  followers: string[];
  following: string[];
  userId: number;
  country: string;
  bio: string;
};

export default function Post({
  caption,
  image,
  author = {
    image: "/default-user-pfp.png",
    name: "Instagram User",
    username: "",
  },
  timePosted,
  action = () => {},
  id,
  likedUser = [],
}: Post) {
  const PostRef = useRef<HTMLDivElement>(null);
  
  const router = useRouter();
  const UserList = userData.UserList;
  const loggedInUser: User = userData.fetchUser();
  const user: User = getUser();
  const [isFollowing, setFollowing] = useState(
    user.followers.includes(loggedInUser.username) ||
    loggedInUser.following.includes(author.username)
  );
  
  const dispatch = useAppDispatch();
  const post: Post = useAppSelector((state) => state.posts.items[id]);
  const currentUser: User = useAppSelector((state) => state.users.items);
  const [isPostLiked, setPostLiked] = useState(post.likedUser.includes(currentUser.username));
  
  function getUser(): User {
    let user: User = {
      name: "",
      username: "",
      image: "",
      followers: [],
      following: [],
      userId: 0,
      country: "Unknown",
      bio: "",
    };

    if (loggedInUser && author.username === loggedInUser.username) {
      user = loggedInUser;
    }

    UserList.forEach((item) => {
      if (item.username === author.username) {
        user = item;
      }
    });
    return user;
  }

  function handlePostLike() {
    // action(PostRef.current?.id, "like");

    dispatch(like({id: id, username: loggedInUser.username}))
    isPostLiked ? setPostLiked(false) : setPostLiked(true);

  }

  function followUser() {
    setFollowing(!isFollowing);

    if (!user.followers.includes(author.username)) {
      user.followers.push(user.username);
      loggedInUser.following.push(author.username);
    } else {
      let temp: any = [];
      user.followers.forEach((item) => {
        if (item == author.username) return;

        temp.push(item);
      });

      user.followers = temp;
    }
  }

  const style = {
    backgroundColor: isFollowing
      ? "rgb(var(--foreground-color) / 1)"
      : "royalblue",
    color: isFollowing ? "rgb(var(--secondary-color))" : "white",
  };

  return (
    <div
      className=" w-[600px] post flex flex-col items-center justify-start gap-5 mt-5"
      id={`${id}`}
      ref={PostRef}
    >
      <div className="w-[600px] nav flex items-center justify-between gap-5">
        <div className="flex items-center justify-start gap-5 flex-1">
          <PFP
            image={currentUser.image}
            width={50}
            height={50}
            action={() => router.push(`/${author.username}`)}
          />
          <div>
            <h1
              className="text-[.9rem] flex items-center justify-start gap-1 cursor-pointer"
              onClick={() => router.push(`/${author.username}`)}
            >
              {author.name}
            </h1>
            <p className=" text-secondary-color text-[.8rem]">{timePosted}</p>
          </div>
          
        </div>

        {loggedInUser && loggedInUser.username != author.username ? (
            <li
              className="px-4 pr-[16px] py-1.5 flex gap-2 text-[0.8rem] items-center justify-center rounded-[10px] transition-transform active:scale-95 cursor-pointer"
              style={style}
              onClick={followUser}
            >
              <span>{isFollowing ? <FiUserCheck /> : <FiUserPlus />}</span>
              <span className=" font-medium">
                {isFollowing ? "Following" : "Follow"}
              </span>
            </li>
          ) : (
            <></>
          )}

        <span className="icon only-icon h-[100%] flex items-center justify-center text-[1.4rem]">
          <FiMoreVertical />
        </span>
      </div>

      <div className="w-[100%] h-[auto] image border-[1px] border-foreground-color/70 rounded-lg overflow-hidden">
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
            <BiSend />
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
            post.likedUser.length
          )}{" "}
          likes
        </p>
        <caption className="w-[100%] text-left text-[1rem] text-primary-color overflow-hidden whitespace-nowrap text-ellipsis">
          {caption}
        </caption>
        <p className="w-[100%] text-left text-[.9rem] text-secondary-color">
          No comment yet
        </p>
      </div>
    </div>
  );
}
