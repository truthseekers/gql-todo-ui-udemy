import React, { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import { DELETE_TODO_ITEM, UPDATE_TODO_ITEM } from "../graphql/mutations";
import { useMutation } from "@apollo/client";
import { TODOS_QUERY, CLIENT_SIDE_FILTERED_TODOS } from "../graphql/queries";
import { TextField } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";

function TodoItem(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [todoInput, setTodoInput] = useState(props.task);
  const [updateTodo] = useMutation(UPDATE_TODO_ITEM);
  const [deleteTodo] = useMutation(DELETE_TODO_ITEM, {
    update(cache, { data: { deleteTodo } }) {
      console.log("deletetodo: ", deleteTodo);
      const { todos } = cache.readQuery({
        query: CLIENT_SIDE_FILTERED_TODOS,
      });

      let updatedListTodos = todos.todoItems.filter((elem) => {
        if (elem.id !== deleteTodo.id) {
          return elem;
        }
      });

      cache.writeQuery({
        query: CLIENT_SIDE_FILTERED_TODOS,

        data: {
          todos: {
            todoItems: updatedListTodos,
            count: updatedListTodos.length,
          },
        },
      });
    },
  });

  const handleChange = () => {
    updateTodo({
      variables: {
        todo: props.id,
        isComplete: !props.completed,
        name: props.task,
      },
    });
  };

  const updateTodoItem = () => {
    updateTodo({
      variables: {
        todo: props.id,
        isComplete: props.completed,
        name: todoInput,
      },
    });
    setIsEditing(false);
  };

  const deleteTodoItem = () => {
    deleteTodo({
      variables: { todo: props.id },
    });
  };

  return (
    <>
      {!isEditing ? (
        <li key={props.id}>
          <input
            type="checkbox"
            onChange={handleChange}
            checked={props.completed}
          />
          <span onClick={() => setIsEditing(true)}>{props.task}</span>
          <span>
            - <DeleteIcon onClick={deleteTodoItem} />
          </span>
        </li>
      ) : (
        <li>
          <TextField
            autoFocus
            id="todo"
            label="Update todo"
            margin="normal"
            name="todo"
            onChange={(e) => setTodoInput(e.target.value)}
            variant="outlined"
            value={todoInput}
          />
          <CheckIcon
            htmlColor="#00e851"
            fontSize="large"
            onClick={updateTodoItem}
          />
          <CloseIcon
            htmlColor="red"
            fontSize="large"
            onClick={() => {
              setIsEditing(false);
              setTodoInput(props.task);
            }}
          />
        </li>
      )}
    </>
  );
}

export default TodoItem;
