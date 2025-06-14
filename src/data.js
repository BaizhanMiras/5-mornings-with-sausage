const data = {
  day: 1,
  attempt: 0,
  cash: 0,
  question: new Map(),
  time: 15,
  complexity: new Map(),
  lesson: [
    "Math",
    // "reaction",
    // "english",
    // "geometry",
    // "geography"
  ],

  things: [
    {
      name: "hammer",
      amount: 0
    },
    {
      name: "hair dryer",
      amount: 0
    },
    {
      name: "eye drops",
      amount: 0
    }
  ],
  music: []
}

data.question.set(1, 10); // question: 20 
data.question.set(2, 10); // question: 30 
data.question.set(3, 10); // question: 30 
data.question.set(4, 10); // question: 40 
data.question.set(5, 10); // question: 50 
data.complexity.set(1, 1); // complexity: 1
data.complexity.set(2, 1); // complexity: 1
data.complexity.set(3, 2); // complexity: 2
data.complexity.set(4, 2); // complexity: 2
data.complexity.set(5, 3); // complexity: 3

data.music[0] = new Audio("songs/Monkeys-Spinning-Monkeys(chosic.com).mp3");
data.music[1] = new Audio("songs/schoolBell.mp3");

export { data };