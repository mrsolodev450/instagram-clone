import userData from "./userData";

type Author = {
  name: string;
  image: string;
};

type Comments = {
  count: number;
  data: string;
};

type Reactions = {
  likes: number;
  comments: Comments;
  saves: number;
  shares: number;
};

type Post = {
  caption: string;
  timePosted: any;
  author: Author;
  audio?: string;
  image: string;
  reactions: Reactions;
  action?: any;
  likedUser: string[];
  id: number;
  userId: number;
};

export default function deletePost(id: number) {
  let FeedPost: Post[] = GetData("feed-post");

  let TempPost: object[] = [];
  FeedPost.forEach((item) => {
    if (item.id !== id) {
      TempPost.push(item);
    }
        
  })
  
  let userChoice = confirm("Are you sure about to delete this post?");
  if (userChoice) {
    SaveData("feed-post", TempPost);
    // location.reload()
  } else console.log("Post delete canceled by owner!");
}

function SaveData(key: string, data: any) {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(data));
  }
}

function GetData(key: string) {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem(key) ?? "[{}]");
  }
}
