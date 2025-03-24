import { useSelector } from "react-redux";

const AuthenticatedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default AuthenticatedRoute;
