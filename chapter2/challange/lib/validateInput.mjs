export const validateInputPrompt = (input) => {
  // Check if input is equal to 'q'
  if (input === 'q') {
    return true;
  }

  // check value is not allowed to be more than 100
  if (input > 100 || input < 0) {
    return 'Input Nilai tidak boleh lebih dari 100 dan kurang dari 0';
  }

  // Check if input is a number
  if (isNaN(input)) {
    return 'Input harus berupa angka';
  }

  // Check if input is not empty
  if (!input) {
    return 'Input tidak boleh kosong';
  }

  // Check if input contains spaces
  if (/\s/g.test(input)) {
    return 'Input tidak boleh mengandung spasi';
  }

  // If input is valid
  return true;
};
