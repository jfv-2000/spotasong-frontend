import { CircularProgress } from "@mui/material";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography/Typography";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { HiHeart } from "react-icons/hi";
import { RxCross1, RxPause, RxPlay } from "react-icons/rx";
import { SlSocialSpotify } from "react-icons/sl";
import { useStopwatch } from "react-timer-hook";
import useAudio from "../useAudio";
import "./MusicPlayer.scss";
import CrossfadeImage from "react-crossfade-image";

export default function MusicPlayer({
  songs,
  songAdded,
  index,
  setIndex,
}: {
  songs: any[];
  songAdded: () => void;
  index: number;
  setIndex: Dispatch<SetStateAction<number>>;
}) {
  const { seconds, start, pause, reset } = useStopwatch({ autoStart: false });

  function songRefused() {
    if (songs.length !== 0 && songs.length !== index + 1) {
      setIndex((prev) => prev + 1);
    }
  }

  function pauseAudio() {
    pause();
    toggle();
  }

  function playAudio() {
    start();
    toggle();
  }

  useEffect(() => {
    setIndex(0);
  }, [songs]);

  const [playing, toggle, setAudio] = useAudio("");

  useEffect(() => {
    if (songs.length !== 0) {
      setAudio(new Audio(songs[index].preview_url));
      reset();
      pause();
    }
  }, [index, songs]);

  let musicPlayerElement = null;
  if (songs.length === 0) {
    musicPlayerElement = (
      <>
        <Typography variant="h4" color="white" gutterBottom>
          Fetching Songs...
        </Typography>
        <CircularProgress size={100} thickness={4} />
      </>
    );
  } else if (songs.length === index + 1) {
    musicPlayerElement = (
      <Typography
        variant="h4"
        color="white"
        gutterBottom
        style={{ padding: "50px" }}
      >
        You don't have any more songs, please select another album
      </Typography>
    );
  } else {
    musicPlayerElement = (
      <>
        <CrossfadeImage
          className="song-cover"
          src={songs[index].album.images[0].url}
        />
        <div className="song-information">
          <div style={{ flex: 4 }}>
            <Typography variant="h4" color="white">
              {songs[index].name}
            </Typography>
            <Typography variant="body1" color="white">
              {songs[index].artists.map(
                ({ name }: { name: string }, i: number) => {
                  return [i > 0 && ", ", name];
                }
              )}
            </Typography>
          </div>
          <SlSocialSpotify
            className="spotify-link"
            style={{ flex: 1 }}
            onClick={() => {
              window.open(
                songs[index].external_urls.spotify,
                "_blank",
                "noreferrer"
              );
            }}
          />
        </div>
        <Slider value={seconds} className="slider" />
        <div className="controls">
          <RxCross1
            className="control-buttons"
            color="#eb4034"
            onClick={songRefused}
          />
          {playing ? (
            <RxPause className="play-button" onClick={pauseAudio} />
          ) : (
            <RxPlay className="play-button" onClick={playAudio} />
          )}
          <HiHeart
            className="control-buttons"
            color="#1DB954"
            onClick={songAdded}
          />
        </div>
      </>
    );
  }

  return <div className="music-player">{musicPlayerElement}</div>;
}
