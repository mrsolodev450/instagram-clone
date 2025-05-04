import { useRouter, useSearchParams } from "next/navigation";
import React, { use, useState } from "react";

interface Story {
    username: string
    image: string
    isOwner: boolean      
    isWatched: boolean
}

export default function Story({username, image = "/default-user-pfp.png", isOwner: isOwner, isWatched = false}: Story) {
  const router = useRouter()
  const [watched, setWatched] = useState(isWatched)
  
  function watchStory() {
    setWatched(true)
    router.push(`stories/${username}`)
  }  

  return (
    <div className="story-wrapper w-[100px] flex flex-col gap-1 justify-center items-center">
      <div className={`${isOwner ? 'self ': ''} story ${isOwner ? 'no-story ': 'active-story'}  w-[70px] h-[70px] flex-shrink-0 rounded-full p-[4px] outline outline-2 outline-offset-[-5px] outline-background-color ${watched ? 'watched' : ''}`}>
        <img
          src={image}
          alt=""
          className="w-full h-full aspect-square rounded-full "
          onClick={watchStory}
        />
      </div>
      <p className="username">{isOwner ? 'Your story' : username}</p>
    </div>
  );
}
