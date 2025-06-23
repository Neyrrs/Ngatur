"use client";

import { Wallet, TabletSmartphone, Calendar1 } from "lucide-react";
import MainCard from "@/components/layout/cards/MainCard";
import useUsers from "@/hooks/useUsers";
import Image from "next/image";
import management from "@/assets/pictures/management.jpg";
import task from "@/assets/pictures/task.jpg";
import AuthGuard from "@/components/auth/AuthGuard";
import * as motion from "motion/react-client";

export default function Home() {
  const { user, loading } = useUsers();

  if (loading) return <div>Loading...</div>;
  return (
    <>
      <AuthGuard>
        <div className="w-screen bg-[#EFEFEF] h-screen text-black flex-col flex mt-15">
          <div className="flex h-fit py-5 w-full px-15  border-b-2 text-black border-[#1A1A19]">
            <div className="py-2 flex-col flex gap-2 w-full h-fit">
              <div className="flex flex-row justify-between w-full h-45">
                <div className="flex flex-col h-full w-full gap-2">
                  <motion.h1
                    className="text-7xl font-semibold w-fit cursor-pointer"
                    whileHover={{
                      y: -5,
                      color: "#471396",
                      transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      },
                    }}
                    whileTap={{ scale: 0.9 }}
                  >
                    Welcome back
                  </motion.h1>
                  <h2 className="text-[#471396] text-5xl font-semibold">
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
                  className="w-full rounded-xl border-4 border-[#471396] h-full object-center object-cover"
                />
              </div>
            </div>
          </div>

          <div className="py-5 px-15 flex gap-5 h-full w-full">
            <div className="w-full h-fit flex flex-wrap gap-5 justify-between gap-y-10">
              <MainCard
                icon={<Wallet width={30} height={30} color="white" />}
                title="Money Tracker"
                button="Go to Your Own Bank"
                description="Place where you can manage your money"
              />
              <MainCard
                icon={<TabletSmartphone width={30} height={30} color="white" />}
                title="Task Tracker"
                button="See Your Homework"
                description="Place where you can manage your task"
              />
              <MainCard
                icon={<Calendar1 width={30} height={30} color="white" />}
                title="Event Tracker"
                button="See Your Schedule"
                description="Place where you can manage your date"
              />
            </div>
          </div>
          <div className="w-full ">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
              <path
                fill="#222831"
                fillOpacity="1"
                d="M0,256L48,218.7C96,181,192,107,288,112C384,117,480,203,576,224C672,245,768,203,864,165.3C960,128,1056,96,1152,90.7C1248,85,1344,107,1392,117.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              ></path>
            </svg>
            <div className="h-fit w-screen flex justify-between gap-10 px-15 bg-[#222831]">
              <div className="flex flex-col text-white  gap-10 w-full h-full">
                <motion.h1
                  className="text-6xl font-semibold"
                  whileInView={{
                    rotateZ: -1,
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 10,
                      bounce: 100,
                      delay: 2
                    },
                  }}
                  whileHover={{}}
                >
                  What is Ngatur all about?
                </motion.h1>
                <p className="w-3/4 text-lg">
                  Ngatur Lorem ipsum dolor, sit amet consectetur adipisicing
                  elit. Quidem repellat qui quo dolor eveniet, consequuntur est
                  laborum suscipit quas, rem, soluta excepturi perspiciatis
                  ratione non ut distinctio fugit deserunt odio! is Lorem ipsum
                  dolor sit amet consectetur adipisicing elit. Laudantium iusto
                  magni quis nesciunt, sunt velit?
                </p>
              </div>
              <Image
                src={task}
                alt="Management picture"
                className="w-1/2 rounded-full border-4 border-[#471396] h-full object-center object-cover"
              />
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
              <path
                fill="#222831"
                fillOpacity="1"
                d="M0,224L48,213.3C96,203,192,181,288,144C384,107,480,53,576,64C672,75,768,149,864,154.7C960,160,1056,96,1152,69.3C1248,43,1344,53,1392,58.7L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
              ></path>
            </svg>
          </div>
        </div>
      </AuthGuard>
    </>
  );
}
