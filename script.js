'use strict';

let score = 0;
let lifes = 3;
let rgbsArray;
let masterColor;
let scoreElement;
let colorBoxes;
let masterColorElement;
let lifesField;

function getElement(cssSelector) {
    return document.querySelector(cssSelector);
}

function generateRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomRgb() {
    let r = generateRandomInt(0, 255);
    let g = generateRandomInt(0, 255);
    let b = generateRandomInt(0, 255);
    return ("(" + r + ", " + g + ", " + b + ")");
}

function getRandomRgbsArray() {
    let rgbs = [];
    for (let i = 0; i < 9; i++) {
        rgbs.push("rgb" + getRandomRgb());
    }
    return rgbs;
}

function shuffleOneRgb(rgbsArray) {
    return rgbsArray[generateRandomInt(0, 8)];
}

function setBoxesColors(colors) {
    colorBoxes = document.querySelectorAll(".square");
    for (let i = 0; i < 9; i++) {
        colorBoxes[i].style.backgroundColor = colors[i];
    }
}

function setMasterColor(colors) {
    masterColor = shuffleOneRgb(colors);
    masterColorElement = getElement(".result-item.shuffled-rgb");
    masterColorElement.style.backgroundColor = masterColor;
    masterColorElement.innerHTML = masterColor;
}

function init() {
    lifesField = getElement(".result-item.lifes span");
    lifesField.innerHTML = lifes;
    scoreElement = getElement(".result-item.score span");
    scoreElement.innerHTML = score;
    rgbsArray = getRandomRgbsArray()
}

function setUpListener() {
    for (let i = 0; i < 9; i++) {
        colorBoxes[i].addEventListener("click", verifyUserChoice);
    }
}

function verifyUserChoice(event) {
    if (event.target.style.backgroundColor === masterColor) {
        for (let j = 0; j < 9; j++) {
            colorBoxes[j].style.backgroundColor = masterColor;
        }
        increaseScore();
    } else {
        decreaseLifes();
        decreaseScore();
    }
    rgbsArray = getRandomRgbsArray();
    setMasterColor(rgbsArray);
    setBoxesColors(rgbsArray);
}

function decreaseScore() {
    scoreElement.innerHTML = --score;
}

function increaseScore() {
    scoreElement.innerHTML = ++score;
}

function decreaseLifes() {
    lifesField.innerHTML = --lifes;
}

function dincreaseLifes() {
    lifesField.innerHTML = ++lifes;
}

init();
setMasterColor(rgbsArray);
setBoxesColors(rgbsArray);
setUpListener();

