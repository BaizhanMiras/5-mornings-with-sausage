
export const talk = {
  startLesson: new Map(),
  CheckAnswerSay: new Map(),
  greetDays: new Map(),
  endDays: new Audio("songs/LessonDialog/endDay.mp3"),
  loseListen: new Audio("")
};

// safe audio files in the map

talk.startLesson.set(
  "Math",
  new Audio("songs/LessonDialog/LessonStart/Math.mp3")
);
talk.startLesson.set(
  "Geometry",
  new Audio("songs/LessonDialog/LessonStart/Geometry.mp3")
);
talk.startLesson.set(
  "Eng",
  new Audio("songs/LessonDialog/LessonStart/Eng.mp3")
);
talk.startLesson.set(
  "Geography",
  new Audio("songs/LessonDialog/LessonStart/Geography.mp3")
);
talk.startLesson.set(
  "Reaction",
  new Audio("songs/LessonDialog/LessonStart/Reaction.mp3")
);

talk.CheckAnswerSay.set(
  "true",
  new Audio("songs/LessonDialog/CheckAnswerTrue.mp3")
);
talk.CheckAnswerSay.set(
  "false",
  new Audio("songs/LessonDialog/CheckAnswerFalse.mp3")
);

talk.greetDays.set(1, new Audio("songs/LessonDialog/greetDays/1d.mp3"));
talk.greetDays.set(2, new Audio("songs/LessonDialog/greetDays/2d.mp3"));
talk.greetDays.set(3, new Audio("songs/LessonDialog/greetDays/3d.mp3"));
talk.greetDays.set(4, new Audio("songs/LessonDialog/greetDays/4d.mp3"));
talk.greetDays.set(5, new Audio("songs/LessonDialog/greetDays/5d.mp3"));


// Functions

export function animationSausageMouth(
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
// export function playAudio(audio) {
//   return new Promise((resolve) => {
//     audio.play();
//     audio.onended = () => {
//       resolve();
//     };
//   });
// }

export function startDay(data, day, ms, callBackFn, ...args) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const say = data?.greetDays.get(day);
      say.play();
      callBackFn(say.duration * 1000, ...args);
      setTimeout(() => {
        resolve();
      }, say.duration * 1100)
    },ms)
  })
}