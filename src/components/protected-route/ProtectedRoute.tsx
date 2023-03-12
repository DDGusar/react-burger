import { FC, FormEvent, ReactNode } from "react";
import { Route, Redirect, useLocation, RouteProps } from "react-router-dom";
import { useSelector } from "../../services/hooks/useSelector";
import * as selectors from "../../services/selectors";

export const ProtectedRoute: FC<RouteProps & { children?: ReactNode }> = ({
  children,
  ...rest
}) => {
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
