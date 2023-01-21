import Sidebar from "../components/Sidebar";
import MusicPlayer from "../components/MusicPlayer";
import "./MainPage.scss";

export default function MainPage({}) {
  return (
    <div className="main-page">
      <Sidebar />
      <MusicPlayer />
      <div className="lyrics">hi</div>
    </div>
  );
}
