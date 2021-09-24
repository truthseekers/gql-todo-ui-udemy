import "./App.css";
import Header from "./components/Header";
import AuthenticatedApp from "./AuthenticatedApp";
import { Switch, Route } from "react-router-dom";
import Signup from "./screens/Signup";
import UnauthenticatedApp from "./screens/UnauthenticatedApp";
import Login from "./screens/Login";
import { useCurrentUser } from "./utils/hooks";

function App() {
  // const { currentuser } = useAuth();
  // const currentUser = false;
  const { currentUser } = useCurrentUser();

  console.log("currentUser: ", currentUser);

  return (
    <div>
      <Header />
      {currentUser ? (
        <AuthenticatedApp />
      ) : (
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/">
            <UnauthenticatedApp />
          </Route>
        </Switch>
      )}
    </div>
  );
}

export default App;
