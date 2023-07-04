import { styled } from "@mui/system";
import { Button } from "@mui/material";

export const RootContainer = styled("div")({
  padding: 15,
  textAlign: "center",
  color: "orange",
  position: "relative",
  justifyContent: "space-between",
  alignItems: "center",
  flexDirection: "row",
  width: "100%",
  height: "auto",
  display: "flex",
  backgroundColor: "orange",
  borderRadius: "5px",
  marginTop: "10px",
});

export const FilterFieldsContainer = styled("div")({
  justifyContent: "space-between",
  flexWrap: "wrap",
  display: "flex",
  alignItems: "flex-end",
  width: "80%",
  height: "100%",
  flexDirection: "row",
});

export const FilterField = styled("div")({
  marginLeft: 10,
  width: "30%",
});

export const SearchButtonContainer = styled("div")({
  flexGrow: 1,
  justifyContent: "flex-end",
  display: "flex",
  alignItems: "center",
  width: "10%",
});

export const SearchButton = styled(Button)({
  minWidth: 150,
  position: "relative",
});
