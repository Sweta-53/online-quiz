const questions = [
  {
    question: "What is the capital of France?",
    choices: ["London", "Berlin", "Paris", "Madrid"],
    correct: 2
  },
  {
    question: "Which planet is known as the Red Planet?",
    choices: ["Venus", "Mars", "Jupiter", "Saturn"],
    correct: 1
  },
  {
    question: "What is 2 + 2?",
    choices: ["3", "4", "5", "6"],
    correct: 1
  },
  {
    question: "Who painted the Mona Lisa?",
    choices: ["Van Gogh", "Da Vinci", "Picasso", "Rembrandt"],
    correct: 1
  },
  {
    question: "What is the largest ocean on Earth?",
    choices: ["Atlantic", "Indian", "Arctic", "Pacific"],
    correct: 3
  },
  {
    question: "Which element has the chemical symbol 'O'?",
    choices: ["Gold", "Oxygen", "Osmium", "Organium"],
    correct: 1
  },
  {
    question: "Who is known as the father of computers?",
    choices: ["Alan Turing", "Charles Babbage", "Steve Jobs", "Bill Gates"],
    correct: 1
  },
  {
    question: "Which country is known as the Land of the Rising Sun?",
    choices: ["China", "Japan", "Thailand", "South Korea"],
    correct: 1
  },
  {
    question: "What is the powerhouse of the cell?",
    choices: ["Nucleus", "Mitochondria", "Ribosome", "Chloroplast"],
    correct: 1
  },
  {
    question: "Which language is used for web development?",
    choices: ["Python", "HTML", "C++", "Java"],
    correct: 1
  },
  {
    question: "What is the speed of light in a vacuum?",
    choices: ["300,000 km/s", "150,000 km/s", "1,000,000 km/s", "450,000 km/s"],
    correct: 0
  },
  {
    question: "Which programming language is known as the backbone of web development?",
    choices: ["JavaScript", "Python", "Java", "C++"],
    correct: 0
  },
  {
    question: "Who wrote 'Hamlet'?",
    choices: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Leo Tolstoy"],
    correct: 1
  },
  {
    question: "What is the smallest prime number?",
    choices: ["0", "1", "2", "3"],
    correct: 2
  },
  {
    question: "In which year did the Titanic sink?",
    choices: ["1910", "1912", "1915", "1920"],
    correct: 1
  },
  {
    question: "What is the square root of 64?",
    choices: ["6", "7", "8", "9"],
    correct: 2
  },
  {
    question: "What does HTTP stand for?",
    choices: ["HyperText Transfer Protocol", "High Transfer Text Protocol", "Hyper Transfer Text Protocol", "HighText Transmission Protocol"],
    correct: 0
  },
  {
    question: "What is the capital of Australia?",
    choices: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
    correct: 2
  },
  {
    question: "What does RAM stand for?",
    choices: ["Random Access Memory", "Read Access Memory", "Rapid Access Memory", "Read Allocation Memory"],
    correct: 0
  },
  {
    question: "Which gas do plants primarily use during photosynthesis?",
    choices: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
    correct: 2
  }
];
let currentQuestion = 0;
let score = 0;
let timeLeft = 60;
let timer;
let availableQuestions = [];
function startQuiz() {
  timeLeft = 60;
  score = 0;
  availableQuestions = [...questions];
  document.getElementById('home').classList.add('hide');
  document.getElementById('leaderboard').classList.add('hide');
  document.getElementById('quiz').classList.remove('hide');
  document.getElementById('end').classList.add('hide');
  
  startTimer();
  showQuestion();
}
function startTimer() {
  timer = setInterval(() => {
      timeLeft--;
      document.getElementById('timer').textContent = timeLeft;
      if (timeLeft <= 0) {
          endQuiz();
      }
  }, 1000);
}
function showQuestion() {
  if (availableQuestions.length === 0) {
      endQuiz();
      return;
  }
  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  const question = availableQuestions[questionIndex];
  currentQuestion = questionIndex;

  document.getElementById('questionCounter').textContent = `${questions.length - availableQuestions.length + 1}/${questions.length}`;
  document.getElementById('question').textContent = question.question;

  const choices = document.getElementsByClassName('choice-text');
  for (let i = 0; i < choices.length; i++) {
      choices[i].textContent = question.choices[i];
      choices[i].parentElement.addEventListener('click', () => checkAnswer(i));
  }
}
function checkAnswer(choiceIndex) {
  const question = availableQuestions[currentQuestion];
  const correctIndex = question.correct;
  const choiceContainers = document.getElementsByClassName('choice-container');

  if (choiceIndex === correctIndex) {
    // Correct answer
    choiceContainers[choiceIndex].classList.add('correct');
    score += 10;
    document.getElementById('score').textContent = score;
  } else {
    // Wrong answer
    choiceContainers[choiceIndex].classList.add('incorrect');
    choiceContainers[correctIndex].classList.add('correct'); // Highlight the correct answer
    timeLeft -= 10;
    if (timeLeft < 0) timeLeft = 0;
    document.getElementById('timer').textContent = timeLeft;
  }
  setTimeout(() => {
    // Reset classes and move to the next question
    choiceContainers[choiceIndex].classList.remove('correct', 'incorrect');
    choiceContainers[correctIndex].classList.remove('correct');
    availableQuestions.splice(currentQuestion, 1);
    showQuestion();
  }, 2000); // Pause for 2 seconds to show the correct answer
}
function endQuiz() {
  clearInterval(timer);
  document.getElementById('quiz').classList.add('hide');
  document.getElementById('end').classList.remove('hide');
  document.getElementById('finalScore').textContent = `Final Score: ${score}`;
}
function saveHighScore(e) {
  e.preventDefault();
  
  const username = document.getElementById('username').value;
  if (!username) return;

  const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
  highScores.push({ score, username });
  highScores.sort((a, b) => b.score - a.score);
  highScores.splice(5);
  
  localStorage.setItem('highScores', JSON.stringify(highScores));
  goHome();
}
function showLeaderboard() {
  document.getElementById('home').classList.add('hide');
  document.getElementById('leaderboard').classList.remove('hide');
  
  const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
  const highScoresList = document.getElementById('highScoresList');
  
  highScoresList.innerHTML = highScores
      .map(score => `<li class="high-score">${score.username} - ${score.score}</li>`)
      .join('');
}
function goHome() {
  document.getElementById('end').classList.add('hide');
  document.getElementById('leaderboard').classList.add('hide');
  document.getElementById('home').classList.remove('hide');
}