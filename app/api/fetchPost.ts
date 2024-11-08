
interface Author {
    name: string,
    username: string
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
    userId: number
    caption: string
    timePosted: any
    author: Author
    audio?: string
    image: string
    reactions: Reactions,
    action?: any
    id: number,
    likedUser: string[]
  }

  
const temp: Post[] = [{
    id: 0,
    userId: 0,
    caption: "",
    author: {
      name: "",
      username: "",
      image: "",
    },
    timePosted: "",
    image: "",
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
  }]

  export default function fetchPost() {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("feed-post") ?? JSON.stringify(temp));
    }
  }