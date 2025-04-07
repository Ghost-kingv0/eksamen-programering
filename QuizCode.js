import {questions} from "./opgaver"
let b = ([questions])

function shuffleMultipleTimes(array, times) {
    for (let i = 0; i < times; i++) {
        array.sort(() => Math.random() - 0.5);
    }
    return array;
}

let a= shuffleMultipleTimes(b,20)

console.log(a)