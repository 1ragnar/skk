import { Grid, Paper, Typography } from "@mui/material";
import { styled } from "@mui/system";
import SeatIcon from "@mui/icons-material/EventSeat";
import SeatSelectedIcon from "@mui/icons-material/EventSeatOutlined";

type CustomSelectedSeatIconProps = {
  is_available: boolean;
};

export const RootContainer = styled("div")({
  flexGrow: 1,
  padding: 10,
});

export const CustomSeatIcon = styled(SeatIcon)({
  fontSize: "2rem",
});

export const CustomSelectedSeatIcon = styled(
  SeatSelectedIcon
)<CustomSelectedSeatIconProps>(({ is_available }) => ({
  fontSize: "2rem",
  color: is_available ? "orange" : "red",
}));

export const TextMarginTop10 = styled(Typography)({
  marginTop: 10,
});

export const CustomPaper = styled(Paper)({
  padding: 10,
  textAlign: "center",
  color: "black",
  cursor: "pointer",
  width: 70,
  height: 50,
  justifyContent: "center",
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
});

export const FooterContainer = styled(Grid)({
  marginTop: 10,
  justifyContent: "space-between",
  alignItems: "flex-start",
  display: "flex",
  flexDirection: "column",
  width: "100%",
});

export const FooterRow = styled(Grid)({
  display: "flex",
  flexDirection: "row",
  width: "100%",
});
