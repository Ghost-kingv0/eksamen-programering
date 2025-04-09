const { questions } = require('./opgaver.js');



function shuffleMultipleTimes(times) {
    let shuffledArray = [...questions]; // Create a copy to avoid modifying the original array
    for (let i = 0; i < times; i++) {
        shuffledArray.sort(() => Math.random() - 0.5);
    }
    return shuffledArray;
}

 Medule.exports = { shuffleMultipleTimes };
 
function keepingScore(){}
