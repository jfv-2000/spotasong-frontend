import { ThemeProvider } from "@emotion/react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { useEffect, useState } from "react";
import "./App.scss";
import MainPage from "./pages/MainPage";
import SignIn from "./pages/SignIn";
import theme from "./theme";

function App() {
  const [user, setUser] = useState(false);

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

  return (
    <ThemeProvider theme={theme}>
      <div className="App">{user ? <MainPage user={user} /> : <SignIn />}</div>
    </ThemeProvider>
  );
}

export default App;
