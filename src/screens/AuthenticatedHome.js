import { useCurrentUser } from "../utils/hooks";

function AuthenticatedHome() {
  const { currentUser } = useCurrentUser();

  return (
    <div>
      Hi {currentUser.firstName}! Learn all the things you can do with our app
      here.
    </div>
  );
}

export default AuthenticatedHome;
