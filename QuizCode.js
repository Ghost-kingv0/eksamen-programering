import { questions } from './opgaver.js';

export function shuffleMultipleTimes(times) {
    let shuffledArray = [...questions];
    for (let i = 0; i < times; i++) {
        shuffledArray.sort(() => Math.random() - 0.5);
    }
    return shuffledArray;
}
 
