import * as fs from 'fs';
import { pipeline, Transform } from 'stream';
import readline from 'readline';

/**
 * Exports a CSV file to a TXT file.
 * CSV format:
 *  Book;Author;Amount;Price
 *  The Compound Effect;Darren Hardy;5;9,48
 * TXT format: {"book":"The Compound Effect","author":"Darren Hardy","price":9.48}
 * @param {string} csvPath - The path to the source CSV file.
 * @param {string} txtPath - The path to the destination TXT file.
 * @returns {Promise<boolean>} - A promise that resolves to true when export is done.
 */
export const exportCsvToTxt = (csvPath: string, txtPath: string): Promise<boolean> => {
  // implementation here
  console.log(`csvPath = ${csvPath}, txtPath = ${txtPath}`);

  // create Promise that resolves to true when export is done
  let exportStatusResolver: (arg0: boolean) => void;
  const exportStatus = new Promise<boolean>((resolve) => {
    exportStatusResolver = resolve;
  });

  
  // create a readable stream from the CSV file
  const readStream = fs.createReadStream(csvPath);

  // create Stream that will read the CSV file line by line
  const readLineStream = readline.createInterface({
    input: readStream,
    crlfDelay: Infinity
  });


  // create a writable stream to the TXT file
  const writeStream = fs.createWriteStream(txtPath, { encoding: 'utf8' });
  
  // create a transform stream to convert CSV to TXT
  const transformStream = new Transform({
    transform(chunk, encoding, callback) {
      console.log(chunk.toString());
      
      const HEADER = 'Book;Author;Amount;Price';
      if (chunk.toString() === HEADER) {
        callback();
        return;
      }

      const [book, author, amount, price] = chunk.toString().split(';');
      const txtObj = {
        book: book.trim(),
        author: author.trim(),
        amount: parseInt(amount.trim(), 10),
        price: parseFloat(price.replace(',', '.')).toFixed(2),
      };
      console.log(JSON.stringify(txtObj));
      this.push(JSON.stringify(txtObj) + '\n');
      callback();
    }
  });

  // pipeline the streams
  pipeline(
    readLineStream,
    transformStream,
    writeStream,
    (error) => {
      if (error) {
        console.error(error);
      }
    }
  ).on('finish', () => {
    console.log('Export done');
    exportStatusResolver(true);
  });



  return exportStatus; // should be changed
};
