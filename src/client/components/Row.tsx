import { useMachine } from "@xstate/react";
import React from "react";
import { Step } from "./Step";
import { tickerMachine } from "../tickerMachine";

export const Row = ({
  rowIndex = 0,
  rowSound = "",
}: {
  rowIndex: number;
  rowSound?: string;
}) => {
  const [state, send] = useMachine(tickerMachine);
  const { totalTicks, sequences, currentTick, playing } = state.context;

  return (
    <div className="flex flex-row">
      {sequences[rowIndex]?.map((activated: boolean, index: number) => (
        <Step
          key={`r${index}`}
          playing={!!(currentTick === index)}
          position={index}
          row={rowIndex}
          selectedToPlay={activated}
        />
      ))}
    </div>
  );
};
