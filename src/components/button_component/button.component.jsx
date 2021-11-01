import React from "react";

import "./button.styles.scss";

const ButtonComponent = ({ children }) => (
  <button className="button" type="submit">
    {children}
  </button>
);

export default ButtonComponent;
