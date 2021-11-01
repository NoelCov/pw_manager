import React, { useState } from "react";

import "./pws_page.styles.scss";

import FormComponent from "../../components/form_component/form.component";
import ButtonComponent from "../../components/button_component/button.component";
import InputComponent from "../../components/input_component/input.component";

import axios from "axios";

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
        setPw(result.data.PassWord);
      } else {
        setPw("PW not Found");
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
        {pw && <span className="pw">{pw}</span>}
        <ButtonComponent>GET</ButtonComponent>
      </FormComponent>
      <img className="img" alt="logo" src="./images/hack.jpg" />
    </div>
  );
};

export default PwsPage;
