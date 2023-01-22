import { Box, Divider, Switch, Typography } from "@mui/material";
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import { RiCheckFill, RiFilter2Fill, RiPlayListFill } from "react-icons/ri";
import "./Sidebar.scss";

export default function Sidebar({
  user,
  setToAdd,
  setSongs,
  checked,
  handleToggleCamera
}: {
  user: boolean;
  setSongs: Dispatch<SetStateAction<never[]>>;
  setToAdd: Dispatch<SetStateAction<string>>;
  checked: boolean;
  handleToggleCamera: (event: ChangeEvent<HTMLInputElement>) => void;
}) {
  const [playlists, setPlaylists] = useState([]);
  const [outputPlaylist, setOutputPlaylist] = useState(null);
  const [inputPlaylist, setInputPlaylist] = useState(null);

  async function handleOutputPlaylist(e: any) {
    // const response = await fetch("http://localhost:3000/getUserPlaylists");
    // setSongs([]);
    setOutputPlaylist(e.target.outerText);
    // setSongs(await response.json());
  }

  function handleInputPlaylist(e: any) {
    setInputPlaylist(e.target.outerText);
  }

  useEffect(() => {
    if (user) {
      (async function () {
        const response = await fetch("http://localhost:3000/getUserPlaylists");
        const fetchedPlaylists = await response.json();
        setPlaylists(fetchedPlaylists);
        console.log(fetchedPlaylists);
        setOutputPlaylist(fetchedPlaylists[0].name);
        setInputPlaylist(fetchedPlaylists[0].name);
        setToAdd(fetchedPlaylists[0].id);
      })();
    }
  }, []);

  return (
    <Box className="sidebar_menu">
      <Box className="sidebar_header">
        <Box className="sidebar_title">
          <img src="/src/assets/logo.png" className="sidebar_logo" />
          <Typography className="sidebar_name">Spot-A-Song</Typography>
        </Box>
        <Box>
          <Switch defaultChecked checked={checked} onChange={handleToggleCamera} />
        </Box>
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
            {playlists.map(({ name, id }) => (
              <Box
                className="options"
                onClick={handleOutputPlaylist}
                key={`output_playlist_${name}`}
              >
                <Typography
                  className={
                    name === outputPlaylist
                      ? "selected_options"
                      : "not_selected_options"
                  }
                >
                  {name}
                </Typography>
                {name === outputPlaylist ? <RiCheckFill color="white" /> : null}
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
            {playlists.map(({ name, id }) => (
              <Box
                className="options"
                onClick={handleInputPlaylist}
                key={`output_playlist_${name}`}
              >
                <Typography
                  className={
                    name === inputPlaylist
                      ? "selected_options"
                      : "not_selected_options"
                  }
                >
                  {name}
                </Typography>
                {name === inputPlaylist ? <RiCheckFill color="white" /> : null}
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
