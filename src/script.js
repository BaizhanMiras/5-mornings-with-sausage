"use strict";
import {
  music,
  startDay
} from "./dialog.js";
import { 
  showBlackDisplay,
  animationSausageMouth,
  loseGame,
  screamSausage,
  animationClock
} from "./display.js";
import { data } from "./data.js";
import { engLesson, MathLesson, geografiaLesson } from "./game.js";

let currentLesson = "";
let counter = 0;

document.querySelector(".button-start__start").
addEventListener("click", () => {
  music.schoolBell.play();
  showBlackDisplay();
  document.querySelector(".container").
  style.display = "none";
  document.querySelector(".main").
  style.display = "block";
  startDay(music, 4, 0, animationSausageMouth, true, 100).
  then(() => {
    nextLesson().
    then(() => {
      switch(currentLesson) {
        case "Math":
          giveATask ( MathLesson );
          break;
        case "Eng":
          giveATask ( engLesson );
          break;
        case "geografia":
          giveATask ( geografiaLesson );
      }
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
    const mathCurrent = Math.random() < 0.33;
    if ( mathCurrent ) {
      currentLesson = "Math";
    } else {
      currentLesson = data.lesson
      [Math.floor(Math.random() * data.lesson.length)];
    }

    nextQuestion(music.startLesson.get(currentLesson)).then(() => {
      resolve();
    });
  })
}

function giveATask(callbackFn, complexity = 1) {
  return new Promise((resolve) => {
    let currentValue = callbackFn(complexity);
    const inputDiv = document.querySelector(".input-answer");
    inputDiv.replaceWith(inputDiv.cloneNode(true));
    const newInputDiv = document.querySelector(".input-answer");

    let answered = false;
    let time = 0;
    let idInterval = setInterval(() => {
      if ( answered ) {
        clearInterval(idInterval);
        document.querySelector(".seeing__clock").
        src = `images/clock/0time.png`;
      }
      else {
        if ( time === 11 ) {
          animationClock(false);
          clearInterval(idInterval);
          newInputDiv.removeEventListener("click", handleClick);
          music.timeOut.play();
          animationSausageMouth(music.timeOut.duration * 1000);
          counter++;
          data.counterQuestion++;
          data.attempt++
          setTimeout(
            CheckAnswer,
            music.CheckAnswerSay.get("false").duration * 1000
          );
        }
        else {
          time++;
          animationClock(true, time)
        }
      }
    }, music.clockSong.get(0).duration * 1000 + 500)
    function CheckAnswer() {
      if (data.attempt === 10) {
        loseGame().then(() => {
          screamSausage();
        })
      }
      if (data.counterQuestion === data.question.get(data.day)) {
        music.endDays.play();
        setTimeout(() => {
          showBlackDisplay();
          
          document.querySelector(".main").
          style.display = "none";

          document.querySelector(".container").
          style.display = "flex";
        }, music.endDays.duration * 1000);
      }
      else if (counter < 3) {
        giveATask(callbackFn, complexity).then(resolve);
      } 
      else {
        counter = 0;
        nextLesson().
        then(() => {
          switch(currentLesson) {
            case "Math":
              giveATask ( MathLesson );
              break;
            case "Eng":
              giveATask ( engLesson );
              break;
            case "geografia":
              giveATask ( geografiaLesson );
          }
        })
      }
    }

    function handleClick(event) {
      if (event.target.tagName === "INPUT" && !answered) {
        answered = true;
        newInputDiv.removeEventListener("click", handleClick);
        if (currentValue == event.target.value) {
          music.CheckAnswerSay.get("true").play();
          animationSausageMouth(music.CheckAnswerSay.get("true").duration * 1000);
          counter++;
          data.counterQuestion++;
          setTimeout(
            CheckAnswer,
            music.CheckAnswerSay.get("true").duration * 1000
          );
        } else {
          music.CheckAnswerSay.get("false").play();
          animationSausageMouth(music.CheckAnswerSay.get("false").duration * 1000);
          counter++;
          data.counterQuestion++;
          data.attempt++
          setTimeout(
            CheckAnswer,
            music.CheckAnswerSay.get("false").duration * 1000
          );
        }
      }
    }

    newInputDiv.addEventListener("click", handleClick);
  });
}

