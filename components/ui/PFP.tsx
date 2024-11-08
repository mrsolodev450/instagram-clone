import Image from 'next/image'
import React from 'react'

interface PFP {
    image: string 
    action?: any
    width?: number
    height?: number
    size?: number
}

export default function PFP({image, action = () => {}, width, height, size = 24}: PFP) {
  return <Image src={image ? image : ''} alt={'PFP'} width={(width ? width : size) * 2} height={(height ? height : size) * 2} className='rounded-full aspect-square object-cover pfp' onClick={() => action()} />
}
