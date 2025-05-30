import React from "react";
import { Info } from "lucide-react";

const InfoButton = ({onClick = () => {}}) => {
  return (
    <button
      className={`cursor-pointer`}
      onClick={onClick}
    >
      <Info width={25} height={25}/>
    </button>
  );
};

export default InfoButton;
