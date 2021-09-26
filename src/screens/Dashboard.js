import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import {
  Checkbox,
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
import { Alert } from "@material-ui/lab";

function Dashboard() {
  const [takeStatus, setTakeStatus] = useState("incomplete");
  const [isSearch, setIsSearch] = useState(false);
  const [createTodo, { error }] = useMutation(NEW_TODO, {
    update(cache, { data: { createTodo } }) {
      console.log("createTodo: ", createTodo);

      // const { todos } = cache.readQuery({
      //   query: TODOS_QUERY,
      //   variables: { takeStatus: "incomplete" },
      // });

      // cache.writeQuery({
      //   query: TODOS_QUERY,
      //   variables: { takeStatus: "incomplete" },
      //   data: {
      //     todos: {
      //       todoItems: [createTodo, ...todos.todoItems],
      //       count: [createTodo, ...todos.todoItems].length,
      //     },
      //   },
      // });
    },
    onError() {},

    // refetchQueries: [
    //   {
    //     query: TODOS_QUERY,
    //     variables: {
    //       takeStatus: "incomplete",
    //     },
    //   },
    //   {
    //     query: TODOS_QUERY,
    //     variables: {
    //       takeStatus: "complete",
    //     },
    //   },
    // ],
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
          label={isSearch ? "Search Todos" : "Add a todo"}
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
          variant="outlined"
          margin="normal"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={isSearch}
              onChange={() => setIsSearch(!isSearch)}
              color="primary"
              name="searchTodos"
            />
          }
          label="Search Todos"
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
        {!isSearch && (
          <Button fullWidth type="submit" variant="contained" color="primary">
            Add todo
          </Button>
        )}
      </form>
      <Box align="center">
        <Todos takeStatus={takeStatus} dashInput={isSearch ? todoText : ""} />
      </Box>
      {error && <Alert severity="error">{error?.message}</Alert>}
    </Container>
  );
}
export default Dashboard;
