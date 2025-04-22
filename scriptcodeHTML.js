import { shuffleMultipleTimes } from './QuizCode.js';
import { solutions } from './løsningsforslag.js';

let shuffelQuestions = shuffleMultipleTimes(20);
let currentIndex = 0;
let wrongAnswers = [];
// Brug evt. 20 shuffle "omgange" eller vælg et andet tal .skal slettes



function showImage() {
    console.log(shuffelQuestions); // Debugging: Tjek, om data er korrekt
    console.log(currentIndex); // Debugging: Tjek, om currentIndex er korrekt

    const quizimage = document.getElementById('Question');
    if (!quizimage) {
        console.error('Elementet med id="Question" blev ikke fundet.');
        return;
    }

    if (!shuffelQuestions[currentIndex]) {
        console.error('Spørgsmålet findes ikke i shuffelQuestions.');
        return;
    }

    quizimage.src = shuffelQuestions[currentIndex].Question; // Sørg for, at 'Question' er korrekt stavet
    
}
 function nextQuestion() {
    currentIndex++;
    if (currentIndex >= shuffelQuestions.length) {
        alert("Du har gennemført quizzen!");
        return; // Stopper funktionen
    }
    showImage();
}
window.nextQuestion = nextQuestion;
showImage();

            //husk at fixe så den ikke bliver ved med at loope 
 
            function checkAnswer(answer) {
                if (!shuffelQuestions[currentIndex]) {
                    console.error('Spørgsmålet findes ikke!');
                    return false;
                }
                const correctAnswer = shuffelQuestions[currentIndex].correctAnswer;
                return answer === correctAnswer;
            }

            function score() {
                let score = 0;
                let totalQuestions = shuffelQuestions.length;
            
                // Beregn scoren
                if (checkAnswer(shuffelQuestions[currentIndex].correctAnswer)) {
                    score++;
                }
            
                // Hvis det er det sidste spørgsmål, vis scoren
                if (currentIndex === totalQuestions - 1) {
                    const scoreboard = document.getElementById('scoreboard');
                    const scoreText = document.getElementById('score-text');
            
                    // Opdater teksten med scoren
                    scoreText.textContent = `Du fik ${score} ud af ${totalQuestions} rigtige!`;
            
                    // Vis score-sektionen
                    scoreboard.style.display = 'block';
                }
            }
 function WrongAnswers() {
    if (!checkAnswer(shuffelQuestions[currentIndex].correctAnswer)) {
        wrongAnswers.push(shuffelQuestions[currentIndex].ID);
    }
}
function handleAnswer(answerIndex) {
    if (checkAnswer(answerIndex)) {
        alert('Korrekt svar!');
    } else {
        alert('Forkert svar!');
    }
    nextQuestion();
}
window.handleAnswer = handleAnswer;
// Funktion til at rydde farverne og aktivere knapperne til næste spørgsmål
function clearAnswerButtons() {
    const btns = document.querySelectorAll('.answer-btn');
    btns.forEach(btn => {
        btn.classList.remove('correct', 'incorrect');
        btn.disabled = false;
    });
}

export function showAllSolutions() {
    console.log('Viser løsninger...');
    const solutionsContainer = document.getElementById('solutions-container');
    solutionsContainer.innerHTML = ''; // Ryd eksisterende indhold

    solutions.forEach(solution => {
        const solutionElement = document.createElement('div');
        solutionElement.innerHTML = `
            <h3>Opgave ${solution.ID}</h3>
            <img src="${solution.questions}" alt="Opgave ${solution.ID}">
            <p><strong>Facit:</strong> ${solution.facit}</p>
            <p><strong>Løsningsforslag:</strong> ${solution.løsningsforslag}</p>
        `;
        solutionsContainer.appendChild(solutionElement);
    });
}
document.addEventListener('DOMContentLoaded', () => {
    // Find "Rådgivning"-fanen (tredje fane)
    const rådgivningTab = document.querySelector('.tab:nth-child(3)');

    // Tilføj en event listener til at kalde showAllSolutions
    rådgivningTab.addEventListener('click', () => {
        showAllSolutions();
    });
});
