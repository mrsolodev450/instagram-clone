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
  timePosted: any
  author: Author
  audio?: string
  image: string
  reactions: Reactions,
  action?: any
  id: number
}

export default function Home() {

  function getData(query: string, type: string) {

    if (typeof window !== "undefined") {
      if (type === 'JSON') return JSON.parse(localStorage.getItem(query) ?? "[{}]");
      if (type === 'Bool') return localStorage.getItem(query) ?? false;
    }

    
  }

  const [FeedPost, UpdateFeedPost] = useState(getData("feed-post", 'JSON'));
  const [HavePost, UpdateHavePost] = useState(getData("have-post", 'Bool'));

  if (userData.fetchUser().username == undefined) {
    redirect("/login")
  }

  function postInteraction(id: any, interactionType: string) {
    let Id: number = parseInt(id) 
    
    if (interactionType === 'del') deletePost(Id)
    else if (interactionType === 'like') likePost(Id);
    else if (interactionType === 'save') console.log('saved post to collection');
    else if (interactionType === 'share') console.log('shared post to xyz');
    else if (interactionType === 'comment') commentOnPost(Id)
  }

  function deletePost(id: number) {
    let TempPost: object[] = []
    for (let index = 0; index < FeedPost.length; index++) {
      if (index == id) {
        continue
      }
      TempPost.push(FeedPost[index])
    }
    
    let userChoice = confirm('Are you sure about to delete this post?')
    if (userChoice) UpdateFeedPost(TempPost)
    else console.log('Post delete canceled by owner!')
  }

  function likePost(id: number) {
    let TempPost: any = JSON.parse(JSON.stringify(FeedPost))
    
    if (!TempPost[id].likedUser.includes(userData.fetchUser().username)) {
      TempPost[id].reactions.likes += 1
      TempPost[id].likedUser.push(userData.fetchUser().username)
    }
    else {
      TempPost[id].reactions.likes -= 1
      TempPost[id].likedUser.pop(userData.fetchUser().username)
    }

    UpdateFeedPost(TempPost)
  }

  function commentOnPost(id: number) {
    let TempPost: any = JSON.parse(JSON.stringify(FeedPost))
    
    TempPost[id].reactions.comments.count += 1

    UpdateFeedPost(TempPost)
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("feed-post", JSON.stringify(FeedPost));
      localStorage.setItem("have-post", HavePost);
    }
    
    
  }, [FeedPost]);

  return (
    <main className="flex h-screen items-center justify-between">
      <Sidebar />
      <BottomNavbar />

      <Feed>
        <Stories>
          <Story
            username={userData.fetchUser().username}
            image={userData.fetchUser()
              ? userData.fetchUser().image
              : "/default-user-pfp.png"}
            isOwner={true}
            isWatched={false}
          />
          <Story
            username={userData.UserList[2].username}
            image={userData.UserList[2].image}
            isOwner={false}
            isWatched={true}
          />
          <Story
            username={userData.UserList[1].username}
            image={userData.UserList[1].image}
            isOwner={false}
            isWatched={false}
          />
        </Stories>

        {FeedPost && HavePost
          ? FeedPost.map((item: any, index: any) => (
              <Post
                key={index}
                caption={item.caption}
                timePosted={item.timePosted}
                author={item.author}
                image={item.image}
                reactions={item.reactions}
                action={postInteraction}
                id={index}
                likedUser={item.likedUser}
              />
            ))
          : ""}
      </Feed>


      <section className="w-[100px] h-full hidden"></section>
    </main>
  );
}

// ------ User PFP Credit -------------------

// Image by <a href="https://pixabay.com/users/wanderercreative-855399/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=973460">Stephanie Edwards</a> from <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=973460">Pixabay</a>
