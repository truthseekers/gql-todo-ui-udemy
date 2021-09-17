import { gql } from "@apollo/client";

const GET_USERS_QUERY = gql`
  query {
    users {
      id
      firstName
    }
  }
`;

export { GET_USERS_QUERY };
