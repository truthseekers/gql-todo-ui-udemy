import "./App.css";
import Header from "./components/Header";
import AuthenticatedApp from "./AuthenticatedApp";
import { Switch, Route } from "react-router-dom";
import Signup from "./screens/Signup";
import UnauthenticatedApp from "./screens/UnauthenticatedApp";

function App() {
  // const { currentuser } = useAuth();
  const currentUser = true;

  return (
    <div>
      <Header />
      {currentUser ? (
        <AuthenticatedApp />
      ) : (
        <Switch>
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
