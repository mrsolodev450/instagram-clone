import React from 'react'

export default function Stories({
    children,
  }: {
    children: React.ReactNode;
  }) {
  return (
    <section className="stories flex items-center justify-start w-[700px] gap-5">
      {children}
    </section>
  )
}
