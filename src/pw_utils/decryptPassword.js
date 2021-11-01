import createHash from "./createHash.js";
import CryptoJS from "crypto-js";

// Decrypt
const decryptPw = (encryptedPw) => {
  let hash = createHash("hello");
  return CryptoJS.AES.decrypt(encryptedPw, hash).toString(CryptoJS.enc.Utf8);
};

export default decryptPw;