import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Container, Box, Button, TextField } from "@material-ui/core";
import Todos from "../components/Todos";
import { NEW_TODO } from "../graphql/mutations";
import { TODOS_QUERY } from "../graphql/queries";

function Dashboard() {
  const [createTodo, { error }] = useMutation(NEW_TODO, {
    refetchQueries: [
      {
        query: TODOS_QUERY,
      },
    ],
  });
  const [todoText, setTodoText] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    createTodo({
      variables: {
        newTodo: todoText,
        userId: "1",
        isComplete: false,
      },
    });
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Add a todo"
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
          variant="outlined"
          margin="normal"
        />
        <Button fullWidth type="submit" variant="contained" color="primary">
          Add todo
        </Button>
      </form>
      <Box align="center">
        <Todos />
      </Box>
    </Container>
  );
}
export default Dashboard;
