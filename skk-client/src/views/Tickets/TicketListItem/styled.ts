import { Card, CardContent, Divider, Grid } from "@mui/material";
import { styled } from "@mui/system";

export const CustomCard = styled(Card)({
  width: 500,
  margin: "auto",
  marginTop: 10,
});

export const Header = styled(Grid)({
  backgroundColor: "#1976d2",
  color: "white",
  padding: 10,
  textAlign: "center",
});

export const CustomDivider = styled(Divider)({
  margin: 10,
});

export const CustomCardContent = styled(CardContent)({
  padding: 10,
});
