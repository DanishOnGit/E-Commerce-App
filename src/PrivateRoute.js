import { useAuth } from "./Contexts";
import { Route, Navigate } from "react-router-dom";

export function PrivateRoute({ path, element }) {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? (
    <Route path={path} element={element} />
  ) : (
    <Navigate state={{ from: path }} replace to="/login" />
  );
}
