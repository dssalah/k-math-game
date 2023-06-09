

// Set up the game
const questions = [
    { question: "Add:\n 0 + 1", answer: "1", choices: ["0", "1", "2", "3"] },
    { question: "Subtract:\n 4 - 2", answer: "2", choices: ["0", "1", "2", "3"] },
    { question: "Add:\n 2 + 4", answer: "6", choices: ["4", "5", "6", "7"] },
    { question: "Subtract:\n 6 - 2", answer: "4", choices: ["2", "3", "4", "5"] },
    { question: "Subtract:\n 4 - 1", answer: "3", choices: ["1", "2", "3", "4"] },
    { question: "Add:\n 5 + 0", answer: "5", choices: ["4", "5", "6", "7"] },
    { question: "Subtract:\n 9 - 2", answer: "7", choices: ["5", "6", "7", "8"] },
    { question: "Subtract:\n7  - 3", answer: "4", choices: ["2", "3", "4", "5"] },
    { question: "Add:\n 8 + 1", answer: "9", choices: ["7", "8", "9", "10"] },
    { question: "Add:\n 9 + 1", answer: "10", choices: ["8", "9", "10", "11"] },
];



const gameContainer = document.getElementById("game");
gameContainer.style.visibility = "hidden";
const gamecontainer = document.getElementById("game-info");
gamecontainer.style.visibility = "hidden";

const totalQuestions = 10;
const incrementWidth = 1100 / totalQuestions;

let score = 0;
let lives = 4;
let progression = 0;
let cowIcon = "";
let cowCount = 0;
let currentQuestionIndex = 0;
let numTries = 0; // variable to keep track of number of tries

// Display the current question

function displayQuestion() {
    const questionElement = document.getElementById('question');
    const choicesElement = document.getElementById('choices');
    const nextButton = document.getElementById('next-button');
    const tryAgainButton = document.getElementById('try-again-button');





    // Enable the Next Question button if the user has tried three times or less
    if (numTries < 3) {
        nextButton.disabled = true;
    } else {
        nextButton.disabled = false;

    }

    // Display the current question and choices
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    choicesElement.innerHTML = '';
    currentQuestion.choices.forEach(choice => {
        const choiceElement = document.createElement('button');
        choiceElement.textContent = choice;
        choiceElement.onclick = checkAnswer;
        choicesElement.appendChild(choiceElement);
    });
    return;
}




function checkAnswer() {
    const answerElement = document.getElementById('answer');
    const feedbackElement = document.getElementById('feedback');
    const scoreElement = document.getElementById('score');
    const progressionElement = document.getElementById('progression')
    const cowIconElement = document.getElementById('cowIcon');
    const cowCountElement = document.getElementById('cow-count');
    const livesElement = document.getElementById('lives');
    const successAudio = new Audio('assets/audio/success.mp3');
    const tryagainAudio = new Audio('assets/audio/try-again2.mp3');
    const failAudio = new Audio('assets/audio/fail.mp3');

    const userAnswer = answerElement.value.trim();

    if (userAnswer === questions[currentQuestionIndex].answer) {
        feedbackElement.textContent = 'Correct!';
        feedbackElement.classList.add('success');
        successAudio.play();
        score++;
        progression++;
        cowCount++;
        numTries = 0; // reset number of tries if answer is correct

        // Calculate the width of the progress bar
        const width = 110 * score;
        // calculate a new hue based on the score
        const hue = score * 100;
        // Update the width of the progress bar
        progressionElement.style.width = `${width}px`;
        // set the background color to the new hue
        progressionElement.style.backgroundColor = `hsl(${hue}, 70%, 50%)`;

    } else {
        numTries++;
        if (numTries >= 3) {
            feedbackElement.textContent = 'No wrong answer sorry, you have reached the maximum number of tries for this question.';
            feedbackElement.classList.remove('success');
            feedbackElement.classList.add("fail");
            failAudio.play();
            numTries = 0; // reset number of tries
            lives--;

            if (lives <= 0) { // check if lives is less than or equal to 1
                endGame(); // call endGame function to end the game
                return; // exit the function
            }

        } else {
            feedbackElement.textContent = 'Incorrect. Try again!';
            feedbackElement.classList.remove('success');
            feedbackElement.classList.add("fail");
            tryagainAudio.play();
            return; // exit the function early and don't update the currentQuestionIndex
        }
    }

    // Show feedback and update score
    answerElement.value = questions[currentQuestionIndex].answer;
    feedbackElement.style.display = 'block';
    scoreElement.textContent = "SCORE:" + score + "/10";
    progressionElement.textContent = '🐄'.repeat(cowCount);;
    cowCountElement.textContent = '🐄'.repeat(cowCount);



    var livesText = '';
    for (var i = 0; i < lives; i++) {
        livesText += '❤️ ';
    }
    livesElement.textcontent = livesText;
    console.log(livesText);

    
    currentQuestionIndex++;
    if (currentQuestionIndex === questions.length) {
        endGame();
    }
    if (answerElement.value === questions[currentQuestionIndex - 1].answer) {

        // correct answer lingers 
        answerElement.value = "Correct: " + questions[currentQuestionIndex - 1].answer;
        // Waits for some time before clearing the answer element
        setTimeout(function () {
            answerElement.value = '';
            displayQuestion();
        }, 5000); // Wait for 2 seconds before clearing the answer element
    } else if  (answerElement.value != questions[currentQuestionIndex - 1].answer) {
    
        answerElement.value = questions[currentQuestionIndex - 1].answer;
        // Waits for some time before clearing the answer element
        console.log(answerElement.value);
        setTimeout(function () {
            answerElement.value = '';
            displayQuestion();
        }, 5000); // Waits for 2 seconds before clearing the answer element
    }



}





