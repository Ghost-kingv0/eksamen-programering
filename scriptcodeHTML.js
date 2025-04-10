const {shuffleMultipleTimes} =require('./QuizCode')
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
 }
 function checkAnswer(answer){

    const correctAnswer = shuffelQuestions[currentIndex].correctAnswer
    const result =
 }