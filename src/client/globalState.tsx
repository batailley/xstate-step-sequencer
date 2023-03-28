import React, { createContext } from 'react';
import { useInterpret } from '@xstate/react';
import { tickerMachine } from './tickerMachine';

export const GlobalStateContext = createContext({});

export const GlobalStateProvider = (props) => {
  const tickerService = useInterpret(tickerMachine);

  return (
    <GlobalStateContext.Provider value={{ tickerService }}>
      {props.children}
    </GlobalStateContext.Provider>
  );
};