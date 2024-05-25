import userData from "./userData";

type Author = {
  name: string;
  image: string;
  username: string
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
  timeposted: any;
  author: Author;
  audio?: string;
  image: string;
  reactions: Reactions;
  action?: any;
  likedUser: string[]
  id: number,
  userId: number
};

export default function uploadPost(data: Post) {

  let FeedPosts: Post[] = GetData('feed-post')
  let UserPost: Post[] = []

  if (data.image == null || data.image == "") return;
  let temp: any = {}
  
  const obj: Post = {
    id: data.id,
    userId: userData.fetchUser().userId,
    caption: data.caption,
    author: {
      name: userData.fetchUser().name,
      username: userData.fetchUser().username,
      image: userData.fetchUser().image,
    },
    timeposted: data.timeposted,
    image: data.image,
    reactions: {
      likes: 0,
      comments: {
        count: 0,
        data: "null",
      },
      shares: 0,
      saves: 0,
    },
    likedUser: [],
  };
  
  if (FeedPosts[0] !== temp) {
    FeedPosts.push(obj)
  } else FeedPosts = [obj]

  SaveData("feed-post", FeedPosts);
  location.reload()
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

