import { Route, Redirect, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import * as selectors from "../../services/selectors";

export const ProtectedRoute = ({ children, ...rest }) => {
  const user = useSelector(selectors.user);
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
