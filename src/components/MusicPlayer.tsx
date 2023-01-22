import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography/Typography";
import { SlSocialSpotify } from "react-icons/sl";
import "./MusicPlayer.scss";
import { RxCross1, RxPlay } from "react-icons/rx";
import { HiHeart } from "react-icons/hi";
import { TfiHandPointLeft } from "react-icons/tfi";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  CircularProgress,
} from "@mui/material";

export default function MusicPlayer({
  user,
  songs,
  toAdd,
}: {
  user: boolean;
  songs: any[];
  toAdd: string;
}) {
  return (
    <div className="music-player">
      {songs.length !== 0 ? (
        <>
          <Typography variant="h4" color="white" gutterBottom>
            Fetching Songs...
          </Typography>
          <CircularProgress size={100} thickness={4} />
        </>
      ) : (
        <>
          <img
            className="song-cover"
            src="https://upload.wikimedia.org/wikipedia/en/1/1f/ItsCornCover.png"
          />
          <div className="song-information">
            <div>
              <Typography variant="h4" color="white">
                It's Corn
              </Typography>
              <Typography variant="body1" color="white">
                Tariq, Recess Therapy, The Gregory Brothers
              </Typography>
            </div>
            <SlSocialSpotify className="spotify-link" />
          </div>
          <Slider defaultValue={30} className="slider" />
          <div className="controls">
            <RxCross1 className="control-buttons" color="#eb4034" />
            <RxPlay className="play-button" />
            <HiHeart className="control-buttons" color="#1DB954" />
          </div>
        </>
      )}
    </div>
  );
}
