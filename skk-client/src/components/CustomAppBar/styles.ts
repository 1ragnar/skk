import { AppBar, Button } from "@mui/material";
import { styled } from "@mui/system";
import { NavLink } from "react-router-dom";

export const AppBarContainer = styled(AppBar)({
  paddingRight: 24,
  height: 60,
  background: "#57A8CC",
});

export const NavigationButton = styled(NavLink)({
  textDecoration: "none",
  padding: "10px 20px",
  backgroundColor: "#1976d2",
  borderRadius: "5px",
  marginRight: 20,
  maxHeight: 40,
  color: "black",
  "&.active": {
    color: "white",
    fontWeight: "bold",
  },
});

export const CustomButton = styled(Button)({
  textDecoration: "none",
  padding: "10px 20px",
  backgroundColor: "#1976d2",
  borderRadius: "5px",
  marginRight: 20,
  maxHeight: 40,
});
