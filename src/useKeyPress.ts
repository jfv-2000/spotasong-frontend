import React, { useState } from "react";

function useKeyPress(targetKey1: string, targetKey2: string) {
  const [keyPressed, setKeyPressed] = useState(false);

  const downHandler = ({ key }: any) => {
    console.log(key);
    if (key === targetKey1 || key === targetKey2) console.log("true");
  };

  React.useEffect(() => {
    window.addEventListener("keydown", downHandler);

    return () => {
      window.removeEventListener("keydown", downHandler);
    };
  }, []);

  return keyPressed;
}

export default useKeyPress;
