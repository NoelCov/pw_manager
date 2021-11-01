import "./add_page.styles.scss";

import React, { useState } from "react";

import axios from "axios";

import InputComponent from "../../components/input_component/input.component";
import ButtonComponent from "../../components/button_component/button.component";
import FormComponent from "../../components/form_component/form.component";

import pwGenerator from "../../pw_utils/passwordGenerator";
import encryptPw from "../../pw_utils/encryptPassword";

const AddPage = () => {
  const [password, setPassword] = useState("");
  const [pwSaved, setPwSaved] = useState(false);

  const savePw = async (e) => {
    e.preventDefault();

    let masterPw = e.target.masterPw.value;
    const website = e.target.website.value;
    let pw = e.target.password.value;

    pw = encryptPw(pw);
    
    try {
      const response = await axios.post("http://localhost:8000/add", {
        masterPw,
        website,
        pw,
      });

      if (response) {
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
      <h1 className="h1">ADD PWS</h1>
      <FormComponent onSubmit={savePw} method="post">
        <InputComponent name="website" type="text" labelName="Website" />
        <InputComponent type="password" name="password" labelName="PW" />
        <InputComponent name="masterPw" type="password" labelName="Master PW" />
        <ButtonComponent>SAVE PW</ButtonComponent>
        {pwSaved && <span>PW Saved Successfuly.</span>}
      </FormComponent>

      <FormComponent onSubmit={generatePw}>
        <InputComponent type="number" name="length" labelName="Length for PW" />
        <div>PW: </div>
        <div>{password}</div>
        <ButtonComponent>GENERATE PW</ButtonComponent>
      </FormComponent>
      <img className="img" src="./images/nasa.jpg" alt="nasa" />
    </div>
  );
};

export default AddPage;
