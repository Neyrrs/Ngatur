"use client";

import { Wallet, TabletSmartphone, Calendar1 } from "lucide-react";
import MainCard from "@/components/layout/cards/MainCard";
import useUsers from "@/hooks/useUsers";
import Image from "next/image";
import management from "@/assets/pictures/management.jpg";

export default function Home() {
  const { user, loading } = useUsers();

  if (loading) return <div>Loading...</div>;
  return (
    <>
      <div className="w-screen bg-[#EFEFEF] px-15 h-screen text-black flex-col flex mt-15">
        <div className="flex h-fit py-5 w-full border-b-2 text-black border-[#1A1A19]">
          <div className="py-2 flex-col flex gap-2 w-full h-fit">
            <div className="flex flex-row justify-between w-full h-45">
              <div className="flex flex-col h-full w-full gap-2">
                <h1 className="text-7xl font-semibold w-fit">Welcome back</h1>
                <h2 className="text-[#A62C2C] text-5xl font-semibold">
                  {user?.username} <span className="text-black">! </span>
                </h2>
                <div className="flex flex-col h-full justify-end">
                  <p className="text-2xl font-normal">
                    Let`s start to manage ur life
                  </p>
                </div>
              </div>
              <Image
                src={management}
                alt="Management picture"
                className="w-full rounded-xl border-4 border-[#A62C2C] h-full object-center object-cover"
              />
            </div>
          </div>
        </div>

        <div className="py-5 flex gap-5 h-full w-full">
          <div className="w-full h-fit flex flex-wrap gap-5 justify-between gap-y-10">
            <MainCard
              icon={<Wallet width={30} height={30} color="#A62C2C" />}
              title="Money Tracker"
              button="Go to Your Own Bank"
              description="Place where you can manage your money"
            />
            <MainCard
              icon={<TabletSmartphone width={30} height={30} color="#A62C2C" />}
              title="Task Tracker"
              button="See Your Homework"
              description="Place where you can manage your task"
            />
            <MainCard
              icon={<Calendar1 width={30} height={30} color="#A62C2C" />}
              title="Event Tracker"
              button="See Your Schedule"
              description="Place where you can manage your date"
            />
          </div>
        </div>

        
      </div>
    </>
  );
}
