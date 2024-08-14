import Sidebar from '@/components/sidebar/Sidebar';
import React from 'react'

export default function DmLayout({
    children
  }: Readonly<{
    children: React.ReactNode
  }>) {
   
  return (
    <div>
      <Sidebar />
      
      {children}
    </div>
  )
}
