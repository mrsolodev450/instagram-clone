import { configureStore } from '@reduxjs/toolkit'
import postReducer from './features/post/postSlice'
import userReducer from './features/user/userSlice'

export const createStore = () => {

    return configureStore({
      reducer: {
        posts: postReducer,
        users: userReducer
      }
    })
}


// Infer the type of makeStore
export type AppStore = ReturnType<typeof createStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']