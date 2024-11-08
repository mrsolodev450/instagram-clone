import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Post = {
  caption: string;
  timePosted: string;
  author: {
    name: string;
    image: string;
    username: string;
  };
  image: string;
  action?: any;
  likedUser: string[];
  id: number;
  userId: number;
};

export interface postState {
  items: Post[];
}

const initialState: postState = {
  items: [],
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    upload: (state, action) => {

      
      state.items.push(action.payload);

    },

    like: (state, action) => {
      let post = state.items[action.payload.id];

      if (!post.likedUser.includes(action.payload.username))
        post.likedUser.push(action.payload.username);
      else {
        let temp: string[] = []
        
        post.likedUser.forEach((item) => {
          if (item == action.payload.username) return;

          temp.push(item)
        });

        post.likedUser = temp
      }
    },

    remove: (state, action) => {
      const index = action.payload
      if (index > -1)
        state.items.splice(index, 1)
    }

  },
});

export const { upload, like, remove } = postSlice.actions;

// export const selectCount = (state: RootState) => state.counter.value

export default postSlice.reducer;
