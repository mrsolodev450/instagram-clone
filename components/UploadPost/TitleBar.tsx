import React from 'react'
import { BsChevronLeft } from 'react-icons/bs'

export default function TitleBar({title, showBackIcon = false, showNextButton = false, action = () => {}, close = () => {}}: {title: string, action?: any, showBackIcon?: boolean, showNextButton?: boolean, close?: any}) {
  
  return (
    <div className='flex items-center justify-between p-2 w-full border-b-[1px] border-[#a1a1a1]/25'>
      {showBackIcon ? <span className='icon only-icon font-black text-[1.4rem]'  onClick={() => close()}>
        <BsChevronLeft />
      </span> : <></>}
      <h1 className='text-[1.1rem] font-medium w-full text-center'>{title}</h1>
      {showNextButton ? <button className='button px-[10px] py-[5px] bg-royalblue text-[#fff] rounded-md font-medium' onClick={() => action()}>Share</button> : <></>}
    </div>
  )
}
