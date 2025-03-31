"use client";
import { FileClock, Home, Settings, WalletCards } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import UsageTrack from "./UsageTrack";

function SideNav() {
  const MenuList = [
    {
      name: "Home",
      icon: Home,
      path: "/dashboard",
    },
    {
      name: "History",
      icon: FileClock,
      path: "/dashboard/history",
    },
    {
      name: "Billing",
      icon: WalletCards,
      path: "/dashboard/billing",
    },
    {
      name: "Setting",
      icon: Settings,
      path: "/dashboard/settings",
    },
  ];

  const path = usePathname();
  useEffect(() => {
    console.log(path);
  }, []);

  return (
    <div className="md:h-screen md:block md:relative p-5 shadow-sm border bg-white flex justify-between">
      <div className="flex">
        <div className="justify-center md:block">
          <Link href={"/"}>
            <Image src={"/logo.svg"} alt="logo" width={120} height={100} />
          </Link>
        </div>
        {/* <div className="md:hidden sticky bottom-0 w-full">
          <UsageTrack />
        </div> */}
      </div>
      <hr className=" md:my-6 border hidden md:block" />
      <div className="md:mt-3 flex justify-evenly flex-row md:flex-col">
        {MenuList.map((menu, index) => (
          <Link href={menu.path}>
            <div
              className={`flex gap-1 md:gap-2 md:mb-2 p-1 md:p-3
                    hover:bg-primary hover:text-white rounded-lg
                    cursor-pointer items-center
                    ${path == menu.path && "bg-primary text-white"}
                    `}
            >
              <menu.icon className="h-6 w-6" />
              <h2 className="md:text-lg text-sm hidden md:block">
                {menu.name}
              </h2>
            </div>
          </Link>
        ))}
      </div>
      <div className="hidden md:block md:absolute md:bottom-10 md:left-0 w-full">
        <UsageTrack />
      </div>
    </div>
  );
}

export default SideNav;
