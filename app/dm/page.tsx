
"use client"

import DmSidebar from '@/components/sidebar/DmSidebar';
import React from 'react'
import { LuMessagesSquare } from 'react-icons/lu';
import userData from '../api/userData';
import DmList from '@/components/DmList';
import BottomNavbar from '@/components/bottomnav/BottomNavbar';

export default function DmPage() {
  
  
  return (
    <>
    <DmSidebar user={userData.UserList} />
    <DmList user={userData.UserList} />
    <BottomNavbar />
    
    <div className='dm-pg w-full h-[100vh] flex flex-col justify-center items-center gap-5'>
      <span className="text-[15rem] text-foreground-color"> 
      <LuMessagesSquare  />
      </span>
      <h1 className=' text-secondary-color text-[2rem] font-medium'>Open Chat To Start</h1>
    </div>
    </>
  )
}
