"use client"

import React, { useRef } from 'react'
import { Provider } from 'react-redux'
import { AppStore, createStore } from './lib/store/store'
import { upload } from './lib/store/features/post/postSlice'
import fetchPost from './api/fetchPost'
import { switchUser } from './lib/store/features/user/userSlice'
import userData from './api/userData'

const StoreProvider = ({children}: {children: React.ReactNode}) => {

    const storeRef = useRef<AppStore>()
    const post = fetchPost()
  if (!storeRef.current) {
    storeRef.current = createStore()
    // storeRef.current.dispatch(switchUser(userData.UserList[0]))
  }

  return (
    <Provider store={storeRef.current}>
        {children}
    </Provider>
  )
}

export default StoreProvider
