import { GET_USERS_QUERY, TODOS_QUERY } from "../graphql/queries";
import { useQuery } from "@apollo/client";
import { Container, Box } from "@material-ui/core";
import Todos from "../components/Todos";

function Dashboard() {
  // const { data, loading, error } = useQuery(GET_USERS_QUERY);

  return (
    <Container>
      <Box align="center">
        <Todos />
      </Box>
    </Container>
  );
}
export default Dashboard;
