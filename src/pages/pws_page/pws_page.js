import React, { useState } from "react";

import FormComponent from "../../components/form_component/form.component";
import ButtonComponent from "../../components/button_component/button.component";
import InputComponent from "../../components/input_component/input.component";
import ImageComponent from "../../components/image_component/image.component";

import { server } from "../../constants";

import axios from "axios";

import decryptPw from "../../pw_utils/decryptPassword";

import "./pws_page.styles.scss";

const PwsPage = () => {
  const [pw, setPw] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    const website = e.target.website.value;
    const encryptionMessage = e.target.encryptionMessage.value;
    setPw("");

    try {
      const response = await axios.post(`${server}/pw`, {
        website,
      });

      if (response.data.PassWord) {
        try {
          setPw(decryptPw(response.data.PassWord, encryptionMessage));
        } catch (e) {
          setPw("");
        }
      }
    } catch (e) {
      console.log("Password not found.");
    }

    e.target.reset();
  };

  return (
    <div className="pws-page-container">
      <FormComponent onSubmit={onSubmit} method="post">
        <InputComponent
          name="website"
          type="text"
          labelName="Website"
          required
        />
        <InputComponent
          name="encryptionMessage"
          type="text"
          labelName="Encryption Message"
          required
        />
        <span className="pw-label">PW:</span>
        {pw ? (
          <span className="pw">{pw}</span>
        ) : (
          <span className="pw">No PW Found</span>
        )}
        <ButtonComponent>GET</ButtonComponent>
      </FormComponent>
      <ImageComponent alt="logo" src="./images/hack.jpg" />
    </div>
  );
};

export default PwsPage;
