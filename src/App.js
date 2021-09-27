import "./App.css";
import Header from "./components/Header";
import AuthenticatedApp from "./AuthenticatedApp";
import { Switch, Route } from "react-router-dom";
import Signup from "./screens/Signup";
import UnauthenticatedApp from "./screens/UnauthenticatedApp";
import Login from "./screens/Login";
import { useAuth } from "./context/AuthContext";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

function App() {
  const { currentUser } = useAuth();

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
            <Elements stripe={stripePromise}>
              <Signup />
            </Elements>
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
