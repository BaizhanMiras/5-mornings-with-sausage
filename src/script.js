"use strict";
import { talk, animationSausageMouth, startDay} from "./dialog.js";
import { showBlackDisplay } from "./display.js";
import { data } from "./data.js";
import { MathLesson } from "./game.js";

let counter = 0;

document.querySelector(".button-start__start").
addEventListener("click", () => {
  data.music[1].play();
  showBlackDisplay();
  document.querySelector(".container").
  style.display = "none";
  document.querySelector(".main").
  style.display = "block";
  startDay(talk, 1, 0, animationSausageMouth, true, 100).
  then(() => {
    nextLesson().
    then(() => {
      giveATask( MathLesson );
    })
  })
})

function nextQuestion(audio) {
  return new Promise((resolve) => {
    audio.play();
    animationSausageMouth(audio.duration * 1000);
    setTimeout(() => {
      resolve();
    }, audio.duration * 1000 + 1000)
  })
}

function nextLesson() {
  return new Promise((resolve) => {
    const lesson = data.lesson
    [Math.floor(Math.random() * data.lesson.length)];
    nextQuestion(talk.startLesson.get(lesson)).then(() => {
      resolve()
    });
  })
}


function giveATask(callbackFn, complexity = 1) {
  return new Promise((resolve) => {
    let currentValue = callbackFn(complexity);
    const inputDiv = document.querySelector(".input-answer");

    // Remove any previous event listener
    inputDiv.replaceWith(inputDiv.cloneNode(true));
    const newInputDiv = document.querySelector(".input-answer");

    function handleClick(element) {
      if (element.target.tagName === "INPUT") {
        newInputDiv.removeEventListener("click", handleClick); // Remove after first use
        if (currentValue === Number(element.target.value)) {
          talk.CheckAnswerSay.get("true").play();
          animationSausageMouth(
            talk.CheckAnswerSay.get("true").duration * 1000
          );
          setTimeout(() => {
            counter++;
            if (counter < 10) {
              giveATask(callbackFn, complexity);
              resolve();
            } else {
              counter = 0;
              nextLesson().then(() => {
                giveATask(callbackFn, complexity);
              });
            }
          }, talk.CheckAnswerSay.get("true").duration * 1000);
        } else {
          talk.CheckAnswerSay.get("false").play();
          animationSausageMouth(
            talk.CheckAnswerSay.get("false").duration * 1000
          );
          setTimeout(() => {
            counter++;
            if (counter < 10) {
              giveATask(callbackFn, complexity);
            } else {
              counter = 0;
              nextLesson().then(() => {
                giveATask(callbackFn, complexity);
                resolve();
              });
            }
          }, talk.CheckAnswerSay.get("false").duration * 1000);
        }
      }
    }

    newInputDiv.addEventListener("click", handleClick);
  });
}
