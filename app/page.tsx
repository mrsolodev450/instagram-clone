"use client";

import Feed from "@/components/Feed";
import Post from "@/components/Post";
import Sidebar from "@/components/Sidebar";
import Stories from "@/components/story/Stories";
import Story from "@/components/story/Story";


export default function Home() {
  return (
    <main className="flex h-screen items-center justify-between">
      <Sidebar />

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

        <Post caption={""} timeposted={50} author={""} image={"/post5.jpeg"} />
        <Post caption={""} timeposted={5000} author={""} image={"/post4.jpeg"}  />
        <Post caption={""} timeposted={6000} author={""} image={"/post3.jpeg"}  />
        <Post caption={""} timeposted={0} author={""} image={"/post2.jpeg"}  />
        <Post caption={""} timeposted={0} author={""} image={"/post1.jpeg"}  />
      </Feed>

      {/* ----------- Suggestion Section -------- */}

      <section className="w-[100px] h-full hidden"></section>
    </main>
  );
}

// ------ User PFP Credit -------------------

// Image by <a href="https://pixabay.com/users/wanderercreative-855399/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=973460">Stephanie Edwards</a> from <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=973460">Pixabay</a>
