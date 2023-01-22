import { useState } from "react";
import HiddenWebcamImage from "../components/HiddenWebcamImage";
import MusicPlayer from "../components/MusicPlayer";
import Sidebar from "../components/Sidebar";
import "./MainPage.scss";

export default function MainPage({ user }: { user: boolean }) {
  const [songs, setSongs] = useState([]);
  const [toAdd, setToAdd] = useState("");

  return (
    <div className="main-page">
      <Sidebar user={user} setSongs={setSongs} setToAdd={setToAdd} />
      <MusicPlayer user={user} songs={songs} toAdd={toAdd} />
      <HiddenWebcamImage />
      <div className="lyrics">hi</div>
    </div>
  );
}
