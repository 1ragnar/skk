import { Button, Grid, Modal, TextField, Typography } from "@mui/material";
import { styled } from "@mui/system";

export const CardTextField = styled(TextField)({
  marginTop: 10,
});

export const SubmitButton = styled(Button)({
  marginTop: 15,
});

export const ModalBody = styled("div")({
  backgroundColor: "white",
  padding: 20,
});

export const CardModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const ProcessPaymentRoot = styled("div")({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center",
  padding: 20,
});

export const LoadingText = styled(Typography)({
  marginBottom: 10,
  textAlign: "center",
});

export const SuccessText = styled(Typography)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: 10,
  color: "blue",
  textAlign: "center",
});

export const CloseButton = styled(Button)({
  marginTop: 20,
});

export const FormContainer = styled(Grid)({
  margin: 20,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "20vh",
});
