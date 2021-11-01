import React from "react";

import "./form.styles.scss";

const FormComponent = ({ children, onSubmit, method }) => (
  <form onSubmit={onSubmit} className="form" method={method && method}>
    {children}
  </form>
);

export default FormComponent;
