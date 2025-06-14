function MathLesson(complexity) {
  const operators = [
    "+",
    "-",
    "*"
  ];

  function RandomNumber(n) {
    return Math.floor(Math.random() * n);
  }

  function createNumber(display) {
    const numbers = [RandomNumber(50) + 20];
    const currentOperators = [];
    const result = [];
    let count = numbers[0];

    for (let i = 1; i < display; i++) {
      const operator = operators[RandomNumber(operators.length)];
      currentOperators[i - 1] = operator;
      switch (operator) {
        case "+":
          numbers[i] = RandomNumber(50) + 20;
          count += numbers[i];
          break;
        case "-":
          numbers[i] = RandomNumber(50) + 10;
          count -= numbers[i];
          break;
        case "*":
          numbers[i] = RandomNumber(9) + 1;
          count *= numbers[i];
          break;
      }
    }

    const maxLength = Math.max(numbers.length, currentOperators.length);
    for (let i = 0; i < maxLength; i++) {
      if (i < numbers.length) result.push(numbers[i]);
      if (i < currentOperators.length) result.push(currentOperators[i]);
    }

    const present = document.querySelector(".seeing__present");
    present.innerHTML = "";
    present.textContent = result.join(" ");
    return eval(result.join(" "));
  }

  function createQuestion(amount = 3, display = amount) {
    let trueAnswer = createNumber(display);
    console.log(trueAnswer);
    if (trueAnswer < 9 && trueAnswer > -9) {
      return MathLesson(complexity);
    }
    const input = document.querySelector(".input-answer");
    input.innerHTML = "";
    let defaultAnswer = [];
    for (let i = 0; i < amount;) {
      let equals = false;
      let value = RandomNumber(trueAnswer) +
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
    
    defaultAnswer[RandomNumber(defaultAnswer.length)] = trueAnswer;
    defaultAnswer.forEach((v) => {
      let element = document.createElement("input");
      element.setAttribute("type", "button");
      element.value = v;
      input.appendChild(element);
    })
    return trueAnswer;
  }

  if ( complexity <= 1 ) {
    return createQuestion(3);
  }
  else if ( complexity === 2) {
    return createQuestion(4,3);
  }
  else if ( complexity > 2) {
    return createQuestion(4);
  }
}

export { MathLesson };