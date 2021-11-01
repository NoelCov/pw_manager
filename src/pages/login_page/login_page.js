import React from "react";

import "./login_page.styles.scss";

import InputComponent from "../../components/input_component/input.component";
import ButtonComponent from "../../components/button_component/button.component";
import FormComponent from "../../components/form_component/form.component";

import axios from "axios";

import { useHistory } from "react-router-dom";

const LoginPage = ({ setLoggedIn }) => {
  const history = useHistory();
  const onSubmit = async (e) => {
    e.preventDefault();

    const username = e.target.username.value;
    const pw = e.target.password.value;

    try {
      const response = await axios.post("http://localhost:8000/login", {
        username,
        pw,
      });

      if (response.data) {
        setLoggedIn(true);
        history.push("/pws");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="login-page-container">
      <header>
        <h1>Noel Codes PW Manager</h1>
        <img className="img" alt="logo" src="./images/logo.jpg" />
      </header>
      <FormComponent onSubmit={onSubmit} method="post">
        <InputComponent name="username" type="text" labelName="Username" />
        <InputComponent name="password" type="password" labelName="PW" />
        <ButtonComponent>LOGIN</ButtonComponent>
        </FormComponent>
    </div>
  );
};

export default LoginPage;
