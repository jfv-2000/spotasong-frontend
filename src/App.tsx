import "./App.scss";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme";
import SignIn from "./pages/SignIn";
import MainPage from "./pages/MainPage";
import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(document.location.search);
    searchParams.get("code") && setUser(true);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">{user ? <MainPage /> : <SignIn />}</div>
    </ThemeProvider>
  );
}

export default App;
