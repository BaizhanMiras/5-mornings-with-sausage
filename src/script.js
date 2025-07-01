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
  animationClock,
  createPaper,
  clearPaper,
  createBlurEffect,
  clearBlurEffect
} from "./display.js";
import { data } from "./data.js";
import { engLesson, MathLesson, geografiaLesson } from "./game.js";

let currentLesson = "";
let counter = 0;

const clickPlay = () => {
  music.schoolBell.play();
  showBlackDisplay();
  document.querySelector(".container").
  style.display = "none";
  document.querySelector(".main").
  style.display = "block";
  document.querySelector(".shop").
  style.display = "none";
  const currentDay = data.complexity.get(data.day)
  startDay(music, data.day, 5000, animationSausageMouth, true, 100).
  then(() => {
    nextLesson().
    then(() => {
      switch(currentLesson) {
        case "Math":
          giveATask ( MathLesson, currentDay );
          break;
        case "Eng":
          giveATask ( engLesson, currentDay );
          break;
        case "geografia":
          giveATask ( geografiaLesson, currentDay );
      }
    })
  })
}

document.querySelectorAll(".button-start__start")[0].
addEventListener("click", clickPlay)
document.querySelectorAll(".button-start__start")[1].
addEventListener("click", clickPlay)

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
    document.querySelector(".seeing__clock").
    src = `images/clock/0time.png`;
    data.shouldBreak = true;
    data.clockBreak = false;
    let currentValue = callbackFn(complexity);
    const inputDiv = document.querySelector(".input-answer");
    inputDiv.replaceWith(inputDiv.cloneNode(true));
    const newInputDiv = document.querySelector(".input-answer");
    if (data.counterQuestion > 20) {
      let chance = Math.random() > 0.5;
      if (chance) {
        let chanceEffect = Math.random() > 0.7;
        if (chanceEffect) {
          createBlurEffect();
        } else {
          createPaper();
        }
      }
    }
    let answered = false;
    let time = 0;
    let idInterval = setInterval(() => {
      if ( data.clockBreak ) {
        clearInterval(idInterval);
        data.clockBreak = false;
      }
      else if ( answered ) {
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
        if (data.day === 5) {
          music.endDays.play();
          data.day = 0;
          setTimeout(() => {
  
            showBlackDisplay();
            data.counterQuestion = 0;
            document.querySelector(".main").
            style.display = "none";
  
            document.querySelector(".container").
            style.display = "flex";
            
            const input = document.querySelector(".input-answer");
            input.innerHTML = "";
  
            const present = document.querySelector(".seeing__present");
            present.innerHTML = "";

            data.cash = 0;
            data.attempt = 0;
            for (let i = 0; i < data.things.length; i++) {
              data.things[i].amount = 0;
            }
          }, music.endDays.duration * 1000);
        }
        else {
          music.endDays.play();
          data.day++;
          setTimeout(() => {
  
            showBlackDisplay();
            data.counterQuestion = 0;
            document.querySelector(".main").
            style.display = "none";
  
            document.querySelector(".shop").
            style.display = "grid";
            
            const input = document.querySelector(".input-answer");
            input.innerHTML = "";
  
            const present = document.querySelector(".seeing__present");
            present.innerHTML = "";
          }, music.endDays.duration * 1000);
        }
      }
      else if (counter < 10) {
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
      data.shouldBreak = false;
      if (event.target.tagName === "INPUT" && !answered) {
        answered = true;
        newInputDiv.removeEventListener("click", handleClick);
        if (currentValue == event.target.value) {
          music.CheckAnswerSay.get("true").play();
          animationSausageMouth(music.CheckAnswerSay.get("true").duration * 1000);
          counter++;
          data.counterQuestion++;
          data.cash += 2;
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

document.addEventListener("click", (event) => {
  if (
    event.target.tagName === "IMG" &&
    event.target.classList.contains("seeing__clock") &&
    data.shouldBreak &&
    data.things[0].amount > 0
  ){
    event.target.src = "./images/clock/BreakClock.png";
    music.breakClock.play();
    data.clockBreak = true;
    data.shouldBreak = false;
    data.things[0].amount--;
    console.log(data.things[0].amount)
  }
})

document.addEventListener("click", (event) => {
  if (
    event.target.classList.contains("paper") &&
    data.things[1].amount > 0
  ){
    clearPaper();
    music.blowPaper.play();
  }
})

document.addEventListener("click", (event) => {
  if (
    event.target.classList.contains("blur") &&
    data.things[2].amount > 0
  ){
    clearBlurEffect();
    music.blob.play();
  }
})

document.addEventListener("click", (event) => {
  const buyButton = document.querySelectorAll(".shop__button-buy");
  if ( event.target.classList.contains("shop__button-buy") ) {
    if ( event.target === buyButton[0] && data.cash >= 3 ) {
      music.buyThings.play();
      data.cash -= 3;
      data.things[0].amount++;
    }
    else if ( event.target === buyButton[1] && data.cash >= 5  ) {
      music.buyThings.play();
      data.cash -= 5;
      data.things[1].amount++;
    }
    else if ( event.target === buyButton[2] && data.cash >= 10  ) {
      music.buyThings.play();
      data.cash -= 10;
      data.things[2].amount++;
    }
  }
})