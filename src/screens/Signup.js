import React, { useState } from "react";
import { TextField, Button, Container, Typography } from "@material-ui/core";
import { GET_USERS_QUERY } from "../graphql/queries";
import { SIGNUP_MUTATION } from "../graphql/mutations";
import { useQuery, useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { useButtonStyles } from "../styles/loginStyles";
import { Alert } from "@material-ui/lab";

function Signup() {
  let history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
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

  const handleSubmit = (e) => {
    e.preventDefault();
    doSignup({
      variables: {
        email,
        firstName,
        password,
      },
    });
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
            label="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            margin="normal"
            type="password"
          />
          <Button
            classes={btnClasses}
            color="primary"
            fullWidth
            variant="contained"
            type="submit"
          >
            New User!
          </Button>
        </form>

        {signupError && <Alert severity="error">{signupError.message}</Alert>}
      </div>
    </Container>
  );
}

export default Signup;
