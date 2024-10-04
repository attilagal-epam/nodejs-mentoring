import { appendToFile, executeCmd } from "./utils";

const supportedPlatforms = {
  windows: "win32",
  linux: "linux",
  mac: "darwin",
}

const windowsCmd = `powershell "Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1 | ForEach-Object { $_.Name + ' ' + $_.CPU + ' ' + $_.WorkingSet }"`;
const linuxCmd = `ps -A -o %cpu,%mem,comm | sort -nr | head -n 1`;
const macCmd = linuxCmd ;
const commands = {
  [supportedPlatforms.windows]: windowsCmd,
  [supportedPlatforms.linux]: linuxCmd,
  [supportedPlatforms.mac]: macCmd,
};
export function run() {

  //Save os platform to variable
  const platform = process.platform;
  //When the unsupported platform occurs, it should log the Unsupported platform message to the stderr and exit from the program with the code 1.
  if (!Object.values(supportedPlatforms).includes(platform)) {
    console.error("Unsupported platform");
    process.exit(1); //use return if want o execute all modules
  }
  //Execute the command based on the platform 10 times a second
  const interval = setInterval(async () => {
    try {
      const { stdout } = await executeCmd(commands[platform]);
      // log to stdout
      console.clear();
      console.log(stdout); 
    } catch (error) {
      console.error(error);
    }
  }, 100);

  // Execute command every minute
  setInterval(async () => {
    try {
      const { stdout } = await executeCmd(commands[platform]);
      // log to file
      appendToFile(stdout);
    } catch (error) {
      console.error(error);
    }
  }, 60000);


  return "running";
}



