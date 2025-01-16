import EmojiPicker, { EmojiStyle, Theme } from "emoji-picker-react";
import React, { TextareaHTMLAttributes, useRef, useState } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { MdOutlineEmojiEmotions } from "react-icons/md";

export default function PostCaption({ action = () => {} }: { action?: any }) {
  const captionRef = useRef<HTMLTextAreaElement>(null);
  const [captionLen, setCaptionLen] = useState(0);
  const maxCaptionLen = 200;

  const [isEmojiPickerActive, setEmojiPicjerActive] = useState(false);

  function chooseEmoji() {
    isEmojiPickerActive
      ? setEmojiPicjerActive(false)
      : setEmojiPicjerActive(true);
  }

  function handleInput() {
    if (captionRef && captionRef.current) {
      setCaptionLen(captionRef.current.textLength);
      action(captionRef.current?.value);
    }
  }
  return (
    <>
      <div className="w-[300px] h-[300px] px-2">
        <textarea
          name="caption"
          id="post-caption"
          cols={20}
          rows={10}
          className="w-full resize-none bg-transparent outline-none border-none text-[.9rem]"
          placeholder="Write a caption..."
          minLength={0}
          maxLength={maxCaptionLen}
          ref={captionRef}
          onChange={handleInput}
        ></textarea>
        <div className="flex items-center justify-between">
          <span className="icon only-icon text-[1.5rem]" onClick={chooseEmoji}>
            <MdOutlineEmojiEmotions />
          </span>
          <p className="caption-word-count text-[.8rem] text-secondary-color">
            {captionLen}/{maxCaptionLen}
          </p>
        </div>
      </div>
      <EmojiPicker
        style={{
          position: "absolute",
          bottom: "calc(100% + 10px)",
          left: "30px",
        }}
        open={isEmojiPickerActive}
        theme={Theme.AUTO}
        lazyLoadEmojis
        emojiStyle={EmojiStyle.GOOGLE}
      />
    </>
  );
}
