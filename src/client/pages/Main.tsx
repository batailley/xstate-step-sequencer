import React from "react";
import { Pod } from "../components/pod";
import { useAppContext } from "../Context";

const Main = () => {
  const { name, setName } = useAppContext();
  return (
    <div className="flex bg-white-100 font-sans items-center flex-col justify-between h-screen">
      <Pod
        playing={true}
        selectedToPlay={true}
        position={0}
      />
    </div>
  );
};

export default Main;
