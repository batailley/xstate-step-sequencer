import React, { useContext } from 'react';
import { GlobalStateContext } from '../globalState';
import { useActor, useSelector } from '@xstate/react';
import { tickerMachine } from '../tickerMachine'

const Main = () => {
  //const [state, send] = useMachine(tickerMachine)
  //const { totalTicks, sequences, currentTick, playing } = state.context
  const globalServices = useContext(GlobalStateContext);
  console.log('state', globalServices)
  const [state, send] = useActor(globalServices.tickerService);
  const playing = 'STOP';
  const sequences = state.context.sequences;
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
