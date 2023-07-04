import React from "react";
import { Navigate } from "react-router";
import { useAppContext } from "AppContext";
import { CustomAppBar } from "components/CustomAppBar/CustomAppBar";
import { Root } from "./styles";

interface IPrivateRoute {
  component: JSX.Element;
}

const PrivateRoute: React.FC<IPrivateRoute> = ({ component }) => {
  const [state] = useAppContext();

  if (!state.user) {
    return <Navigate to="/login" />;
  }

  return (
    <Root>
      <CustomAppBar /> {component}
    </Root>
  );
};

export { PrivateRoute };
