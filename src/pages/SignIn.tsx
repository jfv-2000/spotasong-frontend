import Logo from "../components/Logo";
import { BsSpotify } from "react-icons/bs";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import "./SignIn.scss";

export default function SignIn({}) {
  return (
    <div className="sign-in-container">
      <div className="logo-title-container">
        <Logo height={150} width={150} />
        <Typography variant="h2" className="title">
          Spot-A-Song
        </Typography>
      </div>
      <Button
        sx={{ padding: "20px 30px", borderRadius: "10px" }}
        variant="contained"
        size="large"
        startIcon={<BsSpotify />}
      >
        Log in with Spotify
      </Button>
    </div>
  );
}
