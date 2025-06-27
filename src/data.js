const data = {
  day: 1,
  attempt: 0,
  cash: 0,
  question: new Map(),
  counterQuestion: 0,
  complexity: new Map(),
  lesson: [
    "Math",
    "Eng",
    "geografia"
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
}

data.question.set(1, 5); // question: 20 
data.question.set(2, 30); // question: 30 
data.question.set(3, 30); // question: 30 
data.question.set(4, 40); // question: 40 
data.question.set(5, 50); // question: 50 
data.complexity.set(1, 1); // complexity: 1
data.complexity.set(2, 1); // complexity: 1
data.complexity.set(3, 2); // complexity: 2
data.complexity.set(4, 2); // complexity: 2
data.complexity.set(5, 3); // complexity: 3

export { data };