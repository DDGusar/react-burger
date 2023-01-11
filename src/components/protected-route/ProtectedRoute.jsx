import { Route, Redirect, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export const ProtectedRoute = ({ children, ...rest }) => {
  const user = useSelector((store) => store.user.user);
  const location = useLocation();
  return (
    <Route
      {...rest}
      render={() =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: `/login`,
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
