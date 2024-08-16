export function task1_1() {
    return getRandomNumber(1000);
}

/*
Parameters: n Number    
Returns: random number between 0 and n
*/
function getRandomNumber(n) {
    return Math.floor(Math.random() * n);
}