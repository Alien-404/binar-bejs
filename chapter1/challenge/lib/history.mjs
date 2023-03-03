import fs from 'fs';

export const addHistory = (history) => {
  const data = JSON.parse(fs.readFileSync('history.json'));
  data.push(history);

  // add new
  fs.writeFileSync('history.json', JSON.stringify(data), (err) => {
    if (err) {
      console.log(err);
    }
  });
};

export const viewHistory = () => {
  const data = JSON.parse(fs.readFileSync('history.json'));

  console.table(data);
};
