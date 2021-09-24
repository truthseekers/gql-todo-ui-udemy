import { AppBar, Toolbar, MenuItem } from "@material-ui/core";
import { useHistory, Link } from "react-router-dom";
import { useLogout, useCurrentUser } from "../utils/hooks";
import { useHeaderStyles } from "../styles/loginStyles";

function Header() {
  let history = useHistory();
  const { doLogout } = useLogout();
  const { currentUser } = useCurrentUser();
  const classes = useHeaderStyles();

  return (
    <div>
      <AppBar position="sticky">
        <Toolbar>
          <MenuItem onClick={() => history.push("/")}>Home</MenuItem>
          {currentUser ? (
            <>
              <MenuItem onClick={() => doLogout()}>Logout</MenuItem>
              <MenuItem>
                <Link className={classes.link} to="/dashboard">
                  Dashboard
                </Link>
              </MenuItem>
              <span>Welcome {currentUser.firstName}</span>
            </>
          ) : (
            <MenuItem onClick={() => history.push("/login")}>Login</MenuItem>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
