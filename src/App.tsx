import "./App.scss";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme";
import SignIn from "./pages/SignIn";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        {/* <SignIn /> */}
        <MainPage />
      </div>
    </ThemeProvider>
  );
}

export default App;
