import React, { useContext } from "react";
import { GlobalStateContext } from "../pages/Main";
import { useSelector } from "@xstate/react";
import { Step } from "./Step";

export const Row = ({ rowIndex = 0, rowSound = "", row =[], currentTick = 0 }: { currentTick: number, row: boolean[], rowIndex: number; rowSound?: string }) => {
  return (
    <div className="flex flex-row">
      {row.map((activated: boolean, index: number) => (
        <Step
          key={`r${index}`}
          playing={(currentTick === index)}
          position={index}
          row={rowIndex}
          selectedToPlay={activated}
        />
      ))}
    </div>
  );
};