function endGame() {
    const gameContainer = document.getElementById("game");
    gameContainer.style.visibility = "hidden";
    const gamecontainer = document.getElementById("game-info");
    gamecontainer.style.visibility = "hidden";

    const storyTextElement = document.getElementById('story-text');
    const feedbackElement = document.getElementById('feedback');
    const scoreElement = document.getElementById('score');
    const gameElement = document.getElementById('game');
    const storyElement = document.getElementById('story');


    const accuracy = Math.round((score / questions.length) * 100);

    // Check if the user has passed or failed the game
    if (accuracy >= 70) {
        storyTextElement.textContent = `Great job! You answered ${score} out of ${questions.length} questions correctly (${accuracy}%). You helped the Questionbot bring their cow friend back to the barn!`;
        storyTextElement.classList.add('success');
    } else {
        storyTextElement.textContent = `Oh no! You answered only ${score} out of ${questions.length} questions correctly (${accuracy}%). No worries! Questionbot would kindly ask you to try again whenever you're ready!.`;
        storyTextElement.classList.add('fail');
    }

    feedbackElement.style.display = 'none';
    scoreElement.style.display = 'none';

    // Animate victory or defeat sign
    const resultElement = document.createElement('div');
    resultElement.classList.add('result');
    if (accuracy >= 50) {
        resultElement.textContent = 'Hooray, you did it!';
        resultElement.classList.add('success');
    } else {
        resultElement.textContent = 'Dont give up yet!';
        resultElement.classList.add('fail');
    }
    storyElement.appendChild(resultElement);


    // Wait 3 seconds and reload the page to play again
    setTimeout(() => location.reload(), 3000);
}

// Display the first question && hide game before play is pressed
setTimeout(() => {
    const gameContainer = document.getElementById("game");
    gameContainer.style.visibility = "hidden";
    const gamecontainer = document.getElementById("game-info");
    gamecontainer.style.visibility = "hidden";
}, 4000); displayQuestion();


/* async function loadParticles(options) {
   await loadFireworksPreset(tsParticles);
 
   await tsParticles.load(options);
 }
 
 const configs = { preset: "fireworks" };
 
 loadParticles(configs);
 
 

 
 
 */

function startTimer() {
    var startTime = Date.now();
    setInterval(function () {
        var elapsedTime = Date.now() - startTime;
        var hours = Math.floor(elapsedTime / (1000 * 60 * 60));
        var minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
        var timerElement = document.getElementById('timer');
        timerElement.textContent = padZero(hours) + ':' + padZero(minutes) + ':' + padZero(seconds);
    }, 1000);
}

function padZero(num) {
    return (num < 10 ? '0' : '') + num;
}
