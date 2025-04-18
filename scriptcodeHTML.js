import { shuffleMultipleTimes } from './QuizCode.js';
import { solutions } from './løsningsforslag.js'

let shuffelQuestions = shuffleMultipleTimes(20)
let currectIndex = 0
let wrongAnswers = [];
// Brug evt. 20 shuffle "omgange" eller vælg et andet tal .skal slettes



 function showImage(){
    const quizimage = document.getElementById('Question')
    quizimage.src = shuffelQuestions[currentIndex].Question
 }
 function nextQuestion(){
    currentIndex++
    if(currentIndex >= shuffelQuestions.length){
        currentIndex = 0
    }
showImage();

            //husk at fixe så den ikke bliver ved med at loope 
 }

 function checkAnswer(answer){

    const correctAnswer = shuffelQuestions[currentIndex].correctAnswer
    const result = answer === correctAnswer
    return result
 }

 function score(){
   let score = 0 
    let totalQuestions = shuffelQuestions.length
    if(checkAnswer(shuffelQuestions[currentIndex].correctAnswer)){
        score++
    }

    if(currectIndex === totalQuestions - 1){
        alert(`Your score is ${score} out of ${totalQuestions}`)
    }
 }

 function WrongAnswers() {
    if (!checkAnswer(shuffelQuestions[currentIndex].correctAnswer)) {
        wrongAnswers.push(shuffelQuestions[currentIndex].ID);
    }
}

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
