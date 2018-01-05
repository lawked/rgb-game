'use strict';

let score;
let lifes;
let rgbsArray;
let masterColor;
let scoreElement;
let colorBoxes;
let masterColorElement;
let lifesField;

let getElement = (cssSelector) => {
  return document.querySelector(cssSelector);
}

let generateRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

let getRandomRgb = () => {
  let r = generateRandomInt(0, 255);
  let g = generateRandomInt(0, 255);
  let b = generateRandomInt(0, 255);
  return ("(" + r + ", " + g + ", " + b + ")");
}

let getRandomRgbsArray = () => {
  let rgbs = [];
  for (let i = 0; i < 9; i++) {
    rgbs.push("rgb" + getRandomRgb());
  }
  return rgbs;
}

let shuffleOneRgb = (rgbsArray) => {
  return rgbsArray[generateRandomInt(0, 8)];
}

let setBoxesColors = (colors) => {
  colorBoxes = document.querySelectorAll(".square");
  for (let i = 0; i < 9; i++) {
    colorBoxes[i].style.backgroundColor = colors[i];
  }
}

let setMasterColor = (colors) => {
  masterColor = shuffleOneRgb(colors);
  masterColorElement = getElement(".result-item.shuffled-rgb");
  masterColorElement.style.backgroundColor = masterColor;
  masterColorElement.innerHTML = masterColor;
}

let init = () => {
  score = 0;
  lifes = 3;
  lifesField = getElement(".result-item.lifes span");
  lifesField.innerHTML = lifes;
  scoreElement = getElement(".result-item.score span");
  scoreElement.innerHTML = score;
  rgbsArray = getRandomRgbsArray()
}

let setUpColorListener = () => {
  for (let i = 0; i < 9; i++) {
    colorBoxes[i].addEventListener("click", verifyUserChoice);
  }
}

let verifyUserChoice = (event) => {
  if (lifes > 1) {
    if (event.target.style.backgroundColor === masterColor) {
      increaseScore();
      if (score==10){
        increaseLifes();
      }
    } else {
      decreaseLifes();
      decreaseScore();
    }
    rgbsArray = getRandomRgbsArray();
    setMasterColor(rgbsArray);
    setBoxesColors(rgbsArray);
  } else {
    decreaseLifes();
    toogleGameOverMessage(true);
  }
}

let decreaseScore = () => {
  if (score>0){
    scoreElement.innerHTML = --score;
  }
}

let increaseScore = () => {
  scoreElement.innerHTML = ++score;
}

let decreaseLifes = () => {
  lifesField.innerHTML = --lifes;
}

let increaseLifes = () => {
  lifesField.innerHTML = ++lifes;
}

let toogleGameOverMessage = (display) => {
  let gameOverElement = document.querySelector("#game-over");
  if (display) {
    gameOverElement.style["display"] = "block";
  }
  else {
    gameOverElement.style["display"] = "none";
  }
}

let setUpResetListener = () => {
  for (let i = 0; i < 9; i++) {
    document.querySelector('#play-again button').addEventListener("click", resetAllGame);
  }
}

let resetAllGame = () => {
  setUpAll();
  toogleGameOverMessage(false);
}

let setUpAll = () => {
  init();
  setMasterColor(rgbsArray);
  setBoxesColors(rgbsArray);
  setUpColorListener();
  setUpResetListener();
}

setUpAll();

