import { appendFile } from 'fs';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';

const promisifiedExec = promisify(exec);
const promisifiedAppend = promisify(appendFile);

export const appendToFile = async (message: string) => {
  await promisifiedAppend('activity.log', message);
  console.log('Updated! file');
};

export const executeCmd = async (cmd: string) => {
  try {
    return await promisifiedExec(cmd);
  } catch (error) {
    // log errors
    throw error;
  }
};