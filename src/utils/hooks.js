import { LOGIN_MUTATION } from "../graphql/mutations";
import { useMutation } from "@apollo/client";
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

export { useLoginMutation };
