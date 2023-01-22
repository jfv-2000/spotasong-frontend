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
  const { isRunning, seconds, start, pause, reset } = useStopwatch({
    autoStart: false,
  });
  const [audio, setAudio] = useState(null);

  function songRefused() {
    if (songs.length !== 0 && songs.length !== index + 1) {
      setIndex((prev) => prev + 1);
    }
  }

  useEffect(() => {
    if (audio) {
      audio.addEventListener("ended", audio.play());
      return () => {
        audio.removeEventListener("ended", audio.pause());
      };
    }
  }, [audio, songs]);

  function pauseAudio() {
    pause();
    audio.pause();
  }

  function playAudio() {
    start();
    audio.play();
  }

  useEffect(() => {
    if (songs.length !== 0) {
      reset();
      setAudio(new Audio(songs[index].preview_url));
    }
  }, [index]);

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
        <div className="song-cover">
          <CrossfadeImage src={songs[index].album.images[0].url} />
        </div>

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
          {isRunning ? (
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
