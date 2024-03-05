import React, { useRef } from 'react'
import { BsChevronBarLeft, BsChevronLeft } from 'react-icons/bs'
import { FaChevronCircleLeft } from 'react-icons/fa'

export default function TitleBar({title, showBackIcon = false, showNextButton = false, action = () => {}}: {title: string, action?: any, showBackIcon?: boolean, showNextButton?: boolean}) {
  
  return (
    <div className='flex items-center justify-between p-2 w-full border-b-[1px] border-[#a1a1a1]/25'>
      {showBackIcon ? <span className='icon only-icon font-black text-[1.4rem]'>
        <BsChevronLeft />
      </span> : <></>}
      <h1 className='text-[1.1rem] font-medium w-full text-center'>{title}</h1>
      {showNextButton ? <button className='button text-[#fff] px-[10px] py-[5px] bg-[#4169e1] rounded-md font-medium' onClick={() => action()}>Share</button> : <></>}
    </div>
  )
}
