import { Box } from "@mui/system";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Webcam from "react-webcam";
import BubbleChart from "../components/BubbleChart";
import HiddenWebcamImage from "../components/HiddenWebcamImage";
import MusicPlayer from "../components/MusicPlayer";
import Sidebar from "../components/Sidebar";
import "./MainPage.scss";
import { AiOutlineDotChart } from "react-icons/ai";
import { Dialog, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  transformBubbleChartData,
  transformPlaylistBubbleChartData,
} from "../assets/util_functions";
import { RxColumnSpacing } from "react-icons/rx";

export default function MainPage({
  user,
  top100Tracks,
}: {
  user: boolean;
  top100Tracks: any[];
}) {
  const [songs, setSongs] = useState([]);
  const [toAdd, setToAdd] = useState("");
  const [currentPlaylist, setCurrentPlaylist] = useState("");
  const [playlistTopArtists, setPlaylistTopArtists] = useState([]);
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [tabValue, setTabValue] = React.useState("top-100");
  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = useState("");
  const [checked, setChecked] = useState(false);
  const [event, setEvent] =
    useState<React.ChangeEvent<HTMLInputElement> | null>(null);

  useEffect(() => {
    if (currentPlaylist !== "") {
      (async function () {
        const res = await fetch(
          `https://spot-a-song-service.onrender.com/getPlaylistTracks/${currentPlaylist}`
        );
        const stuff = await res.json();
        setPlaylistTopArtists(stuff);
      })();
    }
  }, [currentPlaylist]);
  const bcDataTop100Tracks = transformBubbleChartData(top100Tracks);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    if (checked) {
      const interval = setInterval(() => {
        // console.log("Logs every secs");
        getEmotion();
      }, 3000);
      return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    }
  }, [checked]);

  async function songAdded() {
    if (songs.length !== 0 && songs.length !== index + 1) {
      setIndex((prev) => prev + 1);
      const response = await fetch(
        "https://spot-a-song-service.onrender.com/addToPlaylist/" +
          toAdd +
          "/" +
          songs[index].uri
      );
    }
  }

  useEffect(() => {
    setIndex(0);
  }, [songs]);

  function getEmotion() {
    const imgSrc = webcamRef.current.getScreenshot();
    axios
      .post(`https://spot-a-song-service.onrender.com/emotions`, { imgSrc })
      .then((res) => {
        const yay = res.data.surprise || res.data.joy;
        if (yay) {
          songAdded();
          console.log("Song was added to playlist");
        } else {
          console.log("That was mid");
        }
        console.log(res.data);
      });
  }

  function handleToggleCamera(event: React.ChangeEvent<HTMLInputElement>) {
    setChecked(event.target.checked);
    setEvent(event);
  }

  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // the required distance between touchStart and touchEnd to be detected as a swipe
  const minSwipeDistance = 50;

  const onTouchStart = (e: any) => {
    setTouchEnd(null); // otherwise the swipe is fired even with usual touch events
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: any) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe || isRightSwipe)
      console.log("swipe", isLeftSwipe ? "left" : "right");
    // add your conditional logic here
  };

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };

  return (
    <div
      className="main-page"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <Sidebar
        handlePlaylistChange={setCurrentPlaylist}
        user={user}
        songs={songs}
        setSongs={setSongs}
        setToAdd={setToAdd}
        checked={checked}
        handleToggleCamera={handleToggleCamera}
      />
      <MusicPlayer
        songs={songs}
        songAdded={songAdded}
        index={index}
        setIndex={setIndex}
      />

      {checked && (
        <Box hidden={false} className="webcam_box">
          <Webcam
            className="webcam"
            mirrored
            audio={false}
            screenshotFormat="image/jpeg"
            ref={webcamRef}
          />
          <button hidden={true} onClick={getEmotion}>
            Capture photo
          </button>
          {imgSrc && <img src={imgSrc} />}
        </Box>
      )}
      <Box hidden={true}>
        <Webcam
          audio={false}
          height={720}
          screenshotFormat="image/jpeg"
          width={1280}
          videoConstraints={videoConstraints}
        >
          {({ getScreenshot }: { getScreenshot: any }) => (
            <button
              onClick={() => {
                const imageSrc = getScreenshot();
              }}
            >
              Capture photo
            </button>
          )}
        </Webcam>
      </Box>
      <AiOutlineDotChart
        className="open_chart_modal_button"
        size={50}
        onClick={handleOpen}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        className="modal"
        sx={{ minHeight: "600" }}
      >
        <Box className="modal_content">
          <TabContext value={tabValue}>
            <Box className="tab_labels">
              <TabList onChange={handleTabChange}>
                <Tab label="Your Top 50 Tracks'Artists" value="top-100" />
                <Tab
                  label="Top Artists of Selected Playlist"
                  value="playlist"
                />
              </TabList>
            </Box>
            <TabPanel value="top-100">
              <BubbleChart data={bcDataTop100Tracks} />
            </TabPanel>
            <TabPanel value="playlist">
              <BubbleChart
                data={transformPlaylistBubbleChartData(playlistTopArtists)}
              />
            </TabPanel>
          </TabContext>
        </Box>
      </Dialog>
    </div>
  );
}
