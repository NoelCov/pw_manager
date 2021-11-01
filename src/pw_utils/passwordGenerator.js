const lowerCase = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
const upperCase = lowerCase.map((letter) => letter.toUpperCase());
const specialCharacters = ["!", ".", "$", "#", "@", "&", "*", "%", ","];

// Random number between 1-100
const randomNumber = () => Math.floor(Math.random() * 9);

const randomLowerCase = () =>
  lowerCase[Math.floor(Math.random() * lowerCase.length)];

const randomUpperCase = () =>
  upperCase[Math.floor(Math.random() * upperCase.length)];

const randomSpecialCharacter = () =>
  specialCharacters[Math.floor(Math.random() * specialCharacters.length)];

// Array with all random functions to use in randomChar function
const everythingRandom = [
  randomNumber,
  randomLowerCase,
  randomUpperCase,
  randomSpecialCharacter,
];

// Returns a random character from everythingRandom array
const randomChar = () => {
  return everythingRandom[
    Math.floor(Math.random() * everythingRandom.length)
  ]();
};

// Generates and returns a random password of given length
const pwGenerator = (length) => {
  let myPw = "";

  for (let i = 0; i < length; i++) {
    myPw += randomChar();
  }
  return myPw;
};

export default pwGenerator;