import DeleteIcon from "@material-ui/icons/Delete";
import { DELETE_TODO_ITEM } from "../graphql/mutations";
import { useMutation } from "@apollo/client";
import { TODOS_QUERY } from "../graphql/queries";

function TodoItem(props) {
  const [deleteTodo] = useMutation(DELETE_TODO_ITEM, {
    update(cache, { data: { deleteTodo } }) {
      console.log("deletetodo: ", deleteTodo);
      const { todos } = cache.readQuery({
        query: TODOS_QUERY,
        variables: {
          takeStatus: deleteTodo.isComplete ? "complete" : "incomplete",
        },
      });
      console.log("todos from todoItem delete: ", todos);

      let updatedListTodos = todos.todoItems.filter((elem) => {
        if (elem.id !== deleteTodo.id) {
          return elem;
        }
      });
      console.log("updatedList: ", updatedListTodos);

      cache.writeQuery({
        query: TODOS_QUERY,
        variables: {
          takeStatus: deleteTodo.isComplete ? "complete" : "incomplete",
        },
        data: {
          todos: {
            todoItems: updatedListTodos,
            count: updatedListTodos.length,
          },
        },
      });
    },
  });

  const deleteTodoItem = () => {
    deleteTodo({
      variables: { todo: props.id },
    });
  };

  return (
    <li key={props.id}>
      {props.task}{" "}
      <span>
        - <DeleteIcon onClick={deleteTodoItem} />
      </span>
    </li>
  );
}

export default TodoItem;
