import React from "react";
import { IUser } from "./types";

interface IAppState {
  user?: IUser;
}

const defaultValue: IAppState = {};

enum AppActionTypes {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
  SET_USER = "SET_USER",
  SIGNUP = "SIGNUP",
}

interface IAppAction {
  type: AppActionTypes;
  payload: {
    user?: IUser;
    token?: string;
  };
}

const StateContext = React.createContext([defaultValue, undefined as any]);

const reducer = (state: IAppState, action: IAppAction): IAppState => {
  switch (action.type) {
    case AppActionTypes.LOGIN: {
      if (action.payload.token) {
        localStorage.setItem("token", action.payload.token);
      }

      return { ...state, user: action.payload.user ?? undefined };
    }

    case AppActionTypes.LOGOUT: {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return { ...state, user: undefined };
    }

    case AppActionTypes.SIGNUP: {
      if (action.payload.token) {
        localStorage.setItem("token", action.payload.token);
      }
      return { ...state, user: action.payload.user ?? undefined };
    }

    case AppActionTypes.SET_USER: {
      if (action.payload.user) {
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      }
      return { ...state, user: action.payload.user };
    }

    default:
      return state;
  }
};

const initialState: IAppState = {
  user: undefined,
};

interface Props {
  children: any;
}

const StateProvider = ({ children }: Props) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};

const useAppContext = () => React.useContext(StateContext);

export { StateContext, StateProvider, useAppContext, AppActionTypes };
