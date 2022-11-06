import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import suiLogo from "../assets/suiLogo.png";

const NavBar = () => {
  return (
    <AppBar
      position="static"
      style={{ backgroundColor: `white`, height: `60px` }}
    >
      <Toolbar style={{ display: `flex`, justifyContent: `space-between` }}>
        <Link
          to="/"
          style={{
            display: `flex`,
            flexDirection: `row`,
            alignItems: `center`,
            textDecoration: `none`,
          }}
        >
          <img src={suiLogo} style={{ height: `30px` }} alt="sui-logo" />
          <Typography color="skyblue">SUI</Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
