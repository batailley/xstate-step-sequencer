import React, { useContext } from "react";
import { GlobalStateContext } from "../pages/Main";
import { useSelector } from "@xstate/react";
import { Step } from "./Step";

export const Row = ({
  rowIndex = 0,
  rowSound = "",
  row = [],
  activated = [],
  currentTick = 0,
}: {
  currentTick: number;
  row: boolean[];
  activated: number[];
  rowIndex: number;
  rowSound?: string;
}) => {
  return (
    <div className="flex flex-row">
      {row.map((item, index: number) => (
        <Step
          key={`r${index}`}
          playing={currentTick === index}
          position={index}
          row={rowIndex}
          selectedToPlay={activated.includes(index)}
        />
      ))}
    </div>
  );
};
