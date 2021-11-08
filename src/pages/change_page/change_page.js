import React, { useState } from "react";

import "./change_page.styles.scss";

import axios from "axios";

import FormComponent from "../../components/form_component/form.component";
import InputComponent from "../../components/input_component/input.component";
import ButtonComponent from "../../components/button_component/button.component";

import encryptPw from "../../pw_utils/encryptPassword";
import createHash from "../../pw_utils/createHash";

import { server } from "../../constants";

const ChangePage = () => {
  const [resultMessage, setResultMessage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    const oldMasterPw = e.target.oldMasterPw.value;
    const newMasterPw = e.target.newMasterPw.value;
    const newEncryptMessage = e.target.newEncryptMessage.value;
    const oldEncryptMessage = e.target.oldEncryptMessage.value;

    // Creates hash for new password
    const hash = createHash(newMasterPw);

    // Encrypts hash with message
    const newMasterPwEncrypted = encryptPw(hash, newEncryptMessage);

    if (oldMasterPw === "") {
      const response = await axios.post(`${server}/change`, {
        newMasterPwEncrypted,
      });
      if (response.data === "Master Password Successfully Changed") {
        setResultMessage("Master PW Changed Successfully");
      } else {
        setResultMessage("Old Password is Needed");
      }
    } else {
      // Hash and Encrypt old Master PW
      const oldMasterHash = createHash(oldMasterPw);
      const oldMasterPwEncrypted = encryptPw(oldMasterHash, oldEncryptMessage);

      const response = await axios.post("http://localhost:8000/change", {
        oldMasterPwEncrypted,
        newMasterPwEncrypted,
        oldEncryptMessage,
      });
      if (response.data === "Master Password Successfully Changed") {
        setResultMessage("Master Password Successfully Changed");
      } else {
        setResultMessage("Problem setting up New Password");
      }
    }
    e.target.reset();
  };

  return (
    <div className="change-page-container">
      <img src="./images/snake.jpg" className="img" alt="snake" />
      <FormComponent method="post" onSubmit={onSubmit}>
        <InputComponent
          type="password"
          name="newMasterPw"
          labelName="New Master PW"
          required
        />
        <InputComponent
          type="password"
          name="oldMasterPw"
          labelName="Old Master PW"
        />
        <InputComponent
          type="text"
          name="newEncryptMessage"
          labelName="New Encrypt Message"
          required
        />
        <InputComponent
          type="text"
          name="oldEncryptMessage"
          labelName="Old Encrypt Message"
        />
        {resultMessage.length > 0 && <span>{resultMessage}</span>}
        <ButtonComponent>CHANGE</ButtonComponent>
      </FormComponent>
    </div>
  );
};

export default ChangePage;
