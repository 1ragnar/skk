import React, { useCallback } from "react";
import { AppActionTypes, useAppContext } from "AppContext";
import { useSnackbar } from "notistack";
import { AuthLayout } from "views/Auth/AuthLayout";
import { Navigate } from "react-router";
import api from "api";

export interface ISignupProps {}

const Signup: React.FC<ISignupProps> = ({}) => {
  const [state, dispatch] = useAppContext();
  const { enqueueSnackbar } = useSnackbar();

  const handleSignup = useCallback(
    async (values: { email: string; password: string; username: string }) => {
      localStorage.removeItem("token");
      return new Promise(async (resolve, reject) => {
        try {
          const res = await api.auth.signup(values);

          if (res.data) {
            const { id, email, username, token } = res.data;
            const user = { id, email, username };
            resolve({ user, token });
          } else {
            reject({ message: "Something went wrong. Please try again..." });
          }
        } catch (error) {
          enqueueSnackbar("Something went wrong. Please try again...", {
            variant: "error",
          });
          reject({ message: "Something went wrong. Please try again..." });
        }
      });
    },
    []
  );

  const onSubmit = useCallback((values: any, actions: any) => {
    handleSignup(values)
      .then((res: any) => {
        const { user, token } = res;
        dispatch({
          type: AppActionTypes.SIGNUP,
          payload: { user, token: token },
        });
        dispatch({
          type: AppActionTypes.SET_USER,
          payload: { user },
        });
      })
      .catch((error: any) => {
        enqueueSnackbar(error.message, {
          variant: "error",
        });
      })
      .finally(() => actions.setSubmitting(false));
  }, []);

  if (state.user) {
    return <Navigate to={"/"} />;
  }

  return (
    <AuthLayout
      type="signup"
      onSubmitPress={(values: any, actions: any) => onSubmit(values, actions)}
    />
  );
};

export { Signup };
