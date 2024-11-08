import { use } from "react";


type UserList = {
  user: User;
};

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

type User = {
  name: string;
  username: string;
  image: string;
  followers: string[];
  following: string[];
  userId: number;
  country: string;
  bio: string;
  password: string;
};

function fetchPost(key: string, userId: number) {
  let allPosts: Post[] = [];
  let userPosts: Post[] = [];

  if (typeof window !== "undefined") {
    allPosts = JSON.parse(localStorage.getItem(key) ?? "[{}]");
  }

  allPosts.forEach((post) => {
    if (post.userId === userId) {
      userPosts.push(post);
    }
  });

  return userPosts;
}

const UserList: User[] = [
  {
    userId: 123456789,
    username: "harry",
    name: "Harry",
    image: "/default-user-pfp.png",
    followers: [],
    following: [],
    country: "India",
    password: "12345678",
    bio: "Just A Coder",
  },
  {
    userId: 123456780,
    username: "mr.solodev",
    name: "Mr Solo Dev",
    image: "/default-user-pfp.png",
    followers: [],
    following: [],
    country: "India",
    password: "87654321",
    bio: "Coder | Youtuber",
  },
  {
    userId: 123456786,
    username: "john",
    name: "John",
    image: "/default-user-pfp.png",
    followers: [],
    following: [],
    country: "India",
    password: "123456789",
    bio: "Gym Lover",
  },
  {
    userId: 12345678,
    username: "knightwor_",
    name: "KnightWor",
    image: "/default-user-pfp.png",
    followers: ["john", "mr.solodev"],
    following: [],
    country: "India",
    bio: "Web & App Developer, Writing Code To Unlock Hidden Possibilities.",
    password: "1234567890",
  },
];

const fetchUser = () => {
  let user: User = {
    userId: 0,
    username: "",
    name: "",
    image: "/default-user-pfp.png",
    followers: [],
    following: [],
    country: "",
    bio: "",
    password: "",
  };

  if (typeof window !== "undefined") {
     user = JSON.parse(localStorage.getItem('logged-user') ?? JSON.stringify(user)) ;
    }
    
    return user
  
}


const User: User = fetchUser()


export default { User, UserList, fetchPost, fetchUser };
