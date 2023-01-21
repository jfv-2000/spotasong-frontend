import { Box, Divider, TextField, Typography } from "@mui/material";
import "../styles.scss";
import Avatar from "@mui/material/Avatar";

export default function Sidebar(){
    return (
    <Box className="sidebar_menu">
        <Box className="sidebar_header">
                <img src="/src/assets/logo.png" className="sidebar_logo"/>
                <Typography  className="sidebar_name" component="span">Spot-A-Song</Typography >
        </Box>
        <Box className="sidebar_body">
            helo
            <Divider className="sidebar_divider"/>
        </Box>
    </Box>)
}