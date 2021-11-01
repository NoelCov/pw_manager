import CryptoJS from "crypto-js";

// Create hash
const createHash = (randomWord) => {
  return CryptoJS.SHA256(randomWord).toString(CryptoJS.enc.base64);
};

export default createHash;