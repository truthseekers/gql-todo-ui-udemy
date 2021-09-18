import { TODOS_QUERY } from "../graphql/queries";
import { useQuery } from "@apollo/client";
import TodoItem from "../components/TodoItem";

function Todos(props) {
  //   let todoRows = [];
  // COMMENT OUT AUTHENTICATION OF TODOS IN SERVER TO PREVENT ERROR.
  const { data, loading, error } = useQuery(TODOS_QUERY, {
    variables: {
      takeStatus: props.takeStatus,
    },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  const todoRows = data.todos.todoItems.map((todo) => {
    return (
      <TodoItem
        key={todo.id}
        id={todo.id}
        completed={todo.isComplete}
        task={todo.name}
      />
    );
  });

  console.log("data: ", data);

  return (
    <div>
      <ul>{todoRows}</ul>
    </div>
  );
}

export default Todos;
