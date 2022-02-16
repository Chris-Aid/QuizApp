let questions = [
    {
        "question": "Wer hat JavaScript erfunden?",
        "answer_1": "Thomas Gottschalk",
        "answer_2": "Eric Cartman",
        "answer_3": "Brendan Eich",
        "answer_4": "Michael Ballack",
        "right_answer": 3
    },
    {
        "question": "In welchem ​​Jahr ist die Titanic am 15. April auf ihrer Jungfernfahrt von Southampton im Atlantik gesunken?",
        "answer_1": "1912",
        "answer_2": "2012",
        "answer_3": "1966",
        "answer_4": "1945",
        "right_answer": 1
    },
    {
        "question": "Was ist die Lebensdauer einer Libelle?",
        "answer_1": "3 Jahre",
        "answer_2": "4 Wochen",
        "answer_3": "1 Tag",
        "answer_4": "2 Monate",
        "right_answer": 4
    },
    {
        "question": "In welchem ​​Jahr wurde The Godfather zum ersten Mal veröffentlicht?",
        "answer_1": "1968",
        "answer_2": "1972",
        "answer_3": "1978",
        "answer_4": "1982",
        "right_answer": 2
    },
    {
        "question": "Welche amerikanische Popgruppe der 1960er Jahre hat den Surfin Sound kreiert?",
        "answer_1": "Beatles",
        "answer_2": "Beach Boys",
        "answer_3": "Haze Shuttle",
        "answer_4": "Metallica",
        "right_answer": 2
    },
    {
        "question": " Wer hat einen Hammer und eine Feder auf den Mond fallen lassen, um zu demonstrieren, dass sie ohne Luft gleich schnell fallen?",
        "answer_1": "David R. Scott",
        "answer_2": "Rupert Grey",
        "answer_3": "Edinson Ferger",
        "answer_4": "Petricia Fade",
        "right_answer": 1
    },
    {
        "question": "Welcher Künstler schuf 1962 'Campbell's Soup Cans'?",
        "answer_1": "Andy Warhol",
        "answer_2": "Michael Scott",
        "answer_3": "Henry Moore",
        "answer_4": "Peter Griffin",
        "right_answer": 1
    }
];

let correctAnswers = 0;
let currentQuestion = 0;
let currentCardNumber = 1;

let audio_success = new Audio('audio/correct.mp3');
let audio_fail = new Audio('audio/wrong.mp3');

function init() {
    showNumberOfCard();
    showQuestion();
}

function showNumberOfCard() {
    document.getElementById('numberOfCard').innerHTML = questions.length;
    document.getElementById('currentCardNumber').innerHTML = `${currentCardNumber}`;
}

function showQuestion() {

    if (gameIsOver()) {
        showEndScreen();
    } else {
        showNextCard();
    }
}

function gameIsOver() {
    return currentQuestion >= questions.length
}

function showNextCard() {

    calculateProgress();

    let x = questions[currentQuestion];
    document.getElementById('questionText').innerHTML = x.question;
    document.getElementById('answer_1').innerHTML = x.answer_1;
    document.getElementById('answer_2').innerHTML = x.answer_2;
    document.getElementById('answer_3').innerHTML = x.answer_3;
    document.getElementById('answer_4').innerHTML = x.answer_4;
}

function calculateProgress() { // function calculates the progress and displays it in the progress bar!
    let percent = currentQuestion / questions.length;
    percent = Math.round(percent * 100);
    document.getElementById('progressbar').style = `width: ${percent}%`;
}

function answer(selection) {
    rightAnswer = questions[currentQuestion].right_answer;
    if (selection == "answer_" + rightAnswer) {
        document.getElementById(selection).parentNode.classList.add('bg-success');
        correctAnswers++;
        audio_success.play();
    } else {
        document.getElementById(selection).parentNode.classList.add('bg-danger');
        document.getElementById('answer_' + rightAnswer).parentNode.classList.add('bg-success');
        audio_fail.play();
    }
    document.getElementById('next-button').disabled = false;
}

function nextQuestion() {
    currentQuestion++;
    currentCardNumber++;

    document.getElementById('next-button').disabled = true;

    resetButtons();
    showQuestion();
    showNumberOfCard();
}

function resetButtons() { // background-color of right and wrong answers gets removed
    document.getElementById(`answer_1`).parentNode.classList.remove('bg-success');
    document.getElementById(`answer_2`).parentNode.classList.remove('bg-success');
    document.getElementById(`answer_3`).parentNode.classList.remove('bg-success');
    document.getElementById(`answer_4`).parentNode.classList.remove('bg-success');

    document.getElementById(`answer_1`).parentNode.classList.remove('bg-danger');
    document.getElementById(`answer_2`).parentNode.classList.remove('bg-danger');
    document.getElementById(`answer_3`).parentNode.classList.remove('bg-danger');
    document.getElementById(`answer_4`).parentNode.classList.remove('bg-danger');
}

function showEndScreen() {
    document.getElementById('container').style = "display: none";
    document.getElementById('endScreen').classList.remove('dontShow');

    amountOfCorrectAnswers();
}

function amountOfCorrectAnswers() {
    document.getElementById('correctAnswers').innerHTML = correctAnswers;
    document.getElementById('maximumAnswers').innerHTML = questions.length;
}

function restartGame() { // function resets current question and current card number, hides the overview container and resets the game!
    currentQuestion = 0;
    currentCardNumber = 1;

    document.getElementById('container').style = "";
    document.getElementById('endScreen').classList.add('dontShow');

    init();
}