import inquirer from 'inquirer';
import { addHistory } from './history.mjs';

// penjumlahan
export const sum = async () => {
  // get user input
  const input = await inquirer.prompt({
    type: 'input',
    name: 'numbers',
    message: 'Masukkan angka yang akan ditambahkan (pisahkan dengan spasi) : ',
    default: 0,
    validate: function (value) {
      const isValid = !isNaN(parseFloat(value));
      return isValid ? true : 'Harus berupa angka!';
    },
  });

  // get all user numbers input & calculation
  const numbers = input.numbers.split(' ').map((num) => parseInt(num));
  let result = 0;
  numbers.forEach((num) => (result += num));

  // save to history
  addHistory({
    type: 'penjumlahan (+)',
    input: numbers,
    result,
    date: new Date().toLocaleString(),
  });

  // log
  console.log(`Hasil penjumlahan : ${result}`);
};

// pengurangan
export const subtraction = async () => {
  // get user input
  const input = await inquirer.prompt({
    type: 'input',
    name: 'numbers',
    message: 'Masukkan angka yang akan dikurangi (pisahkan dengan spasi) : ',
    default: 0,
    validate: function (value) {
      const isValid = !isNaN(parseFloat(value));
      return isValid ? true : 'Harus berupa angka!';
    },
  });

  // get all user numbers input & calculation
  const numbers = input.numbers.split(' ').map((num) => parseInt(num));
  let result = numbers.reduce((a, b) => a - b);

  // save to history
  addHistory({
    type: 'pengurangan (-)',
    input: numbers,
    result,
    date: new Date().toLocaleString(),
  });

  // log
  console.log(`Hasil pengurangan : ${result}`);
};

// perkalian
export const multiplication = async () => {
  // get user input
  const input = await inquirer.prompt({
    type: 'input',
    name: 'numbers',
    message: 'Masukkan angka yang akan dikalikan (pisahkan dengan spasi) : ',
    default: 0,
    validate: function (value) {
      const isValid = !isNaN(parseFloat(value));
      return isValid ? true : 'Harus berupa angka!';
    },
  });

  // get all user numbers input & calculation
  const numbers = input.numbers.split(' ').map((num) => parseInt(num));
  let result = numbers.reduce((a, b) => a * b);

  // save to history
  addHistory({
    type: 'perkalian (*)',
    input: numbers,
    result,
    date: new Date().toLocaleString(),
  });

  // log
  console.log(`Hasil perkalian : ${result}`);
};

// pembagian
export const distribution = async () => {
  // get user input
  const input = await inquirer.prompt({
    type: 'input',
    name: 'numbers',
    message: 'Masukkan angka yang akan dibagi (pisahkan dengan spasi) : ',
    default: 0,
    validate: function (value) {
      const isValid = !isNaN(parseFloat(value));
      return isValid ? true : 'Harus berupa angka!';
    },
  });

  // get all user numbers input & calculation
  const numbers = input.numbers.split(' ').map((num) => parseInt(num));
  let result = numbers.reduce((a, b) => a / b);

  // save to history
  addHistory({
    type: 'pembagian (/)',
    input: numbers,
    result,
    date: new Date().toLocaleString(),
  });

  // log
  console.log(`Hasil pembagian : ${result}`);
};

// akar kuadrat
export const squareRoot = async () => {
  // get user input
  const input = await inquirer.prompt({
    type: 'input',
    name: 'number',
    message: 'Masukkan angka yang akan di akar kuadratkan : ',
    default: 0,
    validate: function (value) {
      // check input have spacing
      if (/\s/.test(value)) {
        return 'Tidak boleh mengandung spasi';
      }

      // check input is valid
      const isValid = !isNaN(parseFloat(value));
      return isValid ? true : 'Harus berupa angka!';
    },
  });

  // get all user numbers input & calculation
  let result = Math.sqrt(parseInt(input.number));

  // save to history
  addHistory({
    type: 'akar kuadrat (√)',
    input: [parseInt(input.number)],
    result,
    date: new Date().toLocaleString(),
  });

  // log
  console.log(`Hasil akar kuadrat : ${result}`);
};

// luas persegi
export const squareArea = async () => {
  // get user input
  const input = await inquirer.prompt({
    type: 'input',
    name: 'side',
    message: 'Masukan angka sisi persegi yang akan dihitung : ',
    default: 0,
    validate: function (value) {
      // check input have spacing
      if (/\s/.test(value)) {
        return 'Tidak boleh mengandung spasi';
      }

      // check if NaN
      if (isNaN(value)) {
        return 'Harus berupa angka!';
      }

      // check input is valid
      const isValid = !isNaN(parseFloat(value)) && !isNaN(value);
      return isValid ? true : 'Harus berupa angka!';
    },
  });

  // calculation
  const result = parseInt(input.side) ** 2;

  // save to history
  addHistory({
    type: 'luas persegi',
    input: [parseInt(input.side)],
    result,
    date: new Date().toLocaleString(),
  });

  // log
  console.log(`Hasil luas persegi : ${result}`);
};

// volume kubus
export const cubeVolume = async () => {
  // get user input
  const input = await inquirer.prompt({
    type: 'input',
    name: 'side',
    message: 'Masukan angka sisi kubus yang akan dihitung : ',
    default: 0,
    validate: function (value) {
      // check input have spacing
      if (/\s/.test(value)) {
        return 'Tidak boleh mengandung spasi';
      }
      // check input is valid
      const isValid = !isNaN(parseFloat(value)) && !isNaN(value);
      return isValid ? true : 'Harus berupa angka!';
    },
  });

  // calculation
  const result = parseInt(input.side) ** 3;

  // save to history
  addHistory({
    type: 'volume kubus',
    input: [parseInt(input.side)],
    result,
    date: new Date().toLocaleString(),
  });

  // log
  console.log(`Hasil volume kubus : ${result}`);
};

// volume tabung
export const tubeVolume = async () => {
  // get user input
  const input = await inquirer.prompt([
    {
      type: 'input',
      name: 'radius',
      message: 'Masukan jari-jari tabung : ',
      default: 0,
      validate: function (value) {
        // check input have spacing
        if (/\s/.test(value)) {
          return 'Tidak boleh mengandung spasi';
        }
        // check input is valid
        const isValid = !isNaN(parseFloat(value)) && !isNaN(value);
        return isValid ? true : 'Harus berupa angka!';
      },
    },
    {
      type: 'input',
      name: 'height',
      message: 'Masukan tinggi tabung : ',
      default: 0,
      validate: function (value) {
        // check input have spacing
        if (/\s/.test(value)) {
          return 'Tidak boleh mengandung spasi';
        }
        // check input is valid
        const isValid = !isNaN(parseFloat(value)) && !isNaN(value);
        return isValid ? true : 'Harus berupa angka!';
      },
    },
  ]);

  // calculation
  const result = Math.PI * parseInt(input.radius) ** 2 * parseInt(input.radius);

  // save to history
  addHistory({
    type: 'volume tabung',
    input: [parseInt(input.radius), parseInt(input.radius)],
    result,
    date: new Date().toLocaleString(),
  });

  // log
  console.log(`Hasil volume tabung : ${result}`);
};
