import React from "react";
import { Row } from "../components/Row";
import { useMachine } from '@xstate/react';
import { tickerMachine } from '../components/tickerMachine'

const Main = () => {
  const [state, send] = useMachine(tickerMachine)
  const { totalTicks, sequences, currentTick, playing } = state.context


  return (
    <div className="flex bg-white-100 font-sans items-center flex-col justify-between">
      <button onClick={() => playing ? send('STOP') : send('PLAY')} >
        {playing ? 'STOP' : 'PLAY'}
      </button>
      <button onClick={() => send('RESET')}>RESET</button>
      {sequences.map((row, i) => (<Row
        rowIndex={i}
        key={`row-${i}`}
      />))}
    </div>
  );
};

export default Main;
