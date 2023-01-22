import HiddenWebcamImage from "../components/HiddenWebcamImage";
import MusicPlayer from "../components/MusicPlayer";
import Sidebar from "../components/Sidebar";
import "./MainPage.scss";

export default function MainPage({ user }: { user: boolean }) {
  return (
    <div className="main-page">
      <Sidebar user={user} />
      <MusicPlayer user={user} />
      <HiddenWebcamImage />
      <div className="lyrics">hi</div>
    </div>
  );
}
