import { ThemeProvider } from "@emotion/react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import axios from "axios";
import { useEffect, useState } from "react";
import "./App.scss";
import MainPage from "./pages/MainPage";
import SignIn from "./pages/SignIn";
import theme from "./theme";

function App() {
  const [user, setUser] = useState(false);
  const [top100Tracks, setTop100Tracks] = useState([]);

  useEffect(() => {
    (async function () {
      const searchParams = new URLSearchParams(document.location.search);
      const code = searchParams.get("code");
      if (code) {
        const response = await fetch(
          "https://spot-a-song-service.onrender.com/callback?code=" + code
        );
        setUser(true);
        const resTop100 = await fetch(
          "https://spot-a-song-service.onrender.com/getTop100"
        );
        setTop100Tracks(await resTop100.json());
      }
    })();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        {user ? (
          <MainPage user={user} top100Tracks={top100Tracks} />
        ) : (
          <SignIn />
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
