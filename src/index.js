const questions = [
  {
    question:
      "2012–2020-жылдарга Кыргыз Республикасынын билим берүүсүн өнүктүрүү стратегиясында (БӨС, 2012) ар бир окуучу окуу процессинде өздөштүрүүгө милдеттүү болгон кандай тапшырмалар коюлган?",
    answers: [
      {
        text: "билим берүү стандартынын көлөмүндө керектүү билим, жөндөм, көндүмдөр базасын өздөштүргөн",
        correct: false,
      },
      {
        text: "негизги жана предметтик компетенцияларды өздөштүргөн",
        correct: true,
      },
      {
        text: "билимдин, жөндөмдүн, шыктын зарыл базасын өздөштүргөн окуу планынын чегинде",
        correct: false,
      },
      { text: "билим берүү процессине активдүү катышат", correct: false },
    ],
  },

  {
    question:
      "Маалыматтык, социалдык-коммуникативдик жана «өзүн-өзү башкаруу жана көйгөйдү чечүү кандай компетенцияга кирет?",
    answers: [
      { text: "предметтик", correct: false },
      { text: "мектептик", correct: false },
      { text: "педагогикалык", correct: false },
      { text: "негизги", correct: true },
    ],
  },

  {
    question:
      '"Жалпыга бирдей окутууну долбоорлоо" түшүнүгү Европада жана АКШда өткөн кылымдын 90-жылдарында пайда болгон. Туура жоопту тандагыла:',
    answers: [
      { text: "туура эмес", correct: false },
      { text: "туура", correct: true },
      { text: "билбейм", correct: false },
      { text: "ойлонуш керек", correct: false },
    ],
  },

  {
    question:
      "Кыргызстандагы билим берүү чөйрөсүндө «окутуу үчүн универсалдуу долбоорлоо (дизайн)» түшүнүгү кандай болуп эсептелет?",
    answers: [
      { text: "эски", correct: false },
      { text: "жаңы", correct: true },
      { text: "толук", correct: false },
      { text: "сонун", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach(function (answer) {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
     if (answer.correct) {
       button.dataset.correct = answer.correct;
     }
    button.addEventListener("click", selectAnswer);
   });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach(function (button) {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}


function showScore() {
  resetState();
  questionElement.innerHTML = `Вы набрали ${score} балл из ${questions.length}`;
  nextButton.innerHTML = "Играть снова";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", function () {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();