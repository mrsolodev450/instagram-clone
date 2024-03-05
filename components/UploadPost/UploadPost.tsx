import React, { useState } from 'react'
import TitleBar from './TitleBar';
import PostImage from './PostImage';
import PostCaption from './PostCaption';
import PFP from '../ui/PFP';

type UploadPost = {
  action?: any
  image: string
}

export default function UploadPost({
  action = () => {},
  image
}: UploadPost) {

  const [caption, setCaption] = useState('')

  function getCaption(val: string) {
    setCaption(val)
  }

  function postData() {
    action({
      caption: caption,
      timeposted: 0,
      image: image,
      reactions: {
        likes: 0,
        comments: {
          count: 0,
          data: 'null'
        },
        shares: 0,
        saves: 0
      },
      likedUser: []
    })
  }

  return (
    <>
    <div className='absolute transition-all inset-0 z-[999] m-auto w-fit h-fit bg-[#111111] rounded-[14px] flex flex-col justify-start items-center overflow-hidden shadow-md shadow-[#111111]/20'>

      <TitleBar title='Create Post' showBackIcon showNextButton action={postData} />
      <div className='w-full flex items-center justify-between gap-1'>
        <PostImage image={image} />
        <div className='h-[500px] overflow-auto flex flex-col items-center justify-start gap-3  py-3 px-2'>

          <div className="flex items-center justify-start gap-4 w-full" >
            <PFP image={'/pfp.png'} width={30} height={30} />
              <h1 className="text-[.9rem] flex items-center justify-start gap-1">knightwor_</h1>
          </div>
          <PostCaption action={getCaption} />
        </div>
      </div>
      
    </div>

    <div className="w-screen h-screen bg-[#000]/60 fixed inset-0 z-[997]"></div>
    </>
  )
}
