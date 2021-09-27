import React, { useState } from "react";
import { TextField, Button, Container, Typography } from "@material-ui/core";
import { GET_USERS_QUERY } from "../graphql/queries";
import { SIGNUP_MUTATION } from "../graphql/mutations";
import { useQuery, useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { useButtonStyles } from "../styles/loginStyles";
import { Alert } from "@material-ui/lab";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

function Signup() {
  let history = useHistory();
  const elements = useElements();
  const stripe = useStripe();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [isProcessing, setProcessingTo] = useState("");
  const [checkoutError, setCheckoutError] = useState("");
  const { data, loading, error } = useQuery(GET_USERS_QUERY);
  const btnClasses = useButtonStyles();

  const [doSignup, { error: signupError, client }] = useMutation(
    SIGNUP_MUTATION,
    {
      update(cache, { data: { signup } }) {
        client.resetStore();
        history.push("/dashboard");
        window.location.assign(window.location);
        const { users } = cache.readQuery({
          query: GET_USERS_QUERY,
        });

        cache.writeQuery({
          query: GET_USERS_QUERY,
          data: {
            users: [...users, signup],
          },
        });
      },
      onError() {},
    }
  );

  const cardElementOpts = {
    iconStyle: "solid",
    // styles: somestyles
    hidePostalCode: true,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("one");
    const billingDetails = {
      name: firstName,
      email: email,
      address: {
        city: e.target.city.value,
        line1: e.target.address.value,
        state: e.target.state.value,
        postal_code: e.target.zip.value,
      },
    };
    console.log("two");

    setProcessingTo(true);

    const cardElement = elements.getElement("card");

    const paymentMethodReq = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: billingDetails,
    });
    console.log("paymentMethod is: ", paymentMethodReq);

    if (paymentMethodReq.error) {
      setCheckoutError(paymentMethodReq.error.message);
      setProcessingTo(false);
      return;
    }

    doSignup({
      variables: {
        email,
        firstName,
        password,
        paymentMethod: paymentMethodReq.paymentMethod.id,
      },
    });
  };

  const handleCardDetailsChange = (ev) => {
    ev.error ? setCheckoutError(ev.error.message) : setCheckoutError();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container component="main" maxWidth="xs">
      <div>
        <Typography component="h1" variant="h3">
          Sign Up!
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            placeholder="185 Berry st. Suite 550"
            id="address"
            label="Address"
            margin="normal"
            name="address"
            required
            variant="outlined"
          />
          <TextField
            fullWidth
            placeholder="San Francisco"
            id="city"
            label="City"
            margin="normal"
            name="city"
            required
            variant="outlined"
          />
          <TextField
            fullWidth
            placeholder="Califoria"
            id="state"
            label="State"
            margin="normal"
            name="state"
            required
            variant="outlined"
          />
          <TextField
            fullWidth
            placeholder="94103"
            id="zip"
            label="Zip"
            margin="normal"
            name="zip"
            required
            variant="outlined"
          />
          <TextField
            fullWidth
            label="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            margin="normal"
            type="password"
          />
          <CardElement
            options={cardElementOpts}
            onChange={handleCardDetailsChange}
          />
          <Button
            classes={btnClasses}
            color="primary"
            fullWidth
            variant="contained"
            type="submit"
            disabled={isProcessing || !stripe}
          >
            Sign Up!
          </Button>
        </form>
        {checkoutError && <Alert severity="error">{checkoutError}</Alert>}
        {signupError && <Alert severity="error">{signupError.message}</Alert>}
      </div>
    </Container>
  );
}

export default Signup;
