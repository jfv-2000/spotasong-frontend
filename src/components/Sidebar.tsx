import { Box, Divider, Switch, Typography } from "@mui/material";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { BiCameraHome } from "react-icons/bi";
import { RiCheckFill, RiFilter2Fill, RiPlayListFill } from "react-icons/ri";
import "./Sidebar.scss";
export default function Sidebar({
  user,
  setToAdd,
  songs,
  setSongs,
  checked,
  handleToggleCamera,
  handlePlaylistChange,
}: {
  user: boolean;
  songs: any[];
  setSongs: Dispatch<SetStateAction<never[]>>;
  setToAdd: Dispatch<SetStateAction<string>>;
  checked: boolean;
  handleToggleCamera: (event: ChangeEvent<HTMLInputElement>) => void;
  handlePlaylistChange: Dispatch<SetStateAction<string>>;
}) {
  const [playlists, setPlaylists] = useState([]);
  const [outputPlaylist, setOutputPlaylist] = useState(null);
  const [inputPlaylist, setInputPlaylist] = useState(null);

  async function handleOutputPlaylist(e: any, id: string) {
    if (e.target.outerText !== outputPlaylist) {
      setOutputPlaylist(e.target.outerText);
      setToAdd(id);
    }
  }

  async function handleInputPlaylist(e: any, id: string) {
    if (e.target.outerText !== inputPlaylist) {
      setSongs([]);
      setInputPlaylist(e.target.outerText);
      handlePlaylistChange(id);
      const response = await fetch(
        "https://spot-a-song-service.onrender.com/getRecByPlaylist/" + id
      );
      setSongs((await response.json()).allRecs);
    }
  }

  useEffect(() => {
    if (user) {
      (async function () {
        const response = await fetch(
          "https://spot-a-song-service.onrender.com/getUserPlaylists"
        );
        const fetchedPlaylists = await response.json();
        setPlaylists(fetchedPlaylists);
        setOutputPlaylist(fetchedPlaylists[0].name);
        setInputPlaylist(fetchedPlaylists[0].name);
        setToAdd(fetchedPlaylists[0].id);
        handleInputPlaylist(
          { target: { outerText: fetchedPlaylists[0].name } },
          fetchedPlaylists[0].id
        );
      })();
    }
  }, [user]);

  return (
    <Box className="sidebar_menu">
      <Box className="sidebar_header">
        <Box className="sidebar_title">
          <img src="https://i.imgur.com/4md1ReN.png" className="sidebar_logo" />
          <Typography className="sidebar_name">Spot-A-Song</Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <BiCameraHome color="white" size={20} />
          <Switch
            defaultChecked
            checked={checked}
            onChange={handleToggleCamera}
          />
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
                onClick={(e) => handleOutputPlaylist(e, id)}
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
                onClick={(e) => handleInputPlaylist(e, id)}
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
