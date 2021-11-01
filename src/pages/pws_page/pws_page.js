import React, { useState } from "react";

import "./pws_page.styles.scss";

import FormComponent from "../../components/form_component/form.component";
import ButtonComponent from "../../components/button_component/button.component";
import InputComponent from "../../components/input_component/input.component";

import axios from "axios";

import decryptPw from "../../pw_utils/decryptPassword";

const PwsPage = () => {
  const [pw, setPw] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    const website = e.target.website.value;
    setPw("");

    try {
      const result = await axios.post("http://localhost:8000/pw", {
        website,
      });

      if (result.data.PassWord) {
        let pw = decryptPw(result.data.PassWord);
        setPw(pw);
      }
    } catch (e) {
      console.log("Password not found.");
    }
  };

  return (
    <div className="pws-page-container">
      <h1>PWS</h1>
      <FormComponent onSubmit={onSubmit} method="post">
        <InputComponent name="website" type="text" labelName="Website" />
        <span className="pw-label">PW:</span>
        {pw ? <span className="pw">{pw}</span> : <span className="pw">No PW Found</span>}
        <ButtonComponent>GET</ButtonComponent>
      </FormComponent>
      <img className="img" alt="logo" src="./images/hack.jpg" />
    </div>
  );
};

export default PwsPage;
