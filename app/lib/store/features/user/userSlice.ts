import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post } from "../post/postSlice";
import { stat } from "fs/promises";

export type User = {
  name: string;
  username: string;
  image: string;
  followers: string[];
  following: string[];
  userId: number;
  country: string;
  bio: string;
  password: string;
  posts: Post[];
};

export interface userState {
  items: User;
}

const initialState: userState = {
  items: {
    userId: 12345678,
    username: "knightwor_",
    name: "KnightWor",
    image: "/murari.jpg",
    followers: ["john", "mr.solodev"],
    following: [],
    country: "India",
    bio: "Web & App Developer, Writing Code To Unlock Hidden Possibilities.",
    password: "1234567890",
    posts: []
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    switchUser: (state, action) => {
      state.items = action.payload
    },

    addPost: (state, action) => {
      state.items.posts.push(action.payload);
    },

    removePost: (state, action) => {
      const index = action.payload

      if (index > -1)
        state.items.posts.splice(index, 1)
    },

    changeImage: (state, action) => {
      state.items.image = action.payload
    },

    follow: (state, action) => {
      let user = state.items;

      if (!user.following.includes(action.payload.username))
        user.following.push(action.payload.username);
      else {
        let temp: string[] = [];

        user.following.forEach((item) => {
          if (item == action.payload.username) return;

          temp.push(item);
        });

        user.following = temp;
      }
    },
  },
});

export const { addPost, removePost, follow, changeImage, switchUser } = userSlice.actions;

// export const selectCount = (state: RootState) => state.counter.value

export default userSlice.reducer;
