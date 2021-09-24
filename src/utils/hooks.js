import { LOGIN_MUTATION } from "../graphql/mutations";
import { ME } from "../graphql/queries";
import { useMutation, useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";

function useLoginMutation() {
  let history = useHistory();
  const [doLogin, { error, loading, client }] = useMutation(LOGIN_MUTATION, {
    onCompleted(data) {
      console.log("data from onCompleted in useLoginMutation: ", data);
      history.push("/dashboard");
    },
    onError(error) {
      console.log("Error from useLoginMutation: ", error);
    },
  });
  return { doLogin, error: error?.message, loading };
}

function useCurrentUser() {
  const meQuery = useQuery(ME);

  if (meQuery.loading) {
    return { currentUser: "" };
  }

  if (meQuery.data?.me) {
    return {
      currentUser: meQuery.data.me,
    };
  } else {
    return { currentUser: "" };
  }
}

export { useLoginMutation, useCurrentUser };
