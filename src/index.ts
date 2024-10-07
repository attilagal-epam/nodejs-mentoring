import { run as getRandomNumber } from "./module1";
import { run as activityMonitor } from "./module2";
import { run as eventEmitterBufferStreams } from "./module3";
import { run as testing } from "./module4";
import { run as network } from "./module5";

const moduleSolutions = [
    getRandomNumber,
    activityMonitor,
    eventEmitterBufferStreams,
    testing,
    network,
]

// read the number from the command line but default to 1
const moduleNumber = (parseInt(process.argv[2]) || 1) % moduleSolutions.length || moduleSolutions.length;


// Tell user which module number was selected
console.log(`Selected module: ${moduleNumber}`);

// Execute selected module solution
const selectedModule = moduleSolutions[moduleNumber - 1];

selectedModule();
