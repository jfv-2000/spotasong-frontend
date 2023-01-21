import "./App.scss";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme";
import { Box, Button } from "@mui/material";
import { BsSpotify } from "react-icons/bs";
import Bar from "./components/Bar";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        {/* <Bar /> */}
        {/* <Button
          className="login-button"
          variant="contained"
          startIcon={<BsSpotify />}
        >
          Log in with Spotify
        </Button> */}
        <Sidebar/>
      </div>
    </ThemeProvider>
  );
}

export default App;
