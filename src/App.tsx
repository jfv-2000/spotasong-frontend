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
  const [top100Tracks, setTop100Tracks] = useState([])
  useEffect(() => {
    (async function () {
      const searchParams = new URLSearchParams(document.location.search);
      const code = searchParams.get("code");
      if (code) {
        const response = await fetch(
          "http://localhost:3000/callback?code=" + code
        );
        setUser(true);
      }
    })();
  }, []);

  useEffect(() => {
    (async function(){
      const data = await axios.get("http://localhost:3000/getTop100")
      console.log(data.data)
    })

  }, [])

  return (
    <ThemeProvider theme={theme}>
      <div className="App">{user ? <MainPage user={user} /> : <SignIn />}</div>
    </ThemeProvider>
  );
}

export default App;
