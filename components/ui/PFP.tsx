import Image from 'next/image'
import React from 'react'

interface PFP {
    image: string 
    action?: any
    width?: number
    height?: number
}

export default function PFP({image, action = () => {}, width = 24, height = 24}: PFP) {
  return <Image src={image ? image : ''} alt={'PFP'} width={width * 5} height={height * 1} className='rounded-full' onClick={() => action()} style={{width: width, height: height}} />
}
