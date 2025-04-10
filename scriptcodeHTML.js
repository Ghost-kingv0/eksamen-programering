const {shuffleMultipleTimes} =require('./QuizCode')

let wrongAnswers = []

let shuffelQuestions = shuffleMultipleTimes(20)

 let currectIndex = 0

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

    function WrongAnswers(){
        if(checkAnswer(shuffelQuestions[currentIndex].correctAnswer)){
        wrongAnswers.push(shuffelQuestions[currentIndex].ID)
        }
    }