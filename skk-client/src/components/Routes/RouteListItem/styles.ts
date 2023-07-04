import { Button, Grid, ListItem } from "@mui/material";
import { styled } from "@mui/system";

export const RouteItem = styled(ListItem)({
  border: "1px solid #ccc",
  borderRadius: 5,
  marginBottom: 6,
});

export const TimeAndLocationContainer = styled(Grid)({
  flexDirection: "column",
  textAlign: "center",
  flex: 1,
});

export const DurationContainer = styled(Grid)({
  flex: 2,
  flexDirection: "row",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const TimeAndLocation = styled("div")({
  flexDirection: "column",
  flex: 1,
  textAlign: "center",
});

export const Line = styled("div")({
  border: "none",
  height: 1,
  backgroundColor: "black",
  margin: "0 10px 0",
  flex: 2,
});

export const AvailableSeats = styled(Grid)({
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  flex: 1,
});

export const BuyButtonContainer = styled(Grid)({
  alignItems: "center",
  textAlign: "center",
  flex: 1,
  justifyContent: "flex-end",
  display: "flex",
});

export const BuyButton = styled(Button)({
  backgroundColor: "#007bff",
  color: "#fff",
  marginLeft: 6,
  minWidth: "150px",
});
