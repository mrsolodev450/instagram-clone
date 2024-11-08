import React from 'react'
import { FiHeart, FiInstagram } from 'react-icons/fi'
import Item from './Item';
import { RiMessengerLine } from 'react-icons/ri';
import { useRouter } from 'next/navigation';
import { IoMdNotificationsOutline } from 'react-icons/io';

type Item = {
    title: string;
    icon: React.ReactNode;
    action: any
}

export default function HomeNavbar({title}: {title: string}) {
    const router = useRouter();
    const Items = [
        {
            title: "Notification",
            icon: <FiHeart />,
            action: () => {
              router.replace("/notifications");
            },
          },
          {
          title: "Messages",
          icon: <RiMessengerLine />,
          action: () => {
            if (window.history.state !== '/dm') {
              router.replace(`/dm`);
            }
          }
        },
        
      ];
    
  return (
    <>
      <section className="w-full h-[50px] px-5 sticky left-0 z- top-0 flex items-center justify-between top-nav z-40">

      <div className="flex items-center justify-start text-[2.2rem] gap-3">
          <span className="title-icon text-[1.7rem] icon ic">
            <FiInstagram />
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
