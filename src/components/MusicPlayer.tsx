import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography/Typography";
import { SlSocialSpotify } from "react-icons/sl";
import { Button } from "@mui/material";
import "./MusicPlayer.scss";
import { RxCross1, RxHeart, RxPlay } from "react-icons/rx";

export default function MusicPlayer({}) {
  return (
    <div className="music-player">
      <img
        className="song-cover"
        src="https://mathmonks.com/wp-content/uploads/2020/04/Square.jpg"
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
        <Button>
          <RxCross1 className="control-buttons" />
        </Button>
        <Button>
          <RxPlay className="control-buttons" />
        </Button>
        <Button>
          <RxHeart className="control-buttons" />
        </Button>
      </div>
    </div>
  );
}
