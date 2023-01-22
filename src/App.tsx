import { ThemeProvider } from "@emotion/react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { useEffect, useState } from "react";
import "./App.scss";
import MainPage from "./pages/MainPage";
import theme from "./theme";

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
