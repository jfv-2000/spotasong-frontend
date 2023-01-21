import { Toolbar, IconButton, Typography, Button, AppBar } from "@mui/material";
import Logo from "./Logo";

export default function Bar({}) {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Logo width={40} height={40} />
      </Toolbar>
    </AppBar>
  );
}
