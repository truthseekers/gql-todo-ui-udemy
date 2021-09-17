import { GET_USERS_QUERY, TODOS_QUERY } from "../graphql/queries";
import { useQuery } from "@apollo/client";

function Dashboard() {
  // const { data, loading, error } = useQuery(GET_USERS_QUERY);
  // COMMENT OUT AUTHENTICATION OF TODOS IN SERVER TO PREVENT ERROR.
  const { data, loading, error } = useQuery(TODOS_QUERY);

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log("data from graphql: ", data);

  return <div>Hey</div>;
}
export default Dashboard;
