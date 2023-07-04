import React, { useCallback } from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { AppActionTypes, useAppContext } from "AppContext";
import { AppBarContainer, CustomButton, NavigationButton } from "./styles";

export type ICustomAppBarProps = {};

const CustomAppBar: React.FC<ICustomAppBarProps> = ({}) => {
  const [state, dispatch] = useAppContext();

  const onLogout = useCallback(() => {
    dispatch({ type: AppActionTypes.LOGOUT });
  }, []);

  return (
    <AppBarContainer position="static" elevation={0}>
      <Toolbar sx={{ flexWrap: "wrap" }}>
        <Typography variant="h5" color="white" noWrap sx={{ flexGrow: 1 }}>
          SKK
        </Typography>
        <nav>
          <NavigationButton to="/">Home</NavigationButton>
          <NavigationButton to="/tickets">Your tickets</NavigationButton>
        </nav>

        <CustomButton variant="contained" onClick={() => onLogout()}>
          <Typography color={"black"}>Logout</Typography>
        </CustomButton>
      </Toolbar>
    </AppBarContainer>
  );
};

export { CustomAppBar };
