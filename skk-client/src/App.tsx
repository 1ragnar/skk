import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import { AppActionTypes, useAppContext } from "AppContext";
import { Routes, Route } from "react-router-dom";
import { Login } from "views/Auth/Login";
import { PrivateRoute } from "components/PrivateRoute/PrivateRoute";
import { Home } from "views/Home/Home";
import { Signup } from "views/Auth/Signup";
import { CssBaseline } from "@mui/material";
import { CustomAppBar } from "components/CustomAppBar/CustomAppBar";
import { Tickets } from "views/Tickets/Tickets";

const App: React.FC = (props: any) => {
  const [, dispatch] = useAppContext();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = useCallback(async () => {
    try {
      const user = localStorage.getItem("user");

      if (user) {
        const userFromStorage = JSON.parse(user);
        dispatch({
          type: AppActionTypes.LOGIN,
          payload: { user: userFromStorage },
        });
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <CssBaseline />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>

      <Routes>
        <Route path="/" element={<PrivateRoute component={<Home />} />} />
        <Route
          path="/tickets"
          element={<PrivateRoute component={<Tickets />} />}
        />
      </Routes>
    </div>
  );
};

export default App;
