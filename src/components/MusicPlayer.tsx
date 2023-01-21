import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography/Typography";
import { SlSocialSpotify } from "react-icons/sl";
import { Button } from "@mui/material";
import "./MusicPlayer.scss";
import { RxCross1, RxHeart, RxPlay } from "react-icons/rx";
import { HiHeart } from "react-icons/hi"

export default function MusicPlayer({}) {
  return (
    <div className="music-player">
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
    </div>
  );
}
