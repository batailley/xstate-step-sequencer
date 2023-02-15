import React from "react";
import { Step } from './Step'

export const Row = ({ rowSequence = [], rowIndex=0, playingStep = 0, rowSound = '' }: { rowSequence: boolean[], rowIndex: number, playingStep: number, rowSound?: string }) => {
  return (
    <div className="flex flex-row">
    {rowSequence.map((activated: boolean, index: number) => (
      <Step
        key={`r${index}`}
        playing={!!(playingStep === index)}
        position={index}
        row={rowIndex}
        selectedToPlay={activated}
      />
      ))}
    </div>)
};