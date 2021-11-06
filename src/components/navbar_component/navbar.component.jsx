import React from "react";

import { Link } from "react-router-dom";

import "./navbar.component.styles.scss";

const NavbarComponent = () => (
  <nav className="navbar-container">
    <Link className="link" to="/">
      HOME
    </Link>
    <Link className="link" to="/add">
      ADD PW
    </Link>
    <Link className="link" to="/pws">
      GET PWS
    </Link>
    <Link className="link" to="/change">
      CHANGE PW
    </Link>
  </nav>
);

export default NavbarComponent;
