import { shuffleMultipleTimes } from './QuizCode.js';
import { questions } from './løsningsforslag.js';
let wrongAnswers = [];
// Brug evt. 20 shuffle "omgange" eller vælg et andet tal
let shuffelQuestions = shuffleMultipleTimes(20);
let currentIndex = 0;

// Funktion til at vise billedet
export function showImage(){
    const quizimage = document.getElementById('Question');
    quizimage.src = shuffelQuestions[currentIndex].Question;
}

// Funktion til at gå til næste spørgsmål
export function nextQuestion(){
    currentIndex++;
    if(currentIndex >= shuffelQuestions.length){
        // Hvis du ikke vil have en uendelig loop, kan du fx vise scoren her
        displayFinalScore();
        return;
    }
    showImage();
}

// Tjekker om det valgte svar (en indexværdi) er korrekt
export function checkAnswer(answer){
    const correctAnswer = shuffelQuestions[currentIndex].correctAnswer;
    return answer === correctAnswer;
}

// En simpel score funktion – husk at kalde denne efter hvert svar
export function score(){
    let score = 0;
    let totalQuestions = shuffelQuestions.length;
    // Eksempel: her tjekkes det for det aktuelle spørgsmål
    if(checkAnswer(shuffelQuestions[currentIndex].correctAnswer)){
        score++;
    }
    
    if(currentIndex === totalQuestions - 1){
        alert(`Your score is ${score} out of ${totalQuestions}`);
    }
}

// Samler ID for forkerte svar
export function WrongAnswers(){
    if(!checkAnswer(shuffelQuestions[currentIndex].correctAnswer)){
        wrongAnswers.push(shuffelQuestions[currentIndex].ID);
    }
}

// Viser afsluttende score – tilpasses efter behov
function displayFinalScore(){
    const container = document.getElementById('quiz-container');
    container.innerHTML = `<h2>Quiz færdig!</h2>
                           <p>Din score: ${shuffelQuestions.reduce((acc, q, i) => acc + (checkAnswer(q.correctAnswer) ? 1 : 0), 0)} ud af ${shuffelQuestions.length}</p>`;
}

// Når siden indlæses, vises det første spørgsmål
document.addEventListener('DOMContentLoaded', () => {
    showImage();

    // Her kan du evt. sætte event listeners på dine svar-knapper
    // Eksempel, hvis du har knapper med id svar1, svar2, ...:
    document.getElementById('svar1').addEventListener('click', () => handleAnswer(0));
    document.getElementById('svar2').addEventListener('click', () => handleAnswer(1));
    document.getElementById('svar3').addEventListener('click', () => handleAnswer(2));
    document.getElementById('svar4').addEventListener('click', () => handleAnswer(3));

    // Næste-knap
    document.getElementById('next-button').addEventListener('click', () => {
        nextQuestion();
        clearAnswerButtons();
    });
});

// Eksempel på at håndtere et svar med farvefeedback
function handleAnswer(selectedIndex) {
    const correct = checkAnswer(selectedIndex);
    // Marker knapperne med farver (grøn for rigtigt, rød for forkert)
    const btns = document.querySelectorAll('.answer-btn');
    btns.forEach((btn, index) => {
        if(index === shuffelQuestions[currentIndex].correctAnswer){
            btn.classList.add('correct');
        } else if(index === selectedIndex && !correct){
            btn.classList.add('incorrect');
        }
        // Deaktiver alle knapper, så brugeren ikke kan svare flere gange
        btn.disabled = true;
    });
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
    const rådgivningContent = document.querySelector('.content:nth-of-type(3) .visuel-subheading');
    rådgivningContent.innerHTML = ''; // Ryd eksisterende indhold

    questions.forEach(question => {
        const questionElement = document.createElement('div');
        questionElement.innerHTML = `
            <h3>Opgave ${question.ID}</h3>
            <img src="${question.questions}" alt="Opgave ${question.ID}">
            <p><strong>Facit:</strong> ${question.facit}</p>
            <p><strong>Løsningsforslag:</strong> ${question.løsningsforslag}</p>
        `;
        rådgivningContent.appendChild(questionElement);
    });
}