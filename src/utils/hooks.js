import { LOGIN_MUTATION, LOGOUT_MUTATION } from "../graphql/mutations";
import { ME } from "../graphql/queries";
import { useMutation, useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";

function useLoginMutation() {
  let history = useHistory();
  const [doLogin, { error, loading, client }] = useMutation(LOGIN_MUTATION, {
    onCompleted(data) {
      client.resetStore();
      console.log("data from onCompleted in useLoginMutation: ", data);
      history.push("/dashboard");
      window.location.assign(window.location);
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

function useLogout() {
  let history = useHistory();
  const [doLogout, { client }] = useMutation(LOGOUT_MUTATION, {
    onCompleted() {
      client.resetStore();
      history.push("/");
      window.location.assign(window.location);
    },
  });
  return { doLogout };
}

export { useLoginMutation, useCurrentUser, useLogout };
