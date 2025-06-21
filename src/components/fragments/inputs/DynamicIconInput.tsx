import React from "react";
import { User2Icon } from "lucide-react";

const DynamicIconInput = ({
  type = "text",
  placeholder = "Placeholder",
  icon= <></>,
  ...rest
}) => {
  return (
    <div className="flex gap-2 items-center border-2 border-[#A62C2C] transition-all duration-150 focus:shadow-sm focus:shadow-[#A62C2C] hover:shadow-sm hover:shadow-[#A62C2C] font-normal w-full focus:border-[#A62C2C] outline-none bg-white rounded-md px-1 h-10 text-sm">
      {icon || (
        <User2Icon width={30} height={30} className=" px-1" color="#A62C2C" />
      )}
      <input
        type={type}
        placeholder={placeholder}
        className="border-none h-full outline-none w-full"
        {...rest}
      />
    </div>
  );
};

export default DynamicIconInput;
