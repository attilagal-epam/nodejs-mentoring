import axios from "axios";
import { EventEmitter, WithTime, exportCsvToTxt } from "./provided";

export const run = () => {
    task1();
    task2().then(
        () => task3()
    );
}

const task1 = () => {
    console.log('Task 1: Event Emitter');

    const emitter = new EventEmitter();

    // Test addListener and emit
    emitter.addListener('testEvent', (data) => console.log(data));
    emitter.emit('testEvent', 'Hello, World!'); // Should log 'Hello, World!'

    // Test listenerCount
    console.log(emitter.listenerCount('testEvent')); // Should log 1

    // Test rawListeners
    console.log(emitter.rawListeners('testEvent')); // Should log [ [Function] ]

    // Test removeListener
    emitter.removeListener('testEvent', console.log);
    console.log(emitter.listenerCount('testEvent')); // Should log 0
    console.log(`-------------------------`);
}

const task2 = () => {
    console.log('Task 2: With Time');

    const fetchFromUrl = (url: string, cb: (error: Error | null, data?: any) => void) => {
    axios.get(url)
        .then((response) => {
            cb(null, response.data);
        })
        .catch((error) => {
            cb(error);
        });
    };
    
    const withTime = new WithTime();
    const endPromise = new Promise((resolve) => withTime.on('end', resolve));
    
    withTime.on('begin', () => console.log('About to execute'));
    withTime.on('data', (data) => console.log('Data:', data));
    withTime.on('end', () => {
        console.log('Done with execute');
        console.log(`-------------------------`);
    });
    withTime.on('error', (error) => console.log('Error:', error));
    
    withTime.execute(fetchFromUrl, 'https://jsonplaceholder.typicode.com/posts/1');

    return endPromise;
}

const task3 = () => {
    console.log('Task 3: Export CSV to TXT');

    return exportCsvToTxt('src/module3/provided/assets/books.csv', 'src/module3/provided/task-3-books.txt').then((status) => {
        console.log(`Export status: ${status}`);
        console.log(`-------------------------`);
    });
}