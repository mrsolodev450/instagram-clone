import EmojiPicker, { EmojiStyle, Theme } from 'emoji-picker-react'
import React, { useRef, useState } from 'react'
import { BsEmojiSmile } from 'react-icons/bs'
import { MdOutlineEmojiEmotions } from 'react-icons/md'

export default function PostCaption({action = () => {}}: {action?: any}) {
  const captionRef = useRef<HTMLTextAreaElement>(null)
  const [isEmojiPickerActive, setEmojiPicjerActive] = useState(false)

  function chooseEmoji() {
    isEmojiPickerActive ? setEmojiPicjerActive(false) : setEmojiPicjerActive(true)
  }
  return (
    <>
    <div className='w-[300px] h-[300px] px-2'>
      <textarea name="caption" id="post-caption" cols={20} rows={10} className='w-full resize-none bg-transparent outline-none border-none text-[.9rem]' placeholder='Write a caption...' minLength={0} maxLength={2000} ref={captionRef} onChange={() => action(captionRef.current?.value)}></textarea>
      <div className='flex items-center justify-between'>
        <span className='icon only-icon text-[1.5rem]' onClick={chooseEmoji}>
          <MdOutlineEmojiEmotions />
        </span>
        <p className="caption-word-count text-[.8rem] text-[#888]">0/2000</p>
      </div>
      
    </div>
    <EmojiPicker open={isEmojiPickerActive} theme={Theme.AUTO} lazyLoadEmojis emojiStyle={EmojiStyle.GOOGLE} />
    </>
  )
}
