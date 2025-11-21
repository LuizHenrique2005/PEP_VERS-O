"use client";

import { NavBar } from "@/components/NavBar";
import { SideBar } from "@/components/SideBar";

export default function Pacientes() {
  return (
    <div className="w-full h-auto flex">
      <SideBar />
      <div className="ml-[18%] flex-1">
        <NavBar />
        <div className="flex w-full pt-30 justify-evenly flex-wrap"></div>
      </div>
    </div>
  );
};
