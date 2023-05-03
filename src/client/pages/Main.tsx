import React, { useContext, createContext } from "react";
import { useActor, useMachine } from "@xstate/react";
import { Row } from "../components/Row";
import { useInterpret } from "@xstate/react";
import { tickerMachine } from "../tickerMachine";
import { InterpreterFrom } from "xstate";

// @ts-ignore
export const GlobalStateContext = createContext({ tickerService: {} as InterpreterFrom<typeof tickerMachine> });

export const Main = () => {
  const globalServices = useContext(GlobalStateContext);
  const { tickerService } = globalServices;
  const [state, send, service] = useMachine(tickerMachine, { devTools: true });
  const { sequences, playing, currentTick, activated } = state.context;
  return (
    <GlobalStateContext.Provider value={{ tickerService }}>
      <div className="flex bg-white-100 font-sans items-center flex-col justify-between">
        <button onClick={() => (playing ? send("STOP") : send("PLAY"))}>{playing ? "STOP" : "PLAY"}</button>
        <button onClick={() => send("RESET")}>RESET</button>
        {sequences.map((row: boolean[], i: number) => (
          <>
            <Row currentTick={currentTick} row={row} activated={activated[i]} rowIndex={i} key={`row-${i}`} />
            <span>{}</span>
          </>
        ))}
      </div>
    </GlobalStateContext.Provider>
  );
};
