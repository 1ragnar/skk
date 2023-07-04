import logo from "../../assets/logo.png";
import { styled } from "@mui/system";
import { Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";

export const Root = styled(Grid)({
  height: "100vh",
});

export const ImageContainer = styled(Grid)({
  backgroundImage: `url(${logo})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
});

export const FormContainer = styled(Grid)({
  margin: 20,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "20vh",
});

export const FormBody = styled("form")({
  width: "100%",
  marginTop: 5,
});

export const SubmitButton = styled(Button)({ marginTop: 20, height: "5vh" });

export const LinkButton = styled(Link)({
  marginTop: 15,
});
