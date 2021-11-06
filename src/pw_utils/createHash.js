import CryptoJS from "crypto-js";

// Create hash
const createHash = (pw) => {
  let hash = CryptoJS.SHA512(pw);
  for (let i = 0; i < 25; i++) {
    hash = CryptoJS.SHA512(hash);
  }
  return hash.toString();
}

export default createHash;