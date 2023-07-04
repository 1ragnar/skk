import React from "react";
import { Typography, Grid, TextField, Paper } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  FormBody,
  FormContainer,
  ImageContainer,
  LinkButton,
  Root,
  SubmitButton,
} from "./styles";

export interface IAuthLayoutProps {
  type: "login" | "signup";
  onSubmitPress: (values: any, actions: any) => void;
}

const AuthLayout: React.FC<IAuthLayoutProps> = ({ type, onSubmitPress }) => {
  return (
    <Root container>
      <ImageContainer item xs={false} sm={4} md={7} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Formik
          validationSchema={
            type === "login" ? loginValidationSchema : signupValidationSchema
          }
          initialValues={
            type === "login"
              ? { email: "", password: "" }
              : { email: "", password: "", username: "" }
          }
          onSubmit={(
            values: { email: string; password: string },
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
            <FormContainer>
              <Typography component="h1" variant="h5">
                {type === "login" ? "Login" : "Signup"}
              </Typography>
              <FormBody>
                {type === "signup" && (
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    value={values.username}
                    error={touched.username && errors.username ? true : false}
                    helperText={touched.username && errors.username}
                    onChange={(e: any) =>
                      setFieldValue("username", e.target.value.trim())
                    }
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    autoFocus
                  />
                )}
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  value={values.email}
                  error={touched.email && errors.email ? true : false}
                  helperText={touched.email && errors.email}
                  onChange={(e: any) =>
                    setFieldValue("email", e.target.value.trim())
                  }
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  onChange={handleChange("password")}
                  autoComplete="current-password"
                  error={touched.password && errors.password ? true : false}
                  helperText={touched.password && errors.password}
                />
                <SubmitButton
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    !isSubmitting && handleSubmit();
                  }}
                >
                  {type === "login" ? "Login" : "signup"}
                </SubmitButton>
              </FormBody>
              <LinkButton to={type === "login" ? "/signup" : "/login"}>
                {type === "login"
                  ? "Don't have an account? Sign Up"
                  : "Already have an account? Login"}
              </LinkButton>
            </FormContainer>
          )}
        </Formik>
      </Grid>
    </Root>
  );
};

const loginValidationSchema = Yup.object({
  email: Yup.string().required("This field is required."),
  password: Yup.string().required("This field is required."),
});

const signupValidationSchema = Yup.object({
  email: Yup.string().required("This field is required."),
  password: Yup.string().required("This field is required."),
  username: Yup.string().required("This field is required."),
});

export { AuthLayout };
