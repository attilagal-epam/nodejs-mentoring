import { run as getRandomNumber } from "./module1";
import { run as activityMonitor } from "./module2";

const moduleSolutions = [
    getRandomNumber,
    activityMonitor
]

// read the number from the command line but default to 1
const moduleNumber = parseInt(process.argv[2]) || 1;


// Tell user which module number was selected
console.log(`Selected module: ${moduleNumber}`);

// Execute selected module solution
const selectedModule = moduleSolutions[moduleNumber - 1];

selectedModule();
