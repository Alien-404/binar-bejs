// packages
import inquirer from 'inquirer';
import {
  sum,
  squareArea,
  subtraction,
  tubeVolume,
  multiplication,
  distribution,
  squareRoot,
  cubeVolume,
} from './lib/formula.mjs';
import { viewHistory } from './lib/history.mjs';

// IIFE Calculator
(async () => {
  // init looping var
  let continuePrompt = true;

  // opening
  console.log(`\nHalo, selamat datang!\n
 /\\_/\\ 
( o.o ) 
 > ^ < \n`);

  // loop the calculator
  while (continuePrompt) {
    // calculator choises
    await inquirer
      .prompt({
        type: 'list',
        name: 'type',
        choices: [
          'penjumlahan (+)',
          'pengurangan (-)',
          'perkalian (*)',
          'pembagian (/)',
          'akar kuadrat (√)',
          'luas persegi',
          'volume kubus',
          'volume tabung',
          'history',
          'exit',
        ],
        default: 'exit',
      })
      .then(async (val) => {
        // choises
        switch (val.type) {
          case 'penjumlahan (+)':
            await sum();
            break;
          case 'pengurangan (-)':
            await subtraction();
            break;
          case 'perkalian (*)':
            await multiplication();
            break;
          case 'pembagian (/)':
            await distribution();
            break;
          case 'akar kuadrat (√)':
            await squareRoot();
            break;
          case 'luas persegi':
            await squareArea();
            break;
          case 'volume tabung':
            await tubeVolume();
            break;
          case 'volume kubus':
            await cubeVolume();
            break;
          case 'history':
            viewHistory();
            break;
          case 'exit':
            process.exit();
          default:
            break;
        }
      });

    // ask user want loop again
    const answer = await inquirer.prompt({
      type: 'confirm',
      name: 'continue',
      message: 'Apakah anda ingin menghitung lagi?',
    });

    // set the loop
    continuePrompt = answer.continue;
  }

  // close
  console.log('Terima kasih! > ^ <');
})();
