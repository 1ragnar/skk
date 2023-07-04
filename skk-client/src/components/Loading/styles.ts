import { Typography } from "@mui/material";
import { styled } from "@mui/system";

export const Root = styled("div")({
  display: "flex",
  height: 500,
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
  flexGrow: 1,
  flexDirection: "column",
});

export const LoadingText = styled(Typography)({
  marginTop: 20,
  textAlign: "center",
});
