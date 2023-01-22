import Sidebar from "../components/Sidebar";
import MusicPlayer from "../components/MusicPlayer";
import "./MainPage.scss";

export default function MainPage({ user }: { user: boolean }) {
  return (
    <div className="main-page">
      <Sidebar user={user} />
      <MusicPlayer user={user} />
      <div className="lyrics">hi</div>
    </div>
  );
}
