var startButton = document.getElementById("start-btn");
var nextButton = document.getElementById("next-btn");
var questionContainerElement = document.getElementById("question-container");
var questionElement = document.getElementById("question");
var answerButtonsElement = document.getElementById("answer-buttons");
var Startdiv = document.getElementById("Startdiv");
var scoreInput = document.getElementById("scoreinput");
var Intials = document.getElementById("Initials");
var sumbitIntials = document.getElementById("submitbutton");
var highScorePage = document.getElementById("highscorePage");
var highScoreList = document.getElementById("highscorelist");
var homepagebutton = document.getElementById("homepagebtn");
var clearhighscore = document.getElementById("clearhighbtn");
var timer = document.getElementById("countdown");
var timeleft = 75;
var score = "";


var shuffledQuestions, currentQuestionIndex;

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    setNextQuestion()
})
sumbitIntials.addEventListener("click", addHighScore);
homepagebutton.addEventListener("click", reset);
clearhighscore.addEventListener("click", clearHigh);

function startGame() {
    startButton.classList.add("hide");
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove("hide");
    timer.classList.remove("hide");
    var downloadTimer = setInterval(function(){
    if(timeleft <= 0){
        clearInterval(downloadTimer);
        document.getElementById("countdown").innerHTML = "Finished";
    } else {
        document.getElementById("countdown").innerHTML = timeleft + " seconds remaining";
    }
    timeleft -= 1;
    }, 1000);
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        var button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        } 
        button.addEventListener("click", selectAnswer);
        answerButtonsElement.appendChild(button);
    })
}

function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add("hide");
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    var selectedButton = e.target;
    var correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove("hide");
    } else {
        Startdiv.classList.add("hide");
        scoreInput.classList.remove("hide");
        score = timeleft;
        timer.classList.add("hide");
        timeleft = 0
    }
    if (selectedButton.classList.contains("wrong")) {
        timeleft -= 10
    }
}

function clearStatusClass(element) {
    element.classList.remove("correct");
    element.classList.remove("wrong");
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add("correct");
    } else {
        element.classList.add("wrong");
    }
}

function addHighScore() {
    event.preventDefault();
    var li = document.createElement("li");
    li.innerText = Intials.value + ": Seconds remaining = " + score;
    highScoreList.appendChild(li);
    scoreInput.classList.add("hide");
    highScorePage.classList.remove("hide");
}

function clearHigh() {
    highScoreList.innerHTML = "";
}

function reset() {
    score = 0
    timeleft = 75
    highScorePage.classList.add("hide")
    Startdiv.classList.remove("hide")
    questionContainerElement.classList.add("hide")
    startButton.classList.remove("hide")
}

var questions = [
    {
        question: "Complete the quote: “What are you doing in my...”",
        answers: [
            { text: "...swamp?!", correct: true },
            { text: "...home?!", correct: false },
            { text: "...kingdom?!", correct: false },
            { text: "...bog?!", correct: false }
        ]
    },
    {
        question: "Who is Donkey’s wife?",
        answers: [
            { text: "Pixie", correct: false },
            { text: "Monster", correct: false },
            { text: "Werewolf", correct: false },
            { text: "Dragon", correct: true }
        ]
    },
    {
        question: "How many kids do Shrek and Fiona have?",
        answers: [
            { text: "2", correct: false },
            { text: "3", correct: true },
            { text: "4", correct: false },
            { text: "5", correct: false }
        ]
    },
    {
        question: "Who voices Shrek?",
        answers: [
            { text: "Ben Stiller", correct: false },
            { text: "Chris Farley", correct: false },
            { text: "Mike Myers", correct: true },
            { text: "Jim Carey", correct: false }
        ]
    },
    {
        question: "What’s the name of the giant gingerbread man?",
        answers: [
            { text: "Bongo", correct: false },
            { text: "Longo", correct: false },
            { text: "Congo", correct: false },
            { text: "Mongo", correct: true }
        ]
    }

]