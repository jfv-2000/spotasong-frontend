import { Box } from "@mui/system";
import axios from "axios";
import React, { useState } from "react";
import Webcam from "react-webcam";
import HiddenWebcamImage from "../components/HiddenWebcamImage";
import MusicPlayer from "../components/MusicPlayer";
import Sidebar from "../components/Sidebar";
import "./MainPage.scss";

export default function MainPage({ user }: { user: boolean }) {
  const [songs, setSongs] = useState([]);
  const [toAdd, setToAdd] = useState("");
  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = useState("");
  const [checked, setChecked] = useState(true);
  const [event, setEvent] =
    useState<React.ChangeEvent<HTMLInputElement> | null>(null);

  function getEmotion() {
    capture();
    axios.post(`http://localhost:3000/emotions`, { imgSrc }).then((res) => {
      const yay = res.data.surprise || res.data.joy;
      if (yay) {
        console.log("Add song to playlist!?");
      } else {
        console.log("That was mid");
      }
      console.log(res.data);
    });
  }
  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef, setImgSrc]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     console.log('Logs every second');
  //     // capture();
  //   }, 1000);
  //   return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  // }, [])

  function handleToggleCamera(event: React.ChangeEvent<HTMLInputElement>) {
    setChecked(event.target.checked);
    setEvent(event);

    console.log("toggleOn", event.target.checked);
  }

  return (
    <div className="main-page">
      <Sidebar
        user={user}
        songs={songs}
        setSongs={setSongs}
        setToAdd={setToAdd}
        checked={checked}
        handleToggleCamera={handleToggleCamera}
      />
      <MusicPlayer user={user} songs={songs} toAdd={toAdd} />
      {checked ? (
        <Box hidden={true}>
          <HiddenWebcamImage />
          <Webcam
            mirrored
            audio={false}
            screenshotFormat="image/jpeg"
            ref={webcamRef}
          />
          <button onClick={getEmotion}>Capture photo</button>
          {imgSrc && <img src={imgSrc} />}
        </Box>
      ) : (
        <></>
      )}
    </div>
  );
}
