import React, { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import {
  CloseButton,
  LoadingText,
  ProcessPaymentRoot,
  SuccessText,
} from "./styles";

export interface IProcessPayment {
  onProcessingClose: () => void;
}

const ProcessPayment: React.FC<IProcessPayment> = ({ onProcessingClose }) => {
  const [processing, setProcessing] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Simulating payment validation delay
    setTimeout(() => {
      // Simulating payment validation success
      setSuccess(true);
      setProcessing(false);
    }, 3000);
  }, []);

  return (
    <ProcessPaymentRoot>
      {processing ? (
        <>
          <LoadingText variant="h6">Processing payment...</LoadingText>
          <CircularProgress />
        </>
      ) : (
        success && (
          <>
            <SuccessText variant="h6">
              Payment successful!
              <CheckIcon fontSize="large" />
            </SuccessText>
            <CloseButton
              variant="contained"
              color="primary"
              onClick={() => onProcessingClose()}
            >
              Close
            </CloseButton>
          </>
        )
      )}
    </ProcessPaymentRoot>
  );
};

export default ProcessPayment;
