import Dashboard from "./screens/Dashboard";
import AuthenticatedHome from "./screens/AuthenticatedHome";
import { Switch, Route } from "react-router-dom";

function AuthenticatedApp() {
  return (
    <Switch>
      <Route path="/dashboard">
        <Dashboard />
      </Route>
      <Route path="/">
        <AuthenticatedHome />
      </Route>
    </Switch>
  );
}

export default AuthenticatedApp;
