import { gql } from "@apollo/client";

const GET_USERS_QUERY = gql`
  query {
    users {
      id
      firstName
    }
  }
`;

const TODOS_QUERY = gql`
  query {
    todos {
      todoItems {
        id
        name
        isComplete
      }
      count
    }
  }
`;

export { GET_USERS_QUERY, TODOS_QUERY };
