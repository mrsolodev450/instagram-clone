import React, { useEffect, useRef, useState } from "react";
import PFP from "./ui/PFP";
import {
  FiBookmark,
  FiHeart,
  FiMessageCircle,
  FiMoreVertical,
} from "react-icons/fi";
import { BiShare } from "react-icons/bi";
import { BsDot } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import Image from "next/image";

const USER = {
  name: 'Krishan Murari',
  username: 'knightwor_',
  password: '1234567890',
  image: '/pfp.png'
}

interface Author {
  name: string,
  image: string
}

interface Comments {
  count: number,
  data: string
}

interface Reactions {
  likes: number,
  comments: Comments,
  saves: number
  shares: number
}

interface Post {
  caption: string
  timeposted: any
  author: Author
  audio?: string
  image: string
  reactions: Reactions,
  action?: any
  id: number,
  likedUser: string[]
}

export default function Post({caption, image, audio = 'Orignal Audio', author, timeposted, reactions, action = ()=>{}, id, likedUser}: Post) {
  // let time: any = timeposted > 60 ? `${Math.floor(timeposted / 60)}min` : `${timeposted}sec`
  // time =  timeposted > 3600 ? `${Math.floor(timeposted / 3600)}hours` : timeposted
  const PostRef = useRef<HTMLDivElement>(null)
  const [isPostLiked, setPostLiked] = useState(likedUser.includes(USER.username))

  function handlePostLike() {
    // setPostLiked(likedUser.includes(USER.username))
    action(PostRef.current?.id, 'like')
    
    isPostLiked ? setPostLiked(false) : setPostLiked(true)
  }

  return (
    <div className=" w-[600px] post flex flex-col items-center justify-start gap-5 mt-5" id={`${id}`} ref={PostRef}>
      <div className="w-[600px] flex items-center justify-between">
        <div className="flex items-center justify-start gap-5" >
          <PFP image={author.image} width={50} height={50} />
          <div>
            <h1 className="text-[.9rem] flex items-center justify-start gap-1">
              {author.name}
              <span>
                <BsDot />
              </span>
              <span className="text-[#888] text-[.8rem]">{Math.floor(timeposted)}sec ago</span>
            </h1>
            <p className="text-[#888] text-[.8rem]">{audio}</p>
          </div>
        </div>
        <span className="icon only-icon h-[100%] flex items-center justify-center text-[1.4rem]">
          <FiMoreVertical />
        </span>
      </div>

      <div className="w-[100%] h-[600px] border-[1px] border-[#888]/20" onClick={e => action(PostRef.current?.id, 'del')}>
        <Image
          src={image}
          alt="post2"
          className="w-[100%] h-[100%] object-contain"
          loading='lazy'
          width={1000}
          height={1000}
        />
      </div>

      <div className="w-[100%] flex items-center justify-between">
        <div className="flex items-center justify-start gap-5">
          <span className="icon only-icon text-[1.5rem]" onClick={handlePostLike}>
            {isPostLiked ? <span className="text-red-500"><FaHeart/></span> : <FiHeart />}
          </span>
          <span className="icon only-icon text-[1.5rem]" onClick={e => action(PostRef.current?.id, 'comment')}>
            <FiMessageCircle />
          </span>
          <span className="icon only-icon text-[1.5rem]" onClick={e => action(PostRef.current?.id, 'share')}>
            <BiShare />
          </span>
        </div>

        <div className="icon only-icon text-[1.5rem]" onClick={e => action(PostRef.current?.id, 'save')}>
          <FiBookmark />
        </div>
      </div>

      <div className="w-[100%] flex justify-start items-start flex-col">
        <p className="w-[100%] text-left text-[.9rem] text-[#fff]">
          {Intl.NumberFormat('en', {notation: 'compact'}).format(reactions.likes)} likes
        </p>
        <caption className="w-[100%] text-left text-[1rem] text-[#fff] overflow-hidden whitespace-nowrap text-ellipsis">
          {caption}
        </caption>
        <p className="w-[100%] text-left text-[.9rem] text-[#888]">
        {reactions.comments.count >= 1 ? `View ${reactions.comments.count == 1 ? '' : 'all'} ${Intl.NumberFormat('en', {notation: 'compact'}).format(reactions.comments.count)} ${reactions.comments.count == 1 ? 'comment' : 'comments'}` : 'No comment yet'}
        </p>
      </div>
    </div>
  );
}
