import { Box } from "@mui/system";
import { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";

export default function HiddenWebcamImage({}) {
  const webcamRef = useRef<Webcam>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);

  const capture = useCallback(() => {
    if (webcamRef.current) {
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
    }
  }, [webcamRef, setImgSrc]);

  useEffect(() => {
    const interval = setInterval(() => {
      capture();
    }, 1000);
    return () => clearInterval(interval);
  }, [])

  return (
    <>
    <Box hidden={true}>
    <Webcam imageSmoothing={true} audio={false} mirrored={true} ref={webcamRef} screenshotFormat="image/jpeg"/>
    <button onClick={capture}>Capture photo</button>
    </Box>
    {imgSrc && (
      <img
        src={imgSrc}
      />
    )}
  </>
  );
}
