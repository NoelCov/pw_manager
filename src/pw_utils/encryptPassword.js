import CryptoJS from "crypto-js";

// Encrypt
const encryptPw = (pw, message) => {
  return CryptoJS.AES.encrypt(pw, message).toString();
};

export default encryptPw;