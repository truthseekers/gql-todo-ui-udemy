import { gql } from "@apollo/client";

const NEW_TODO = gql`
  mutation createTodo($newTodo: String!, $userId: ID!, $isComplete: Boolean!) {
    createTodo(name: $newTodo, isComplete: $isComplete, userId: $userId) {
      id
      name
      isComplete
      userId
    }
  }
`;

const SIGNUP_MUTATION = gql`
  mutation signup($firstName: String!, $email: String!, $password: String!) {
    signup(firstName: $firstName, email: $email, password: $password) {
      id
      firstName
      email
    }
  }
`;

export { NEW_TODO, SIGNUP_MUTATION };
