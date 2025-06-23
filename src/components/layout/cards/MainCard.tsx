import React from "react";
import InfoButton from "@/components/ui/buttons/InfoButton";
import { Button } from "@/components/ui/button";
import * as motion from "motion/react-client";

const MainCard = ({
  title = "Money Tracker",
  description = "Description",
  button = "Money Tracker",
  icon = <></>,
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.1, rotateZ: 1 }}
      whileTap={{ scale: 0.9 }}
      className="bg-[#222831] text-white rounded-lg flex gap-2 w-fit h-fit py-5 px-4 border-2 border-[#1A1A19]"
    >
      <div className="px-2">{icon && icon}</div>
      <div className="flex flex-col gap-3">
        <h1 className="text-xl font-semibold">{title}</h1>
        <p className="text-base font-normal w-75">{description}</p>
        <div className="flex gap-5 w-full">
          <Button>{button}</Button>
          <InfoButton />
        </div>
      </div>
    </motion.div>
  );
};

export default MainCard;
