import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import {
  Container,
  Box,
  Button,
  TextField,
  Radio,
  FormControlLabel,
} from "@material-ui/core";
import Todos from "../components/Todos";
import { NEW_TODO } from "../graphql/mutations";
import { TODOS_QUERY } from "../graphql/queries";

function Dashboard() {
  const [takeStatus, setTakeStatus] = useState("incomplete");
  const [createTodo, { error }] = useMutation(NEW_TODO, {
    refetchQueries: [
      {
        query: TODOS_QUERY,
        variables: {
          takeStatus: "incomplete",
        },
      },
      {
        query: TODOS_QUERY,
        variables: {
          takeStatus: "complete",
        },
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
    setTodoText("");
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
        <FormControlLabel
          control={
            <Radio
              checked={takeStatus === "complete"}
              onChange={() => setTakeStatus("complete")}
              color="primary"
              name="complete"
            />
          }
          label="complete"
        />
        <FormControlLabel
          control={
            <Radio
              checked={takeStatus === "incomplete"}
              onChange={() => setTakeStatus("incomplete")}
              color="primary"
              name="incomplete"
            />
          }
          label="Incomplete"
        />
        <Button fullWidth type="submit" variant="contained" color="primary">
          Add todo
        </Button>
      </form>
      <Box align="center">
        <Todos takeStatus={takeStatus} />
      </Box>
    </Container>
  );
}
export default Dashboard;
