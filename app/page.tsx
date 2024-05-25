"use client";

import Feed from "@/components/Feed";
import Post from "@/components/Post";
import Sidebar from "@/components/sidebar/Sidebar";
import ChooseFile from "@/components/UploadPost/ChooseFile";
import TitleBar from "@/components/UploadPost/TitleBar";
import UploadPost from "@/components/UploadPost/UploadPost";
import Stories from "@/components/story/Stories";
import Story from "@/components/story/Story";
import { useEffect, useState } from "react";

interface PostIntraction {
  intractionType: 'del' | 'like' | 'save' | 'share' | 'comment' | string
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
  id: number
}

export default function Home() {

  const USER = {
    name: 'Krishan Murari',
    username: 'knightwor_',
    password: '1234567890',
    image: '/pfp.png'
  }

  function getData(query: string, type: string) {

    if (typeof window !== "undefined") {
      if (type === 'JSON') return JSON.parse(localStorage.getItem(query) ?? "[{}]");
      if (type === 'Bool') return localStorage.getItem(query) ?? false;
    }

    
  }

  const [FeedPost, UpdateFeedPost] = useState(getData("feed-post", 'JSON'));
  const [HavePost, UpdateHavePost] = useState(getData("have-post", 'Bool'));
  const [choosedFile, setChoosedFile] = useState('');
  const [isFileChoosed, setFileChoosed] = useState(false);
  const [isFileUploadingStarted, setFileUploadingStarted] = useState(false);

  function uploadPost(data: Post) {

    if (data.image == null || data.image == "") return;

    const obj = {
      caption: data.caption,
      author: {
        name: USER.username,
        image: USER.image,
      },
      timeposted: data.timeposted,
      image: data.image,
      reactions: {
        likes: 0,
        comments: {
          count: 0,
          data: 'null'
        },
        shares: 0,
        saves: 0
      },
      likedUser: []
    }

    if (FeedPost && !HavePost) {
      UpdateFeedPost([
        obj
      ]);

      UpdateHavePost(true)
    } else {
      UpdateFeedPost([
        ...FeedPost,
        obj,
      ]);
    }
    
    setFileUploadingStarted(false)
  }

  function handleUploadPost() {
    setFileUploadingStarted(true)
    setFileChoosed(false)
  }

  function postInteraction(id: any, intractionType: string) {
    let Id: number = parseInt(id) 
    
    if (intractionType === 'del') deletePost(Id)
    else if (intractionType === 'like') likePost(Id);
    else if (intractionType === 'save') console.log('saved post to collection');
    else if (intractionType === 'share') console.log('shared post to xyz');
    else if (intractionType === 'comment') commentOnPost(Id)
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
    
    if (!TempPost[id].likedUser.includes(USER.username)) {
      TempPost[id].reactions.likes += 1
      TempPost[id].likedUser.push(USER.username)
    }
    else {
      TempPost[id].reactions.likes -= 1
      TempPost[id].likedUser.pop(USER.username)
    }

    UpdateFeedPost(TempPost)
  }

  function commentOnPost(id: number) {
    let TempPost: any = JSON.parse(JSON.stringify(FeedPost))
    
    TempPost[id].reactions.comments.count += 1

    UpdateFeedPost(TempPost)
  }

  useEffect(() => {'/post2.jpeg'
    if (typeof window !== "undefined") {
      localStorage.setItem("feed-post", JSON.stringify(FeedPost));
      localStorage.setItem("have-post", HavePost);
    }
    
    
  }, [FeedPost]);

  function getFile(val: string) {
    setChoosedFile(val)
    setFileChoosed(true)
  }

  return (
    <main className="flex h-screen items-center justify-between">
      <Sidebar action={handleUploadPost} />

      <Feed>
        <Stories>
          <Story
            username={"jkhsdmnbsd"}
            image={"/defualt-user-pfp.png"}
            isOwener={true}
            isWatched={false}
          />
          <Story
            username={"jkhsdmnbsd"}
            image={"/defualt-user-pfp.png"}
            isOwener={false}
            isWatched={true}
          />
          <Story
            username={"jkhsdmnbsd"}
            image={"/defualt-user-pfp.png"}
            isOwener={false}
            isWatched={false}
          />
        </Stories>

        {FeedPost && HavePost
          ? FeedPost.map((item: any, index: any) => (
              <Post
                key={index}
                caption={item.caption}
                timeposted={item.timeposted}
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

      {/* ----------- Upload Post Window -------- */}

      
      {isFileUploadingStarted ? isFileChoosed ? <UploadPost image={choosedFile} action={uploadPost}></UploadPost> : <ChooseFile action={getFile}></ChooseFile> : <></>}

      {/* ----------- Suggestion Section -------- */}

      <section className="w-[100px] h-full hidden"></section>
    </main>
  );
}

// ------ User PFP Credit -------------------

// Image by <a href="https://pixabay.com/users/wanderercreative-855399/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=973460">Stephanie Edwards</a> from <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=973460">Pixabay</a>
