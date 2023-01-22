import HiddenWebcamImage from "../components/HiddenWebcamImage";
import MusicPlayer from "../components/MusicPlayer";
import Sidebar from "../components/Sidebar";
import "./MainPage.scss";

export default function MainPage({}) {
  return (
    <div className="main-page">
      <Sidebar />
      <MusicPlayer />
      <HiddenWebcamImage/>
      <div className="lyrics">hi</div>
    </div>
  );
}
