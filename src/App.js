import React, { useState, useEffect } from "react";

import LoginPage from "./pages/login_page/login_page";
import PwsPage from "./pages/pws_page/pws_page";
import AddPage from "./pages/add_page/add_page";
import ChangePage from "./pages/change_page/change_page";

import { Switch, Route, Redirect } from "react-router-dom";

import NavbarComponent from "./components/navbar_component/navbar.component";

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
      <NavbarComponent />
      <Switch>
        <Route
          exact
          path="/"
          render={() => <LoginPage setLoggedIn={setLoggedIn} />}
        />
        <Route
          path="/pws"
          render={() => (loggedIn ? <PwsPage /> : <Redirect to="/" />)}
        />
        <Route
          path="/add"
          render={() => (loggedIn ? <AddPage /> : <Redirect to="/" />)}
        />
        <Route
          path="/change"
          render={() => (loggedIn ? <ChangePage /> : <Redirect to="/" />)}
        />
      </Switch>
    </>
  );
};

export default App;
