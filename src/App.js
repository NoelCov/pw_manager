import React, { useState, useEffect } from "react";

import LoginPage from "./pages/login_page/login_page";
import PwsPage from "./pages/pws_page/pws_page";
import AddPage from "./pages/add_page/add_page";

import { Switch, Route, Redirect } from "react-router-dom";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const data = sessionStorage.getItem("isLoggedIn");
    if (data) {
      setLoggedIn(true);
    }
  }, [setLoggedIn]);

  useEffect(() => {
    sessionStorage.setItem("isLoggedIn", loggedIn);
  }, [loggedIn]);

  return (
    <>
      <Switch>
        <Route
          exact
          path="/"
          render={() => <LoginPage setLoggedIn={setLoggedIn} />}
        />
        <Route
          path="/pws"
          render={() =>
            sessionStorage.getItem("isLoggedIn") ? (
              <PwsPage />
            ) : (
              <Redirect to="/" />
            )
          }
        />
        <Route
          pat="add"
          render={() =>
            sessionStorage.getItem("isLoggedIn") ? (
              <AddPage />
            ) : (
              <Redirect to="/" />
            )
          }
        />
      </Switch>
    </>
  );
};

export default App;
