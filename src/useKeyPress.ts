import React, { useState } from "react";

function useKeyPress(targetKey1: string, targetKey2: string, call: () => void) {
  const [keyPressed, setKeyPressed] = useState(false);

  const downHandler = ({ key }: any) => {
    if (key === targetKey1 || key === targetKey2) call;
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
