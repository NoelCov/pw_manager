import createHash from "./createHash.js";
import CryptoJS from "crypto-js";

// Encrypt
const encryptPw = (pw, randomWord) => {
  let hash = createHash(randomWord);
  return CryptoJS.AES.encrypt(pw, hash).toString();
};

export default encryptPw;