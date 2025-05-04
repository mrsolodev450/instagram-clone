import React from 'react'
import { FiArrowDownLeft, FiArrowLeft, FiEdit, FiInstagram } from 'react-icons/fi'
import Item from './Item';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'iconoir-react';

type Item = {
    title: string;
    icon: React.ReactNode;
    action: any
}

export default function DMListNavbar({title}: {title: string}) {

    const router = useRouter();
    const Items = [
        {
          title: "Select",
          icon: <FiEdit />,
          action: () => {
            
          }
        },
        
      ];

    return (
        <>
          <section className="w-full h-[50px] px-5 sticky left-0 z- top-0 flex items-center justify-between top-nav z-40">
    
          <div className="flex items-center justify-start text-[2.2rem] gap-3">
              <span className="title-icon text-[1.7rem] icon ic" onClick={
                () => router.push('/')
              }>
                <ArrowLeft width={20} height={20} strokeWidth={1.5}/>
              </span>
              <span className=" text-[1rem] font-bold">{title}</span>
            </div>
    
            <ul className=" flex items-center justify-center">
              {Items.map((item, index) => (
                <Item
                  key={index}
                  title={item.title}
                  icon={item.icon}
                  action={item.action}
                />
              ))}
            </ul>
    
            
          </section>
    
        </>
      )
}
