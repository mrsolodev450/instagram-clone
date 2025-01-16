import React from 'react'

export default function StoriesPageLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
  return (
    <div className='w-dvw h-dvh bg-background-color flex items-center justify-center'>
      {children}
    </div>
  )
}
