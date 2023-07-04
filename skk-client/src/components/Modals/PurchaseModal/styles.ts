import { DialogContent, DialogTitle, Grid, Typography } from "@mui/material";
import { styled } from "@mui/system";
import EastIcon from "@mui/icons-material/East";
import SouthIcon from "@mui/icons-material/South";

export const ModalBody = styled(DialogContent)({
  display: "flex",
  flexDirection: "row",
  flex: 1,
  height: "100%",
  justifyContent: "center",
});

export const ModalTitle = styled(DialogTitle)({
  backgroundColor: "orange",
  textAlign: "center",
  fontWeight: "bold",
});

export const LeftContainer = styled(Grid)({
  flexDirection: "column",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  flex: 1,
});

export const RightContainer = styled(Grid)({
  flexDirection: "column",
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  textAlign: "left",
  flex: 1,
  marginTop: 40,
  marginLeft: 40,
});

export const DateContainer = styled(Grid)({
  display: "flex",
  flexDirection: "row",
  width: "100%",
  color: "#353535",
});

export const CustomEastIcon = styled(EastIcon)({
  marginInline: 20,
});

export const TextMarginTop10 = styled(Typography)({
  marginTop: 10,
});

export const CustomSouthIcon = styled(SouthIcon)({
  marginInline: 20,
});

export const RowData = styled(Grid)({
  display: "flex",
  flexDirection: "row",
  color: "#353535",
  justifyContent: "center",
  alignItems: "center",
});

export const PriceData = styled(RowData)({
  marginTop: 20,
});
