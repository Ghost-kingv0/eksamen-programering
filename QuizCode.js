const { questions } = require('./opgaver.js');

// Create a shallow copy of the questions array
let b = [...questions];

function shuffleMultipleTimes(array, times) {
    let shuffledArray = [...array]; // Create a copy to avoid modifying the original array
    for (let i = 0; i < times; i++) {
        shuffledArray.sort(() => Math.random() - 0.5);
    }
    return shuffledArray;
}

// Shuffle the copied array 20 times
let a = shuffleMultipleTimes(b, 20);


console.log(a);
console.log(a[0].answer[0]);


function keepingScore(){}