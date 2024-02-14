import React from 'react'
import {  BsThreads } from "react-icons/bs";
import {
  FiCompass,
  FiHeart,
  FiHome,
  FiInstagram,
  FiMenu,
  FiPlayCircle,
  FiPlusCircle,
  FiSearch,
  FiUser,
} from "react-icons/fi";
import { RiMessengerLine } from "react-icons/ri";
import PFP from './ui/PFP';

export default function Sidebar() {
  return (
    <section className="h-full px-5 py-5 flex flex-col items-start justify-between sidebar">
        <div className="flex items-center justify-start text-[2.2rem] title">
          <span className="title-icon text-[1.7rem] icon">
            <FiInstagram />
          </span>
          <span className="title-text">Instagram</span>
        </div>

        <ul className="h-[70%] flex flex-col items-center justify-start gap-5">
          <li className="w-[200px] sidebar-item h-[40px] icon flex items-center justify-start gap-5">
            <span className="text-[1.7rem]">
              <FiHome />
            </span>
            <p className="text-[1.2rem]">Home</p>
          </li>
          <li className="w-[200px] sidebar-item h-[40px] icon flex items-center justify-start gap-5">
            <span className="text-[1.7rem]">
              <FiSearch />
            </span>
            <p className="text-[1.2rem]">Search</p>
          </li>
          <li className="w-[200px] sidebar-item h-[40px] icon flex items-center justify-start gap-5">
            <span className="text-[1.7rem]">
              <FiCompass />
            </span>
            <p className="text-[1.2rem]">Explore</p>
          </li>
          <li className="w-[200px] sidebar-item h-[40px] icon flex items-center justify-start gap-5">
            <span className="text-[1.7rem]">
              <FiPlayCircle />
            </span>
            <p className="text-[1.2rem]">Reels</p>
          </li>
          <li className="w-[200px] sidebar-item h-[40px] icon flex items-center justify-start gap-5">
            <span className="text-[1.7rem]">
              <RiMessengerLine />
            </span>
            <p className="text-[1.2rem]">Messages</p>
          </li>
          <li className="w-[200px] h-[40px] sidebar-item icon flex items-center justify-start gap-5">
            <span className="text-[1.7rem]">
              <FiHeart />
            </span>
            <p className="text-[1.2rem]">Notification</p>
          </li>
          <li className="w-[200px] sidebar-item h-[40px] icon flex items-center justify-start gap-5">
            <span className="text-[1.7rem]">
              <FiPlusCircle />
            </span>
            <p className="text-[1.2rem]">Create</p>
          </li>
          <li className="w-[200px] sidebar-item h-[40px] icon flex items-center justify-start gap-5">
            <span className="text-[1.7rem]">
              <PFP image={"/defualt-user-pfp.png"} />
            </span>
            <p className="text-[1.2rem]">Profile</p>
          </li>
        </ul>

        <div className="h-[10%] flex flex-col items-center justify-start">
          <ul className="h-[100%] flex flex-col items-center justify-start gap-2">
            <li className="w-[200px] sidebar-item h-[40px] icon flex items-center justify-start gap-5">
              <span className="text-[1.7rem]">
                <BsThreads />
              </span>
              <p className="text-[1.2rem]">Threads</p>
            </li>
            <li className="w-[200px] sidebar-item h-[40px] icon flex items-center justify-start gap-5">
              <span className="text-[1.7rem]">
                <FiMenu />
              </span>
              <p className="text-[1.2rem]">More</p>
            </li>
          </ul>
        </div>
      </section>
  )
}
