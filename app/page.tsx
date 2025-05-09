"use client";

import Feed from "@/components/Feed";
import Post from "@/components/Post";
import Sidebar from "@/components/sidebar/Sidebar";
import Stories from "@/components/story/Stories";
import Story from "@/components/story/Story";
import { useEffect, useState } from "react";
import userData from "./api/userData";
import { redirect } from "next/navigation";
import BottomNavbar from "@/components/bottomnav/BottomNavbar";
import Navbar from "@/components/navbar/Navbar";
import fetchPost from "./api/fetchPost";
import { useAppSelector } from "./lib/store/hooks";
import fetchStories from "./api/fetchStories";

type Story = {
  content: string;
  time: string;
};


export default function Home() {
  const user = userData.fetchUser();
  const currentUser = useAppSelector((state) => state.users.items);

  const feed = useAppSelector((state) => state.posts.items);
  const { stories, storiesCount } = fetchStories();

  if (user.username == undefined) {
    redirect("/login");
  }

  function postInteraction(id: any, interactionType: string) {
    let Id: number = parseInt(id);

    if (interactionType === "like") console.log("liked");
    else if (interactionType === "save")
      console.log("saved post to collection");
    else if (interactionType === "share") console.log("shared post to xyz");
    else if (interactionType === "comment") console.log("commented!!");
  }

  return (
    <main className="flex flex-col h-screen items-center justify-between">
      <Sidebar />
      <Navbar title="Instagram" type="HOME" />
      <BottomNavbar />

      <Feed>
        <Stories>
          <Story
            username={currentUser.username}
            image={currentUser.image}
            isOwner={true}
            isWatched={false}
          />
          {stories.map((item: any, index: any) => (
            <Story
              key={index}
              username={item.author.name}
              image={item.author.image}
              isOwner={false}
              isWatched={index != 0}
            />
          ))}
        </Stories>

        {feed.map((item: any, index: any) => (
          <Post
            userId={item.userId}
            key={index}
            caption={item.caption}
            timePosted={item.timePosted}
            author={item.author}
            image={item.image}
            action={postInteraction}
            id={index}
            likedUser={item.likedUser}
          />
        ))}
      </Feed>

      <section className="w-[100px] h-full hidden"></section>
    </main>
  );
}

// ------ User PFP Credit -------------------

// Image by <a href="https://pixabay.com/users/wanderercreative-855399/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=973460">Stephanie Edwards</a> from <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=973460">Pixabay</a>
