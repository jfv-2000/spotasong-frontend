import { useState, useEffect } from "react";

export default function useAudio(url: string) {
  const [audio, setAudio] = useState(url);
  const [playing, setPlaying] = useState(true);

  const toggle = () => setPlaying((prev) => !prev);

  useEffect(() => {
    if (audio !== "") {
      playing ? audio.play() : audio.pause();
    }
  }, [playing, audio]);

  useEffect(() => {
    if (audio !== "") {
      audio.addEventListener("ended", () => setPlaying(false));
      return () => {
        audio.removeEventListener("ended", () => setPlaying(false));
      };
    }
  }, [audio]);

  return [playing, toggle, setAudio];
}
