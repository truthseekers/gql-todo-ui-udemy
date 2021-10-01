import React from "react";
import { TODOS_QUERY, CLIENT_SIDE_FILTERED_TODOS } from "../graphql/queries";
import { useQuery } from "@apollo/client";
import TodoItem from "../components/TodoItem";
import Pagination from "./Pagination";
import { skipCount } from "../index";

function Todos(props) {
  //   let todoRows = [];
  // COMMENT OUT AUTHENTICATION OF TODOS IN SERVER TO PREVENT ERROR.
  const [skip, setSkip] = React.useState(0);
  const { data, loading, error } = useQuery(CLIENT_SIDE_FILTERED_TODOS, {
    variables: {
      filter: props.dashInput,
      takeStatus: props.takeStatus,
      skip: skip,
      take: 5,
    },
    fetchPolicy: "network-only",
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  const todoRows = data.filteredTodos.todoItems.map((todo) => {
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

  const paginate = (pageNumber) => skipCount((pageNumber - 1) * 5);

  return (
    <div>
      <h2>
        {props.takeStatus === "incomplete" ? "Incomplete " : "Complete "} Todos:{" "}
        {data.filteredTodos.count}
      </h2>
      <ul>{todoRows}</ul>
      <Pagination
        todosPerPage={5}
        totalTodos={data.filteredTodos.count}
        paginate={paginate}
      />
    </div>
  );
}

export default Todos;
