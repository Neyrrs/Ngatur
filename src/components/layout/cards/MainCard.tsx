import React from "react";
import PrimaryButton from "@/components/ui/buttons/PrimaryLinkButton";
import InfoButton from "@/components/ui/buttons/InfoButton";

const MainCard = ({
  title = "Money Tracker",
  description = "Description",
  button = "Money Tracker",
  icon = <></>,
}) => {
  return (
    <div className="bg-white rounded-lg flex gap-2 w-fit h-fit py-5 px-4 border-2 border-[#1A1A19]">
      <div className="px-2">{icon && icon}</div>
      <div className="flex flex-col gap-3">
        <h1 className="text-xl font-semibold">{title}</h1>
        <p className="text-base font-normal w-75">{description}</p>
        <div className="flex gap-5 w-full">
          <PrimaryButton height="py-1" width="px-10" text={button}/>
          <InfoButton />
        </div>
      </div>
    </div>
  );
};

export default MainCard;
