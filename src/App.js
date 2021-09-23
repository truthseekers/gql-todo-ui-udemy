import "./App.css";
import Header from "./components/Header";
import AuthenticatedApp from "./AuthenticatedApp";
import { Switch, Route } from "react-router-dom";
import Signup from "./screens/Signup";
import UnauthenticatedApp from "./screens/UnauthenticatedApp";
import Login from "./screens/Login";

function App() {
  // const { currentuser } = useAuth();
  const currentUser = false;

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
