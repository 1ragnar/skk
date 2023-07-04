import React, { useCallback } from "react";
import api from "api";
import { AppActionTypes, useAppContext } from "AppContext";
import { Navigate } from "react-router";
import { useSnackbar } from "notistack";
import { AuthLayout } from "views/Auth/AuthLayout";

export interface ILoginProps {}

const Login: React.FC<ILoginProps> = ({}) => {
  const [state, dispatch] = useAppContext();
  const { enqueueSnackbar } = useSnackbar();

  const handleLogin = useCallback(
    async (values: { email: string; password: string }) => {
      localStorage.removeItem("token");
      return new Promise(async (resolve, reject) => {
        try {
          const res = await api.auth.login(values.email, values.password);

          if (res.data) {
            const { user, token } = res.data;
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
    handleLogin(values)
      .then((res: any) => {
        const { user, token } = res;
        dispatch({
          type: AppActionTypes.LOGIN,
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
      type="login"
      onSubmitPress={(values, action) => onSubmit(values, action)}
    />
  );
};

export { Login };
