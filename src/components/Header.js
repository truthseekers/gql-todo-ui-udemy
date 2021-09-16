import { AppBar, Toolbar, MenuItem } from "@material-ui/core";
import { useHistory } from "react-router-dom";

function Header() {
  let history = useHistory();
  return (
    <div>
      <AppBar position="sticky">
        <Toolbar>
          <MenuItem onClick={() => history.pushState("/")}>Home</MenuItem>
          <MenuItem onClick={() => history.pushState("/login")}>Login</MenuItem>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
