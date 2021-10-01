import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import {
  createHttpLink,
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { AuthProvider } from "./context/AuthContext";

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
  credentials: "include",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          filteredTodos: (existing, { keyArgs, readField }) => {
            const todos = readField("todos");
            console.log("completeStatus: ", completeStatus());
            console.log("Todos from filteredTodos client query: ", todos);
            console.log("filter: ", filter());
            let myFilteredTodos = todos.todoItems.filter((todo) => {
              const nameOfTodo = readField("name", todo);
              const statusOfTodo = readField("isComplete", todo);
              console.log("name of this todo: ", nameOfTodo);

              if (statusOfTodo !== completeStatus()) {
                return;
              }

              return nameOfTodo.toLowerCase().includes(filter().toLowerCase());
            });

            return {
              count: myFilteredTodos.length,
              todoItems: myFilteredTodos.slice(skipCount(), skipCount() + 5),
            };
          },
        },
      },
    },
  }),
});

export const filter = client.cache.makeVar("");
export const completeStatus = client.cache.makeVar(false);
export const skipCount = client.cache.makeVar(0);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
