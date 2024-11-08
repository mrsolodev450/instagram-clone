import Link from "next/link";
import React from "react";

type Item = {
  type: "normal" | "link" | string;
  title: string;
  action?: any;
  icon: React.ReactNode;
  path?: string;
  isIconOnly?: boolean;
};

export default function Item({
  type,
  title,
  icon,
  path = "/",
  isIconOnly = false,
  action = () => {},
}: Item) {
  const itemTitleWidth = {
    width: isIconOnly ? 0 : "200px",
  };
  if (type == "normal")
    return (
      <div className="sidebar-item">
        <li
          className=" h-[40px] icon flex items-center justify-start gap-5"
          onClick={() => action()}
        >
          <span className="ic text-[1.7rem]">{icon}</span>
          {!isIconOnly ? (
            <p className="text-[1.2rem] text-primary-color">{title}</p>
          ) : (
            <></>
          )}
        </li>
      </div>
    );
  else
    return (
      <div className="sidebar-item">
        <li
          className="h-[40px] icon flex items-center justify-start gap-5"
          onClick={() => action()}
        >
          <Link
            className="w-full h-full flex items-center justify-start gap-5"
            href={path}
          >
            <span className="ic text-[1.7rem]">{icon}</span>
            {!isIconOnly ? (
              <p className="text-[1.2rem] text-primary-color">{title}</p>
            ) : (
              <></>
            )}
          </Link>
        </li>
      </div>
    );
}
