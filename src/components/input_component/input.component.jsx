import React from "react";

import "./input.styles.scss";

const InputComponent = ({ type, name, labelName, value, required }) => (
  <div className="input-component-container">
    <label className="label" htmlFor={name}>
      {labelName}:
    </label>
    <input
      className="input"
      type={type}
      name={name}
      autoComplete="off"
      value={value && value}
      required={required && required}
    />
  </div>
);

export default InputComponent;
