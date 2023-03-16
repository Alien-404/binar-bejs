// Packages
import inquirer from 'inquirer';
import { reportScore } from './lib/output.mjs';
import { validateInputPrompt } from './lib/validateInput.mjs';

// peripheral
const scores = [];
let scoreCounts = 0;

// opening
console.log(`\nHalo, selamat datang!\nmasukkan nilai yang ingin dihitung (q for stop)
  /\\_/\\ 
 ( o.o ) 
  > ^ < \n`);

// ask input score
const promntScore = () => {
  // call prompt
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'value',
        message: `Masukkan nilai ke-${scoreCounts + 1} :`,
        // validasi input
        validate: (input) => {
          // check first input
          if (scoreCounts === 0 && input.toLowerCase() === 'q') {
            return 'Silakan masukkan nilai terlebih dahulu sebelum keluar program!';
          }
          return validateInputPrompt(input);
        },
      },
    ])
    .then(async (answer) => {
      if (answer.value === 'q') {
        reportScore(scores);

        // close
        console.log('Terima kasih! > ^ <');
      } else {
        // loop angain promnt
        scoreCounts++;
        scores.push(parseInt(answer.value));
        promntScore();
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

promntScore();
