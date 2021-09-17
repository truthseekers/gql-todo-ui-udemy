import { AppBar, Toolbar, MenuItem } from "@material-ui/core";
import { useHistory } from "react-router-dom";

function Header() {
  let history = useHistory();
  return (
    <div>
      <AppBar position="sticky">
        <Toolbar>
          <MenuItem onClick={() => history.push("/")}>Home</MenuItem>
          <MenuItem onClick={() => history.push("/login")}>Login</MenuItem>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
