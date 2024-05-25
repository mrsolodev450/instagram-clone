import Image from 'next/image'
import React from 'react'

export default function PostImage({image = '/user-pfp.png'}: {image: string}) {
  return <Image src={image} alt={'wwdw'} width={1000} height={1000} className='w-[500px] h-[500px] object-cover'/>
}
