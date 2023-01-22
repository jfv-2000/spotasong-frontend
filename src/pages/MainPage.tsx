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

  function getEmotion() {
    capture();
    console.log(imgSrc);
    axios.post(`http://localhost:3000/emotions`, { imgSrc }).then((res) => {
      console.log(res);
    });
  }
  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    console.log(imgSrc);
  }, [webcamRef, setImgSrc]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     console.log('Logs every second');
  //     // capture();
  //   }, 1000);
  //   return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  // }, [])

  return (
    <div className="main-page">
      <Sidebar user={user} setSongs={setSongs} setToAdd={setToAdd} />
      <MusicPlayer user={user} songs={songs} toAdd={toAdd} />
      <HiddenWebcamImage />
      <div className="lyrics">hi</div>
      {/* <Webcam
        mirrored
        audio={false}
        screenshotFormat="image/jpeg"
        ref={webcamRef}
      />
      <button onClick={getEmotion}>Capture photo</button>

      {imgSrc && <img src={imgSrc} />} */}
    </div>
  );
}
