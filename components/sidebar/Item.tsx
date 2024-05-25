import Link from "next/link";
import React from "react";

type Item = {
  type: "normal" | "link" | string;
  title: string;
  action?: any;
  icon: React.ReactNode;
  path?: string;
  id: number
  isActive: boolean
};

export default function Item({
  type,
  title,
  icon,
  path = "/",
  action = () => {},
  id,
  isActive = false
}: Item) {
  if (type == "normal")
    return (
      <div className=" sidebar-item">
        <li
          className="w-[200px] sidebar-item h-[40px] icon flex items-center justify-start gap-5"
          onClick={() => action()}
        >
          {/* <span className="indicator w-1 h-full bg-royalblue rounded-md absolute left-[-15px] top-0"></span> */}
          <span className="ic text-[1.7rem]">{icon}</span>
          <p className="text-[1.2rem]">{title}</p>
        </li>
      </div>
    );
  else
    return (
      <div className=" sidebar-item">
        <li
          className="w-[200px] sidebar-item h-[40px] icon flex items-center justify-start gap-5" id={`${id}`}
          onClick={() => action()}
        >
          <Link
            className="w-full h-full flex items-center justify-start gap-5"
            href={path}
            
          >
            {/* {isActive ? <span className="indicator w-1 h-full bg-royalblue rounded-md absolute left-[-15px] top-0"></span> : <></>} */}
            <span className="ic text-[1.7rem]">{icon}</span>
            <p className="text-[1.2rem]">{title}</p>
          </Link>
        </li>
      </div>
    );
}
