import React, { useState } from "react";

import "./login_page.styles.scss";

import InputComponent from "../../components/input_component/input.component";
import ButtonComponent from "../../components/button_component/button.component";
import FormComponent from "../../components/form_component/form.component";

import createHash from "../../pw_utils/createHash";
import encryptPw from "../../pw_utils/encryptPassword";

import axios from "axios";

import { useHistory } from "react-router-dom";

import { server } from "../../constants";

const LoginPage = ({ setLoggedIn }) => {
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    const username = e.target.username.value;
    const pw = e.target.password.value;
    const encryptionMessage = e.target.message.value;

    const hash = createHash(pw);
    const encryptedPw = encryptPw(hash, encryptionMessage);

    try {
      // Check if user exists in db
      const response = await axios.post(`${server}/login`, {
        username,
        encryptedPw,
        encryptionMessage,
      });

      if (response.data === "Wrong username") {
        setErrorMessage("Wrong Username");
      } else if (response.data === "Password not set") {
        // This is if username is correct but Master PW is empty that means it has not been set
        // So we access the app and set the master pw.
        setLoggedIn(true);
        history.push("/pws");
      } else if (response.data === "Wrong PassWord") {
        setErrorMessage("Wrong Password");
      } else if (response.data === "Correct PassWord") {
        setLoggedIn(true);
        history.push("/pws");
      } else if (response.data === "Encryption Message Incorrect") {
        setErrorMessage("Wrong Encryption Message");
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
        <InputComponent
          name="username"
          type="text"
          labelName="Username"
          required
        />
        <InputComponent name="password" type="password" labelName="PW" />
        <InputComponent name="message" type="text" labelName="Message" />
        {errorMessage !== "" ? <span>{errorMessage}</span> : null}
        <ButtonComponent>LOGIN</ButtonComponent>
      </FormComponent>
    </div>
  );
};

export default LoginPage;
