"use client";

import { Wallet, TabletSmartphone, Calendar1 } from "lucide-react";
import MainCard from "@/components/layout/cards/MainCard";
import useUsers from "@/hooks/useUsers";
import Image from "next/image";
import management from "@/assets/pictures/management.jpg";
import AuthGuard from "@/components/auth/AuthGuard";
import Loader from "@/components/fragments/loaders/Loader";
import HeroSection from "@/components/layout/hero/HeroSection";
import About from "@/components/layout/hero/About";

export default function Home() {
  const { user, loading } = useUsers();

  const cardData = [
    {
      icon: <Wallet width={30} height={30} color="white" />,
      title: "Money Tracker",
      button: "Go to Your Own Bank",
      description: "Place where you can manage your money",
    },
    {
      icon: <TabletSmartphone width={30} height={30} color="white" />,
      title: "Task Tracker",
      button: "See Your Homework",
      description: "Place where you can manage your task",
    },
    {
      icon: <Calendar1 width={30} height={30} color="white" />,
      title: "Event Tracker",
      button: "See Your Schedule",
      description: "Place where you can manage your date",
    },
  ];

  if (loading) return <Loader />;

  return (
    <>
      <AuthGuard>
        <div className="w-screen bg-background h-screen flex-col flex mt-15">
          <div className="flex h-fit py-5 w-full px-15 border-b-2 text-black border-foreground">
            <div className="py-2 flex-col flex gap-2 w-full h-fit">
              <div className="flex flex-row justify-between w-full h-45">
                <div className="flex flex-col h-full w-full gap-2">
                  <h1 className="text-7xl text-foreground font-semibold w-fit">
                    Welcome back
                  </h1>
                  <h2 className="text-[#471396] text-5xl font-semibold">
                    {user?.username} <span className="text-foreground">! </span>
                  </h2>
                  <div className="flex flex-col h-full justify-end">
                    <p className="text-2xl font-normal text-foreground">
                      Let`s start to manage ur life
                    </p>
                  </div>
                </div>
                <Image
                  src={management}
                  alt="Management picture"
                  className="w-full rounded-xl border-4 border-[#471396] h-full object-center object-cover"
                />
              </div>
            </div>
          </div>

          <div className="py-5 px-15 flex gap-5 h-full w-full">
            <div className="w-full h-fit flex flex-wrap gap-5 justify-between gap-y-10">
              {cardData.map((item) => (
                <MainCard
                  button={item.button}
                  description={item.description}
                  icon={item.icon}
                  title={item.title}
                  key={item.title}
                />
              ))}
            </div>
          </div>
          <div className="w-full">
            <About />
            <HeroSection />
          </div>
        </div>
      </AuthGuard>
    </>
  );
}
