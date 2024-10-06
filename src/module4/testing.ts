import childProcess from "child_process";

export const run = () => {
    console.log("running module 4");
    let fullData = "";
    let dataChumks = 0;
    const process = childProcess.execFile('npm run test:all', { shell: true });
    process.stdout?.on('data', (data) => {
        fullData += data;
        dataChumks++;
        console.log(data);
    });
    process.stderr?.on('data', (data) => {
        console.error(data);
    });
    process.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
        console.log(`data chunks: ${dataChumks}`);
        console.log(fullData);
    });
}