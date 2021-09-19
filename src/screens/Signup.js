import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { GET_USERS_QUERY } from "../graphql/queries";
import { SIGNUP_MUTATION } from "../graphql/mutations";
import { useQuery, useMutation } from "@apollo/client";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const { data, loading, error } = useQuery(GET_USERS_QUERY);
  const [doSignup] = useMutation(SIGNUP_MUTATION, {
    update(cache, { data: { signup } }) {
      console.log("test: ", signup);
      console.log("cache: ", cache);
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
  });

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
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          label="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined"
          margin="normal"
        />
        <TextField
          label="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          variant="outlined"
          margin="normal"
        />
        <TextField
          label="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="outlined"
          margin="normal"
        />
        <Button variant="contained" type="submit">
          New User!
        </Button>
      </form>
      Users:
      {data.users.map((user) => {
        return <li key={user.id}>{user.firstName}</li>;
      })}
    </div>
  );
}

export default Signup;
