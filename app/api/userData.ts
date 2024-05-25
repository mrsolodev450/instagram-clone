

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
  timeposted: any;
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
  height: number;
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
    username: "official.harry",
    name: "Harry",
    image: "/pfp7.jpeg",
    followers: [],
    following: [],
    height: 6.1,
    country: "India",
    password: "harryop",
    bio: "Just A Coder",
  },
  {
    userId: 123456780,
    username: "mr.solodev",
    name: "Mr Solo Dev",
    image: "/pfp6.jpeg",
    followers: [],
    following: [],
    height: 6.2,
    country: "India",
    password: "mrsolodev01",
    bio: "Coder | Youtuber",
  },
  {
    userId: 123456781,
    username: "official.geniusdeveloper_",
    name: "Genius Developer",
    image: "/pfp5.jpeg",
    followers: [],
    following: [],
    height: 6,
    country: "India",
    password: "ogd1234",
    bio: "Coder | YouTuber",
  },
  {
    userId: 123456786,
    username: "john",
    name: "John",
    image: "/pfp4.JPG",
    followers: [],
    following: [],
    height: 5.11,
    country: "India",
    password: "john01",
    bio: "Gym Lover",
  },
  {
    userId: 123456784,
    username: "km.sharma_",
    name: "Km Sharma",
    image: "/pfp3.jpeg",
    followers: [],
    following: [],
    height: 6.2,
    country: "India",
    password: "0987654321",
    bio: "I am Km Sharma",
  },
  {
    userId: 123456785,
    username: "mr.x_",
    name: "Mr. X",
    image: "/pfp2.jpeg",
    followers: [],
    following: [],
    height: 6,
    country: "India",
    password: "mrx01234",
    bio: "Hii, I am Mr. X.",
  },
  {
    userId: 12345678,
    username: "knightwor_",
    name: "Krishan Murari",
    image: "/pfp1.jpeg",
    followers: [],
    following: ['official.geniusdeveloper_'],
    height: 6.2,
    country: "India",
    bio: "Passinate Coder",
    password: "1234567890",
  },
];

const fetchUser = () => {

  if (typeof window !== "undefined") {
     return JSON.parse(localStorage.getItem('logged-user') ?? '{}') ;
  }
}


const User: User = fetchUser()


export default { User, UserList, fetchPost, fetchUser };
