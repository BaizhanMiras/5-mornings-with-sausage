
const music = {
  startLesson: new Map(),
  CheckAnswerSay: new Map(),
  greetDays: new Map(),
  endDays: new Audio("songs/LessonDialog/endDay.mp3"),
  loseListen: new Audio("songs/LessonDialog/badEnding.mp3"),
  screamSausage: new Audio("songs/LessonDialog/screamer.mp3"),
  schoolBell: new Audio("songs/schoolBell.mp3"),
  clockSong: new Map(),
  timeOut: new Audio("songs/LessonDialog/timeOut.mp3")
};

// safe audio files in the map

music.startLesson.set(
  "Math",
  new Audio("songs/LessonDialog/LessonStart/Math.mp3")
);
music.startLesson.set(
  "Eng",
  new Audio("songs/LessonDialog/LessonStart/Eng.mp3")
);
music.startLesson.set(
  "geografia",
  new Audio("songs/LessonDialog/LessonStart/Geography.mp3")
);

music.CheckAnswerSay.set(
  "true",
  new Audio("songs/LessonDialog/CheckAnswerTrue.mp3")
);
music.CheckAnswerSay.set(
  "false",
  new Audio("songs/LessonDialog/CheckAnswerFalse.mp3")
);

music.greetDays.set(1, new Audio("songs/LessonDialog/greetDays/1d.mp3"));
music.greetDays.set(2, new Audio("songs/LessonDialog/greetDays/2d.mp3"));
music.greetDays.set(3, new Audio("songs/LessonDialog/greetDays/3d.mp3"));
music.greetDays.set(4, new Audio("songs/LessonDialog/greetDays/4d.mp3"));
music.greetDays.set(5, new Audio("songs/LessonDialog/greetDays/5d.mp3"));

music.clockSong.set(0, new Audio("songs/tik-tak.mp3"));
music.clockSong.set(1, new Audio("songs/budilnik1.mp3"));


// Functions

function startDay(data, day, ms, callBackFn, ...args) {
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

export {
  music,
  startDay
}

// export function playAudio(audio) {
//   return new Promise((resolve) => {
//     audio.play();
//     audio.onended = () => {
//       resolve();
//     };
//   });
// }