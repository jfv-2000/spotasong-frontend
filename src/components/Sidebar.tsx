import {
  Box,
  Divider,
  Typography,
} from "@mui/material";
import "./Sidebar.scss";
import { RiPlayListFill, RiFilter2Fill, RiCheckFill } from "react-icons/ri";
import { MouseEventHandler, useState } from "react";

const outputPlaylists = ["kinky", "kelvin", "kitten", "king"];

export default function Sidebar() {
  const [outputPlaylist, setOutputPlaylist] = useState("kinky");
  const [inputPlaylist, setInputPlaylist] = useState("kinky");

  function handleOutputPlaylist(e: any) {
    setOutputPlaylist(e.target.outerText);
  }
  
  function handleInputPlaylist(e: any) {
    setInputPlaylist(e.target.outerText);
  }

  return (
    <Box className="sidebar_menu">
      <Box className="sidebar_header">
        <img src="/src/assets/logo.png" className="sidebar_logo" />
        <Typography className="sidebar_name">Spot-A-Song</Typography>
      </Box>
      <Box className="sidebar_body">
        <Box className="sidebar_section">
          <Box className="sidebar_section_title">
            <RiPlayListFill />
            <Typography className="sidebar_section_title_text">
              &ensp;Add to
            </Typography>
          </Box>
          <Divider className="sidebar_divider" sx={{ marginTop: "5px" }} />
          <Box className="sidebar_section_body">
            {outputPlaylists.map((playlist) => (
              <Box
                className="options"
                onClick={handleOutputPlaylist}
                key={`output_playlist_${playlist}`}
              >
                <Typography
                  className={
                    playlist === outputPlaylist
                      ? "selected_options"
                      : "not_selected_options"
                  }
                >
                  {playlist}
                </Typography>
                {playlist === outputPlaylist ? (
                  <RiCheckFill color="white" />
                ) : null}
              </Box>
            ))}
          </Box>
        </Box>
        <Box className="sidebar_section">
          <Box className="sidebar_section_title">
            <RiPlayListFill />
            <Typography className="sidebar_section_title_text">
              &ensp;Based on
            </Typography>
          </Box>
          <Divider className="sidebar_divider" sx={{ marginTop: "5px" }} />
          <Box className="sidebar_section_body">
            {outputPlaylists.map((playlist) => (
              <Box
                className="options"
                onClick={handleInputPlaylist}
                key={`output_playlist_${playlist}`}
              >
                <Typography
                  className={
                    playlist === inputPlaylist
                      ? "selected_options"
                      : "not_selected_options"
                  }
                >
                  {playlist}
                </Typography>
                {playlist === inputPlaylist ? (
                  <RiCheckFill color="white" />
                ) : null}
              </Box>
            ))}
          </Box>
        </Box>
        <Box className="sidebar_section">
          <Box className="sidebar_section_title">
            <RiFilter2Fill />
            <Typography className="sidebar_section_title_text">
              &ensp;Filters
            </Typography>
          </Box>
          <Divider className="sidebar_divider" sx={{ marginTop: "5px" }} />
        </Box>
      </Box>
    </Box>
  );
}
