import React from "react";

type Item = {
  title: string;
  action?: any;
  icon: React.ReactNode;
};

export default function Item({title, icon, action = () => {} }: Item) {
  return (
    <li className="w-[40px] h-[40px] icon flex items-center justify-center gap-5" onClick={() => action()}>
      <span className="ic text-[1.7rem]">{icon}</span>
      
    </li>
  );
}