import Avatar from "@mui/material/Avatar";

export default function Logo(props: { width: number; height: number }) {
  return (
    <Avatar
      alt="Cindy Baker"
      sx={{ ...props }}
      src="https://i.imgur.com/4md1ReN.png"
    />
  );
}
