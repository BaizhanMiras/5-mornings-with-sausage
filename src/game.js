function randomNumber(n) {
  return Math.floor(Math.random() * n);
}

function addedPresent( value, count = false ) {
  const present = document.querySelector(".seeing__present");
  present.innerHTML = "";
  const letters = value.split("");
  for(let i = 0; i < letters.length; i++) {
    let letter = document.createElement("span");
    letter.innerHTML = letters[i];
    present.appendChild(letter);
  }
  return (count)? eval(value): value;
}

//Math
function createNumber(display) {
  const numbers = [randomNumber(50) + 20];
  const currentOperators = [];
  const result = [];
  let count = numbers[0];
  const operators = [
    "+",
    "-",
    "*"
  ];

  for (let i = 1; i < display; i++) {
    const operator = operators[randomNumber(operators.length)];
    currentOperators[i - 1] = operator;
    switch (operator) {
      case "+":
        numbers[i] = randomNumber(50) + 20;
        count += numbers[i];
        break;
      case "-":
        numbers[i] = randomNumber(50) + 10;
        count -= numbers[i];
        break;
      case "*":
        numbers[i] = randomNumber(9) + 1;
        count *= numbers[i];
        break;
    }
  }

  const maxLength = Math.max(numbers.length, currentOperators.length);
  for (let i = 0; i < maxLength; i++) {
    if (i < numbers.length) result.push(numbers[i]);
    if (i < currentOperators.length) result.push(currentOperators[i]);
  }

  return addedPresent( result.join(""), true );
}

function createQuestionMath(amount = 3, display = amount, complexity = 1) {
  let trueAnswer = createNumber(display);
  if (trueAnswer < 9 && trueAnswer > -9) {
    return MathLesson(complexity);
  }
  const input = document.querySelector(".input-answer");
  input.innerHTML = "";
  let defaultAnswer = [];
  for (let i = 0; i < amount;) {
    let equals = false;
    let value = randomNumber(trueAnswer) +
    Math.ceil(trueAnswer * 0.5);

    for (let i = 0; i < defaultAnswer.length; i++) {
      if ( value === trueAnswer ||  value === defaultAnswer[i] ){
        equals = true;
        break;
      }
    }
    if ( equals ) continue;
    defaultAnswer[i] = value;
    i++;
  }
  
  defaultAnswer[randomNumber(defaultAnswer.length)] = trueAnswer;
  defaultAnswer.forEach((v) => {
    let element = document.createElement("input");
    element.setAttribute("type", "button");
    element.value = v;
    input.appendChild(element);
  })
  return trueAnswer;
}

import { words, countryFlagsImg } from "./answers.js"

//english
function createLetter() {
  const word = words[randomNumber( words.length )];
  const hiddenLetter = word[randomNumber(word.length)];
  addedPresent(word);
  const letters = document.querySelectorAll(".seeing__present span");
  for (let i = 0; i < letters.length; i++) {
    if ( letters[i].textContent === hiddenLetter ) {
      letters[i].classList.add("hide");
    }
    letters[i].classList.add("letters");
  }
  return hiddenLetter;
}

function createQuestionEng(amount = 3) {
  let trueAnswer = createLetter();
  const lettersArr = [
    "a", "b", "c", "d", "e", "f", "g",
    "h", "i", "j", "k", "l", "m", "n",
    "o", "p", "q", "r", "s", "t", "u",
    "v", "w", "x", "y", "z"
  ];

  const input = document.querySelector(".input-answer");
  input.innerHTML = "";
  const defaultAnswer = [];
  for (let i = 0; i < amount;) {
    let equals = false;
    let value = lettersArr[randomNumber(lettersArr.length)];

    for (let i = 0; i < defaultAnswer.length; i++) {
      if ( value === trueAnswer ||  value === defaultAnswer[i] ){
        equals = true;
        break;
      }
    }
    if ( equals ) continue;
    defaultAnswer[i] = value;
    i++;
  }
  
  defaultAnswer[randomNumber(defaultAnswer.length)] = trueAnswer;
  defaultAnswer.forEach((v) => {
    let element = document.createElement("input");
    element.setAttribute("type", "button");
    element.value = v;
    input.appendChild(element);
  })

  return trueAnswer;
}

//geografia

function createFlag() {
  const country = countryFlagsImg[randomNumber(countryFlagsImg.length)];
  const present = document.querySelector(".seeing__present");
  present.innerHTML = "";
  const flagImg = document.createElement("img");
  flagImg.setAttribute("src", country.url);
  present.appendChild(flagImg);
  return country.name;
}

function createQuestionGeografia(amount = 3) {
  let trueAnswer = createFlag();
  const input = document.querySelector(".input-answer");
  input.innerHTML = "";

  const defaultAnswer = [];
  for (let i = 0; i < amount;) {
    let equals = false;
    let value = countryFlagsImg[randomNumber(countryFlagsImg.length)].name;

    for (let i = 0; i < defaultAnswer.length; i++) {
      if ( value === trueAnswer ||  value === defaultAnswer[i] ){
        equals = true;
        break;
      }
    }
    if ( equals ) continue;
    defaultAnswer[i] = value;
    i++;
  }
  
  defaultAnswer[randomNumber(defaultAnswer.length)] = trueAnswer;
  defaultAnswer.forEach((v) => {
    let element = document.createElement("input");
    element.setAttribute("type", "button");
    element.classList.add("long");
    element.value = v;
    input.appendChild(element);
  })

  return trueAnswer;
}

function MathLesson(complexity) {
  if ( complexity <= 1 ) {
    return createQuestionMath(3);
  }
  else if ( complexity === 2) {
    return createQuestionMath(4,3);
  }
  else if ( complexity > 2) {
    return createQuestionMath(4);
  }
}

function engLesson(complexity) {
  if ( complexity <= 1 ) {
    return createQuestionEng(3);
  }
  else if ( complexity > 1) {
    return createQuestionEng(4);
  }
}

function geografiaLesson(complexity) {
  if ( complexity <= 1 ) {
    return createQuestionGeografia(3);
  }
  else if ( complexity > 1) {
    return createQuestionGeografia(4);
  }
}

export { MathLesson, engLesson, geografiaLesson };