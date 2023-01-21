import "./App.scss";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme";
import { Box, Button, FormControl, FormHelperText, MenuItem, Select } from "@mui/material";
import { BsSpotify } from "react-icons/bs";
import Bar from "./components/Bar";
import Sidebar from "./components/Sidebar";
import SignIn from "./pages/SignIn";

function App() {
  return (
    <ThemeProvider theme={theme}>
        {/* <SignIn /> */}
        <Sidebar/>
    </ThemeProvider>
  );
}

export default App;
