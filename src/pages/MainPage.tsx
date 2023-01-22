import Sidebar from "../components/Sidebar";
import MusicPlayer from "../components/MusicPlayer";
import "./MainPage.scss";
import Webcam from "react-webcam";
import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";

export default function MainPage({}) {
  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = useState("");
  function getEmotion(){
    capture();
    console.log(imgSrc)
    axios.post(`http://localhost:3000/emotions`, {imgSrc})
    .then(res => {
      console.log(res)
    })
  }

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    console.log(imgSrc)
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
      {/* <Sidebar />
      <MusicPlayer /> */}
      <div className="lyrics">hi</div>
      <Webcam mirrored audio={false} screenshotFormat="image/jpeg" ref={webcamRef}/>
      <button onClick={getEmotion}>Capture photo</button>

      {imgSrc && (
        <img
          src={imgSrc}
        />
      )}
    </div>
  );
}
