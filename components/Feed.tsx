import React from 'react'

export default function Feed({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className="feed w-full h-[100vh] flex flex-col items-center justify-start gap-5 px-16 py-5 overflow-x-hidden overflow-y-auto">
    
    {children}
  </section>
}
