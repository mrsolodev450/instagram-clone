import React from "react";

type Item = {
  title: string;
  action?: any;
  children: React.ReactNode;
};

export default function Item({ title, children, action = () => {} }: Item) {
  return (
    <li className="w-[200px] sidebar-item h-[40px] icon flex items-center justify-start gap-5" onClick={() => action({theme: title.toLowerCase(), icon: children})}>
      <span className="text-[1.2rem]">{children}</span>
      <p className="text-[1rem]">{title}</p>
    </li>
  );
}
