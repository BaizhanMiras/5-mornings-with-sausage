import { music } from "./dialog.js";

function showBlackDisplay() {
  const blackDisplay = document.createElement("div");
  blackDisplay.className = "black-display";
  document.body.appendChild(blackDisplay);
  blackDisplay.classList.add("active");

  setTimeout(() => {
    blackDisplay.classList.remove("active");
    blackDisplay.offsetWidth;
  }, 3000)
}

function animationClock( tick, num ) {
  if ( tick ) {
    music.clockSong.get(0).play();
    document.querySelector(".seeing__clock").
    src = `images/clock/` + num + `time.png`;
  } else {
    document.querySelector(".seeing__clock").
    src = `images/clock/0time.png`;
    music.clockSong.get(1).play();
  }
}

function animationSausageMouth(
  time,
  animation = false,
  interval = 400
  ){
  const sausage = document.querySelector(".seeing__image");
  const sausageImg = "images/mouthCloseSausage.png";
  
  if (animation) {
    const intervalId = setInterval(() => {
      if ( sausageImg === sausage.getAttribute("src") ) {
        sausage.setAttribute("src", "images/mouthOpenSausage.png");
      } else {
        sausage.setAttribute("src", "images/mouthCloseSausage.png");
      };
    }, interval);

    setTimeout(() => {
      clearInterval(intervalId);
      sausage.setAttribute("src", "images/mouthCloseSausage.png");
    }, time);
  }

  else {
    sausage.setAttribute("src", "images/mouthOpenSausage.png")
    setTimeout(() => {
      sausage.setAttribute("src", "images/mouthCloseSausage.png")
    }, time);
  }
}

function loseGame() {
  return new Promise((resolve) => {
    const song = music.endDays; //loseListen
    song.play();
    document.body.style.background = "radial-gradient(circle, #ff0000, black)";
    animationSausageMouth(song.duration * 1000);
    document.querySelector(".seeing__present").innerHTML = "";
    document.querySelector(".input-answer").innerHTML = "";
    song.onended = () => {
      resolve();
    }
  })
}

function screamSausage() {
  const sausage = document.querySelector(".seeing__image");
  music.screamSausage.play();
  sausage.style.zIndex = "1000";
  sausage.style.position = "absolute";
  sausage.style.top = "50%";
  sausage.style.left = "50%";
  sausage.style.transform = "translate(-50%, -50%)";
  sausage.style.width = "100vw";
  sausage.style.height = "100vh";
  sausage.setAttribute("src", "images/mouthScreamer.png");
}

export {
  showBlackDisplay,
  animationClock,
  animationSausageMouth,
  loseGame, 
  screamSausage
};