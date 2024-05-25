import React from 'react'
import { LuMessagesSquare } from 'react-icons/lu'

export default function page() {
  return (
    <div className=' w-full h-[100vh] flex flex-col justify-center items-center gap-5'>
      <span className="text-[15rem] text-foreground-color"> 
      <LuMessagesSquare  />
      </span>
      <h1 className=' text-secondary-color text-[2rem] font-medium'>No Dm Open</h1>
    </div>
  )
}
