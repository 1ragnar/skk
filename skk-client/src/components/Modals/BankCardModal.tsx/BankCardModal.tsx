import React from "react";
import { Typography } from "@mui/material";
import ProcessPayment from "./ProcessPayment";
import { CardModal, CardTextField, ModalBody, SubmitButton } from "./styles";
import { Formik } from "formik";
import * as Yup from "yup";

export type IBankCardModalProps = {
  isVisible: boolean;
  onClose: () => void;
  onSubmitPress: (cardData: ICardData, actions: any) => void;
  isProcessingPayment: boolean;
};

export interface ICardData {
  number: string;
  expiryDate: string;
  cvv: string;
}

const BankCardModal: React.FC<IBankCardModalProps> = ({
  isVisible,
  onClose,
  onSubmitPress,
  isProcessingPayment,
}) => {
  return (
    <CardModal open={isVisible} onClose={onClose}>
      <ModalBody>
        <Typography variant="h5" gutterBottom textAlign={"center"}>
          {isProcessingPayment ? "Processing payment" : "Bank card information"}
        </Typography>
        {isProcessingPayment ? (
          <ProcessPayment
            onProcessingClose={() => {
              onClose();
            }}
          />
        ) : (
          <Formik
            validationSchema={bankCardValidationSchema}
            initialValues={{ number: "", expiryDate: "", cvv: "" }}
            onSubmit={(
              values: { number: string; expiryDate: string; cvv: string },
              actions: any
            ) => {
              onSubmitPress(values, actions);
            }}
          >
            {({
              handleSubmit,
              handleChange,
              errors,
              values,
              setFieldValue,
              isSubmitting,
              touched,
              setSubmitting,
            }) => (
              <div>
                <CardTextField
                  label="Card Number"
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="number"
                  name="number"
                  autoComplete="number"
                  autoFocus
                  error={touched.number && errors.number ? true : false}
                  value={values.number}
                  onChange={(e) => setFieldValue("number", e.target.value)}
                  helperText={touched.number && errors.number}
                />
                <CardTextField
                  label="Expiry date"
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="expiryDate"
                  name="expiryDate"
                  autoComplete="expiryDate"
                  autoFocus
                  error={touched.expiryDate && errors.expiryDate ? true : false}
                  value={values.expiryDate}
                  onChange={(e) => setFieldValue("expiryDate", e.target.value)}
                  helperText={touched.expiryDate && errors.expiryDate}
                />
                <CardTextField
                  label="CVV"
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="cvv"
                  name="cvv"
                  autoComplete="cvv"
                  autoFocus
                  error={touched.cvv && errors.cvv ? true : false}
                  value={values.cvv}
                  onChange={(e) => setFieldValue("cvv", e.target.value)}
                  helperText={touched.cvv && errors.cvv}
                />

                <SubmitButton
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    !isSubmitting && handleSubmit();
                  }}
                >
                  Submit
                </SubmitButton>
              </div>
            )}
          </Formik>
        )}
      </ModalBody>
    </CardModal>
  );
};

const bankCardValidationSchema = Yup.object({
  number: Yup.string()
    .required("This field is required.")
    .matches(/^\d{16}$/, "Card number must be 16 digits"),
  expiryDate: Yup.string().required("This field is required."),
  cvv: Yup.string()
    .required("This field is required.")
    .matches(/^\d{3}$/, "CVV must be 3 digits"),
});

export { BankCardModal };
