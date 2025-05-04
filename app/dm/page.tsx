
"use client"

import DmSidebar from '@/components/sidebar/DmSidebar';
import React from 'react'
import { LuMessagesSquare } from 'react-icons/lu';
import userData from '../api/userData';
import DmList from '@/components/DmList';
import BottomNavbar from '@/components/bottomnav/BottomNavbar';
import Navbar from '@/components/navbar/Navbar';
import { FiMessageSquare } from 'react-icons/fi';
import { BiMessageAltDetail } from 'react-icons/bi';
import { TbMessage2Off } from 'react-icons/tb';
import { ChatBubbleXmark } from 'iconoir-react';

export default function DmPage() {
  
  
  return (
    <>
    <DmSidebar user={userData.UserList} />
    <Navbar title='Messages' type='DMList'/>
    <DmList user={userData.UserList} />
    {/* <BottomNavbar /> */}
    
    <div className='dm-pg max-[750px]:hidden w-full h-[100vh] flex flex-col justify-center items-center gap-5'>
      <span className="text-[10rem] text-foreground-color"> 
        <ChatBubbleXmark strokeWidth={1.5}/>
      </span>
      <h1 className=' text-secondary-color/30 text-[1.7rem]'>Start New Chat</h1>
    </div>
    </>
  )
}
