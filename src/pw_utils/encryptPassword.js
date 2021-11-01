import createHash from "./createHash.js";
import CryptoJS from "crypto-js";

// Encrypt
const encryptPw = (pw) => {
  let hash = createHash("hello");
  return CryptoJS.AES.encrypt(pw, hash).toString();
};

export default encryptPw;