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
  query todos($filter: String, $takeStatus: String, $skip: Int, $take: Int) {
    todos(filter: $filter, takeStatus: $takeStatus, skip: $skip, take: $take) {
      todoItems {
        id
        name
        isComplete
      }
      count
    }
  }
`;

const ME = gql`
  query {
    me {
      id
      email
      firstName
    }
  }
`;

export { GET_USERS_QUERY, TODOS_QUERY, ME };
