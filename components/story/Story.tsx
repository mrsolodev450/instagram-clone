import React from "react";

interface Story {
    username: string
    image: string
    isOwener: boolean
    isWatched: boolean
}

export default function Story({username, image, isOwener, isWatched = false}: Story) {
  return (
    <div className="story-wrapper w-[100px] flex flex-col gap-1 justify-center items-center">
      <div className={`${isOwener ? 'self ': ''} story ${isOwener ? 'no-story ': 'active-story'}  w-[70px] h-[70px] flex-shrink-0 rounded-full p-[3px] outline outline-2 outline-offset-[-4px] outline-black ${isWatched ? 'watched' : ''}`}>
        <img
          src={image}
          alt=""
          className="w-full h-full aspect-square rounded-full "
        />
      </div>
      <p className="username">{isOwener ? 'Your story' : username}</p>
    </div>
  );
}
