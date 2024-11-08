import fetchPost from "./fetchPost"
import userData from "./userData"

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

export default function likePost(id: number) {
    const FeedPost: Post[] = fetchPost();
    const user = userData.fetchUser()
    let post: Post = FeedPost[id]

    let TempPost: Post[] = JSON.parse(JSON.stringify(FeedPost))
    
    if (!post.likedUser.includes(user.username)) {
      post.reactions.likes += 1
      post.likedUser.push(user.username)
    }
    else {
      post.reactions.likes -= 1
      let temp: string[] = []
      
      for (let i = 0; i <= post.likedUser.length; i++) {
        if (post.likedUser[i] == user.username) alert(post.likedUser)
        else temp.push(post.likedUser[i])
      }
      
      post.likedUser = temp
      
    }
    
    
  }