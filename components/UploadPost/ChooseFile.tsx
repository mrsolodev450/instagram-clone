import React, { useRef, useState } from 'react'
import TitleBar from './TitleBar'
import { CiImageOn, CiPlay1, CiVideoOn } from 'react-icons/ci'

interface ChooseFileType {
    action?: any
}

export default function ChooseFile({action = () => {}}: ChooseFileType) {

  const fileInputRef = useRef<HTMLInputElement>(null)

  function chooseFile(e: any) {
    const reader = new FileReader()

    if (e.target && e.target.files !== null) {
        reader.readAsDataURL(e.target.files[0])
        reader.addEventListener('load', () => {
          action(reader.result)
        })
        
    }
    
  }

  function handleChooseFile() {
    fileInputRef.current?.click()
  }

  return (
    <>
    <div className='absolute inset-0 m-auto w-[700px] h-[500px] z-[999] bg-[#111111] rounded-[14px] flex flex-col justify-start items-center overflow-hidden'>

      <TitleBar title='Create New Post' />
      <div className='w-full h-full flex flex-col items-center justify-center gap-4'>
        <span className='text-[6rem] text-[#888] flex items-center justify-center relative h-[100px]'>
            <span className='absolute rotate-[-10deg] right-[-10px]'>
                <CiImageOn />
            </span>
            <span className='absolute rotate-[10deg] text-[3rem] left-[-20px] top-0 border-[3px] px-3 py-3 border-[#888] rounded-[14px] bg-[#111111]'>
                <CiPlay1 />
            </span>
        </span>
        <h1 className='text-[1.1rem] text-[#888]'>Drag And Drop or Select File</h1>
        <button className='button text-[#fff] text-[0.9rem] px-[10px] py-[5px] bg-[#4169e1] rounded-md font-medium' onClick={handleChooseFile}>Select from computer</button>
        <input type="file" ref={fileInputRef} onChange={e => chooseFile(e)} hidden/>
      </div>
      
    </div>
    <div className="w-screen h-screen bg-[#000]/60 fixed inset-0 z-[997]"></div>
    </>
  )
}
