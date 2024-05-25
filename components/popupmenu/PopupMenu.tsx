import React from "react";
import Item from "./Item";

type Item = {
  title: string;
  action?: any;
  icon: React.ReactNode;
};

type PopupMenu = {
  show: boolean;
  items: Item[];
  close: any;
};

export default function PopupMenu({
  show = false,
  items,
  close = () => {},
}: PopupMenu) {
  if (show)
    return (
      <div className="w-full absolute px-5 py-2 bg-background-color rounded-[10px] popup-menu shadow-md">
        {items.map((item, index) => (
          <Item key={index} title={item.title} action={item.action} children={item.icon}/>
        ))}
      </div>
    );
  else return <></>;
}
