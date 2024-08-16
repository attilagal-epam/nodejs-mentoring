// Description: This module exports a function that returns a random number between 0 and 1000.
/*
Parameters: n Number    
Returns: random number between 0 and 1000
*/
export default function getRandomNumber() {
    return Math.floor(Math.random() * 1000);
}