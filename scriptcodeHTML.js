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

    // Opdater billedet
    quizimage.src = shuffelQuestions[currentIndex].Question;

    // Opdater svarmulighederne på knapperne
    const answers = shuffelQuestions[currentIndex].answer; // Hent svarmulighederne
    const buttons = document.querySelectorAll('.answer-btn'); // Find alle svar-knapper

    buttons.forEach((button, index) => {
        if (answers[index] !== undefined) {
            button.textContent = answers[index]; // Sæt teksten på knappen til svarmuligheden
            button.style.display = 'inline-block'; // Sørg for, at knappen vises
        } else {
            button.style.display = 'none'; // Skjul knappen, hvis der ikke er en svarmulighed
        }
    });
}
function nextQuestion() {
    currentIndex++;
    if (currentIndex >= shuffelQuestions.length) {
        console.log('Quizzen er færdig');
        score(); // Vis scoren, når quizzen er færdig
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
                console.log('Brugerens svar:', answer, 'Korrekt svar:', correctAnswer); // Debugging
                return answer === correctAnswer;
            }

            function score() {
                console.log('score() blev kaldt'); // Debugging
                console.log('Korrekte svar:', correctAnswersCount); // Debugging
                console.log('Antal spørgsmål:', shuffelQuestions.length); // Debugging
                const totalQuestions = shuffelQuestions.length;
            
                // Find scoreboard-elementerne
                const scoreboard = document.getElementById('scoreboard');
                const scoreText = document.getElementById('score-text');
            
                // Opdater teksten med scoren
                scoreText.textContent = `Du fik ${correctAnswersCount} ud af ${totalQuestions} rigtige!`;
            
                // Vis score-sektionen
                scoreboard.style.display = 'block';
            }
 function WrongAnswers() {
    if (!checkAnswer(shuffelQuestions[currentIndex].correctAnswer)) {
        wrongAnswers.push(shuffelQuestions[currentIndex].ID);
    }
}
function handleAnswer(answerIndex) {
    if (checkAnswer(answerIndex)) {
        alert('Korrekt svar!');
        correctAnswersCount++; // Øg tælleren for korrekte svar
        console.log('Korrekte svar:', correctAnswersCount); // Debugging
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
