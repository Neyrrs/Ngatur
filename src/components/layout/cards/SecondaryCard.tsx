import React from "react";

interface IsecondaryCard {
  count: number;
  title: string;
  description: string;
}

const SecondaryCard: React.FC<IsecondaryCard> = ({
  count = 0,
  title = "This Month",
  description = " Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum",
}) => {
  return (
    <div className="bg-secondary md:w-65 w-full h-40 rounded-md p-5 md:p-3 grid grid-cols-2 grid-rows-2 gap-3 border-2 border-primary">
      <div className="h-full items-center flex">
        <h1 className="text-4xl md:text-2xl font-semibold">{title}</h1>
      </div>
      <div className="h-full items-center justify-center flex">
        <p className="text-6xl md:text-5xl font-bold underline">{count}</p>
      </div>
      <div className="h-full items-center justify-center flex col-span-2">
        <p className="text-xl md:text-sm">{description}</p>
      </div>
    </div>
  );
};

export default SecondaryCard;
