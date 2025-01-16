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

type Story = {
  author: Author
  content: string
  time: string
}

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
  stories?: Story[]
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
    stories: [
      {
        author: {
          name: "harry",
          image: "/default-user-pfp.png"
        },
        content: "Bankai",
        time: "5sec ago"
      }
    ]
  },
  {
    userId: 123456780,
    username: "mr.solodev",
    name: "Mr Solo Dev",
    image: "/pfp3.jpg",
    followers: [],
    following: [],
    country: "India",
    password: "87654321",
    bio: "Coder | Youtuber",
    stories: [
      {
        author: {
          name: "mr.solodev",
          image: "/pfp3.jpg"
        },
        content: "Yaruna",
        time: "5sec ago"
      }
    ]
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
    stories: [
      {
        author: {
          name: "john",
          image: "/default-user-pfp.png"
        },
        content: "Yokoso",
        time: "5sec ago"
      }
    ]
  },
  {
    userId: 12345678,
    username: "knightwor_",
    name: "KnightWor",
    image: "/murari.jpg",
    followers: ["john", "mr.solodev"],
    following: ["mr.solodev", "john"],
    country: "India",
    bio: "Web & App Developer, Writing Code To Unlock Hidden Possibilities.",
    password: "1234567890",
    stories: [
      {
        author: {
          name: "knightwor_",
          image: "/murari.jpg"
        },
        content: "Yowaimo",
        time: "5sec ago"
      }
    ]
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
    stories: [
      {
        author: {
          name: "",
          image: "/default-user-pfp.png"
        },
        content: "",
        time: ""
      }
    ]
  };

  if (typeof window !== "undefined") {
     user = JSON.parse(localStorage.getItem('logged-user') ?? JSON.stringify(user)) ;
    }
    
    return user
  
}

function findUser(username: string): any {
  let tempUser

  UserList.forEach(user => {
    if (user.username == username)
      tempUser = user    
  })

  return tempUser
}

const User: User = fetchUser()


export default { User, UserList, fetchPost, fetchUser, findUser };
