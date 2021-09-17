import { AppBar, Toolbar, MenuItem } from "@material-ui/core";

function Header() {
  return (
    <div>
      <AppBar position="sticky">
        <Toolbar>
          <MenuItem>Home</MenuItem>
          <MenuItem>Login</MenuItem>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
