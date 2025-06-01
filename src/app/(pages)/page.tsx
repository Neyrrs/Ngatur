"use client";

import { Wallet, TabletSmartphone, Calendar1 } from "lucide-react";
import MainCard from "@/components/layout/cards/MainCard";
import useUsers from "@/hooks/useUsers";

export default function Home() {
  const { users, loading } = useUsers();

  if (loading) return <div>Loading...</div>;
  return (
    <>
      <div className="w-screen bg-[#EFEFEF] px-15 h-screen text-black flex-col flex mt-15">
        <div className="flex h-fit py-5 w-full border-b-2 text-black border-[#1A1A19]">
          <div className="py-10 flex-col flex gap-2">
            <h1 className="text-5xl font-semibold">
              Welcome back,{" "}
              <span className="text-[#A62C2C]">{users?.username}</span>!
            </h1>
            <p className="text-2xl font-normal">
              Let`s start to manage ur life
            </p>
          </div>
        </div>

        <div className="py-5 flex gap-5 h-full w-fit">
          <div className="w-full h-fit flex gap-5 flex-wrap gap-y-10">
            <MainCard
              icon={<Wallet width={30} height={30} />}
              title="Money Tracker"
              button="Go to Your Own Bank"
              description="Place where you can manage your money"
            />
            <MainCard
              icon={<TabletSmartphone width={30} height={30} />}
              title="Task Tracker"
              button="See Your Homework"
              description="Place where you can manage your task"
            />
            <MainCard
              icon={<Calendar1 width={30} height={30} />}
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
