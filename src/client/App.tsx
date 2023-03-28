import React from "react";
import Main from "./pages/Main";
import { GlobalStateContext } from "./globalState";

export const App = () => {
  return (
    <GlobalStateContext>
      <Main />
    </GlobalStateContext>
  );
};

export default App;
