import userData from "./userData";

type Author = {
  name: string;
  image: string;
};

type Story = {
  author: Author
  content: string;
  time: string;
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
  stories?: Story[];
};

export default function fetchStories() {
  let stories: Story[] = [];

  const loggedInUser: User = userData.fetchUser();
  const storyCount = stories.length;
  let followingUsers: User[] = [];
  
  for (let i = 0; i < loggedInUser.following.length; i++) {
    followingUsers.push(userData.findUser(loggedInUser.following[i]))
  }

  followingUsers.forEach(user => {
    if (user.stories) {
      stories.push(user.stories[0]) 
    }
  })

  return {stories: stories, storiesCount: storyCount};
}
