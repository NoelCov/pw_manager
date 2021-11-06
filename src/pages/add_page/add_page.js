import React, { useState } from "react";

import axios from "axios";

import InputComponent from "../../components/input_component/input.component";
import ButtonComponent from "../../components/button_component/button.component";
import FormComponent from "../../components/form_component/form.component";

import pwGenerator from "../../pw_utils/passwordGenerator";
import encryptPw from "../../pw_utils/encryptPassword";

import "./add_page.styles.scss";

const AddPage = () => {
  const [password, setPassword] = useState("");
  const [pwSaved, setPwSaved] = useState(false);

  const savePw = async (e) => {
    e.preventDefault();

    const encryptionMessage = e.target.encryptionMessage.value;
    const website = e.target.website.value;
    const pw = e.target.password.value;

    const encryptedPw = encryptPw(pw, encryptionMessage);

    try {
      const response = await axios.post("http://localhost:8000/add", {
        website,
        encryptedPw,
      });

      if (response.data === "Password Saved Successfully") {
        setPwSaved(true);
      } else {
        setPwSaved(false);
      }

      e.target.reset();
    } catch (e) {
      console.error(e);
    }
  };

  const generatePw = (e) => {
    e.preventDefault();

    const length = e.target.length.value;
    setPassword(pwGenerator(length));
  };

  return (
    <div className="add-page-container">
      <FormComponent onSubmit={savePw} method="post">
        <InputComponent
          name="website"
          type="text"
          labelName="Website"
          required
        />
        <InputComponent
          type="password"
          name="password"
          labelName="PW"
          required
        />
        <InputComponent
          name="encryptionMessage"
          type="text"
          labelName="Encryption Message"
        />
        <ButtonComponent>SAVE PW</ButtonComponent>
        <span>{pwSaved ? "PW Saved Successfuly" : "Password not saved"}</span>
      </FormComponent>

      <FormComponent onSubmit={generatePw}>
        <InputComponent
          type="number"
          name="length"
          labelName="Length for PW"
          required
        />
        <div>PW: </div>
        <div>{password}</div>
        <ButtonComponent>GENERATE PW</ButtonComponent>
      </FormComponent>
      <img className="img" src="./images/nasa.jpg" alt="nasa" />
    </div>
  );
};

export default AddPage;
