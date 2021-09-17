import { TODOS_QUERY } from "../graphql/queries";
import { useQuery } from "@apollo/client";

function Todos() {
  let todoRows = [];
  // COMMENT OUT AUTHENTICATION OF TODOS IN SERVER TO PREVENT ERROR.
  const { data, loading, error } = useQuery(TODOS_QUERY);

  if (loading) {
    return <div>Loading...</div>;
  }

  data.todos.todoItems.map((todo) => {
    todoRows.push(<li>{todo.name}</li>);
  });

  console.log("data: ", data);

  return (
    <div>
      <ul>{todoRows}</ul>
    </div>
  );
}

export default Todos;
