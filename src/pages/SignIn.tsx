import Logo from "../components/Logo";
import { BsSpotify } from "react-icons/bs";
import { Box, Button, Modal } from "@mui/material";
import Typography from "@mui/material/Typography";
import "./SignIn.scss";

export default function SignIn({}) {
  async function signIn() {
    const response = await fetch("http://localhost:3000/");
    const link = (await response.json()).url;
    window.open(link, "_blank", "noreferrer");
  }

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
        onClick={signIn}
      >
        Log in with Spotify
      </Button>
    </div>
  );
}
