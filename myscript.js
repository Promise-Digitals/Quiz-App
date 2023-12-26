const questions = [
    {
        question: "Who was the strongest man in the Bible?",
        answers: [
            { text: "Daniel", correct: false },
            { text: "Samson", correct: true },
            { text: "David", correct: false },
            { text: "Peter", correct: false },
        ]
    },
    {
        question: "Who was the wealthiest man in the Bible?",
        answers: [
            { text: "John", correct: false },
            { text: "Samuel", correct: false },
            { text: "Solomon", correct: true },
            { text: "Paul", correct: false },
        ]
    },
    {
        question: `Who in the Bible was called "A man after God's Heart"?`,
        answers: [
            { text: "Daniel", correct: false },
            { text: "Samson", correct: false },
            { text: "David", correct: true },
            { text: "Peter", correct: false },
        ]
    },
    {
        question: "Who is the Father of all Nations?",
        answers: [
            { text: "Abraham", correct: true },
            { text: "Samson", correct: false },
            { text: "David", correct: false },
            { text: "Peter", correct: false },
        ]
    },
    {
        question: "Who Built the Ark?",
        answers: [
            { text: "Noah", correct: true },
            { text: "Samson", correct: false },
            { text: "David", correct: false },
            { text: "Judah", correct: false },
        ]
    }
];

const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-button');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = 'Next';
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
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
    }
    else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.style.display = 'block';
    nextButton.innerHTML = "Play Again";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    }
    else {
        showScore();
    }
}

nextButton.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    }
    else {
        startQuiz();
    }
});
startQuiz();

