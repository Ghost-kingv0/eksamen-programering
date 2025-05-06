import { shuffleMultipleTimes } from './QuizCode.js';
import { solutions } from './løsningsforslag.js';

let shuffelQuestions = shuffleMultipleTimes(20);
let currentIndex = 0;
let wrongAnswers = [];
// Brug evt. 20 shuffle "omgange" eller vælg et andet tal .skal slettes



function showImage() {

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
        showEndScreen(); // Vis slutskærmen, når alle spørgsmål er besvaret
        return; // Stopper funktionen
    }
    showImage();
}
window.nextQuestion = nextQuestion;
showImage();
function showEndScreen() {
    const totalQuestions = shuffelQuestions.length;
    const correctAnswersCount = totalQuestions - wrongAnswers.length;

    // Vis resultatet som en alert
    alert(`Quizzen er færdig! Du fik ${correctAnswersCount} rigtige ud af ${totalQuestions} spørgsmål.`);
}
            //husk at fixe så den ikke bliver ved med at loope 
 
            function checkAnswer(answer) {
                if (!shuffelQuestions[currentIndex]) {
                    console.error('Spørgsmålet findes ikke!');
                    return false;
                }
                const correctAnswer = shuffelQuestions[currentIndex].correctAnswer;
                return answer === correctAnswer; // Sammenlign brugerens svar med det korrekte svar
            }

        
       

function handleAnswer(answerIndex) {

    if (checkAnswer(answerIndex)) {
        alert('Korrekt svar!');
    } else {
        alert('Forkert svar!');
        wrongAnswers.push(shuffelQuestions[currentIndex].ID); // Registrer spørgsmålets ID som forkert
    }
    nextQuestion(); // Gå til næste spørgsmål
}

window.handleAnswer = handleAnswer;
// Funktion til at rydde farverne og aktivere knapperne til næste spørgsmål


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
