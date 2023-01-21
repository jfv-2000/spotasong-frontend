import Avatar from "@mui/material/Avatar";

export default function Logo(props: { width: number; height: number }) {
  return (
    <Avatar alt="Cindy Baker" sx={{ ...props }} src="/src/assets/logo.png" />
  );
}