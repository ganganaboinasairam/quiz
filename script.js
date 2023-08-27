const openingPage = document.querySelector(".opening-page");
const startQuizButton = document.querySelector(".start-quiz-btn");
const categorySelection = document.querySelector(".category-selection");
const categoryButtons = document.querySelectorAll(".category-btn");
const quizPage = document.querySelector(".quiz-page");
const quizTitle = document.querySelector(".quiz-title");
const questionContainer = document.querySelector(".question-container");
const questionText = document.querySelector(".question-text");
const optionsList = document.querySelector(".options-list");
const timerElement = document.querySelector(".timer");
const timeRemaining = document.querySelector(".time-remaining");
const resultPages = document.querySelectorAll(".result-page");
const winnerPage = document.querySelector(".winner");
const loserPage = document.querySelector(".loser");
const scoreElements = document.querySelectorAll(".score");

const quizCategories = {
  general: "General Knowledge",
  science: "Science",
  maths: "Mathematics",
  // Add more categories here
};

const quizQuestions = {
  general: [
    {
      question: "What is the capital of Australia?",
      options: ["Canberra", "Sydney", "Melbourne", "Perth"],
      correctOption: 1,
    },
    {
      question: "Who painted the Mona Lisa?",
      options: [
        "Pablo Picasso",
        "Leonardo da Vinci",
        "Vincent van Gogh",
        "Michelangelo",
      ],
      correctOption: 0,
    },
    {
      question: "Who is the Present President of india?",
      options: [
        "Narendra Modi",
        "Draupadi Murmu",
        "A.p.J abdul kalam",
        "Ram Nath Kovind",
      ],
      correctOption: 1,
    },
    {
      question: "What are flesh eating Animals",
      options: ["Carnivores", "Herbivores", "Omnivores", "None"],
      correctOption: 0,
    },
    {
      question: "What is the lander name of Chandrayan-3",
      options: ["Nambi", "Raghu", "Ramu", "Vikram"],
      correctOption: 3,
    },

    // Add more questions here
  ],
  science: [
    {
      question: "What is the chemical symbol for the element oxygen?",
      options: ["O", "O2", "Ox", "Om"],
      correctOption: 1,
    },
    {
      question: 'Which planet is known as the "Red Planet"?',
      options: ["Earth", "Venus", "Jupiter", "Mars"],
      correctOption: 3,
    },
    {
      question: "What is the food making process in plants",
      options: ["Sunlight Effect", "Cooking", "Photosynthesis", "None"],
      correctOption: 2,
    },
    {
      question: "What is the chemical symbol for the element gold?",
      options: ["Au", "Go", "Gl", "Ge"],
      correctOption: 0,
    },
    {
      question: "Which gas do plants absorb from the atmosphere?",
      options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
      correctOption: 2,
    },
    // Add more questions here
  ],
  maths: [
    {
      question: "What is the sum of 2 + 3?",
      options: ["4", "5", "6", "7"],
      correctOption: 1,
    },
    {
      question: "If x = 5 and y = 8, what is the value of x + y?",
      options: ["10", "12", "13", "15"],
      correctOption: 2,
    },
    {
      question: "What is the result of 6 multiplied by 9?",
      options: ["45", "48", "54", "60"],
      correctOption: 2,
    },
    {
      question: "If a = 12 and b = 4, what is the value of a divided by b?",
      options: ["2", "3", "4", "6"],
      correctOption: 1,
    },
    {
      question: "What is the square root of 25?",
      options: ["3", "4", "5", "6"],
      correctOption: 2,
    },
  ],
};

let currentCategory = null;
let currentQuestionIndex = 0;
let userScore = 0;
let timerInterval;

function startQuiz(category) {
  currentCategory = category;
  currentQuestionIndex = 0;
  userScore = 0;
  showQuizPage();
  loadNextQuestion();
  startTimer();
}

function loadNextQuestion() {
  if (currentQuestionIndex < quizQuestions[currentCategory].length) {
    const currentQuestion =
      quizQuestions[currentCategory][currentQuestionIndex];
    questionText.textContent = currentQuestion.question;
    optionsList.innerHTML = "";

    currentQuestion.options.forEach((option, index) => {
      const optionElement = document.createElement("li");
      optionElement.textContent = option;
      optionElement.classList.add("option");
      optionElement.addEventListener("click", () => checkAnswer(index));
      optionsList.appendChild(optionElement);
    });

    currentQuestionIndex++;
  } else {
    clearInterval(timerInterval);
    finishQuiz();
  }
}

function checkAnswer(selectedOption) {
  const correctOption =
    quizQuestions[currentCategory][currentQuestionIndex - 1].correctOption;

  console.log("Selected Option:", selectedOption);
  console.log("Correct Option:", correctOption);

  if (selectedOption === correctOption) {
    userScore++;
  }

  loadNextQuestion();
}

function startTimer() {
  let timeLeft = 50; // Initial time in seconds

  // Display initial time
  timeRemaining.textContent = timeLeft;

  timerInterval = setInterval(() => {
    timeLeft--;
    timeRemaining.textContent = timeLeft;

    if (timeLeft === 0) {
      clearInterval(timerInterval);
      checkAnswer(null); // Move to the next question
    }
  }, 1000);
}

function finishQuiz() {
  quizPage.style.display = "none";
  const isWinner = userScore >= 4;
  showResultPage(isWinner);
}

function showResultPage(isWinner) {
  hideAllResultPages();
  if (isWinner) {
    winnerPage.style.display = "block";
    scoreElements.forEach((scoreElement) => {
      scoreElement.textContent = userScore;
    });
  } else {
    loserPage.style.display = "block";
    scoreElements.forEach((scoreElement) => {
      scoreElement.textContent = userScore;
    });
  }
}

function showQuizPage() {
  openingPage.style.display = "none";
  categorySelection.style.display = "none";
  quizPage.style.display = "block";
  hideAllResultPages();
}

function hideAllResultPages() {
  resultPages.forEach((page) => {
    page.style.display = "none";
  });
}

startQuizButton.addEventListener("click", () => {
  openingPage.style.display = "none";
  categorySelection.style.display = "block";
});

categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedCategory = button.getAttribute("data-category");
    startQuiz(selectedCategory);
  });
});
