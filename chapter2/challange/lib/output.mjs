import {
  averageScore,
  minMax,
  passCriteria,
  sortedScore,
  spesificScore,
} from './calculate.mjs';

export const reportScore = (rawScores) => {
  const sorted = sortedScore(rawScores);
  const { min, max } = minMax(sorted);
  const average = averageScore(sorted);
  const { passed, failed } = passCriteria(sorted);
  const { ninetyValue, hundredValue } = spesificScore(sorted);

  // clear console
  console.clear();

  // output
  console.log('====================================');
  console.log('======= LAPORAN NILAI SISWA ========');
  console.log('====================================\n');

  // sorted scores
  const dataTable = sorted.map((score) => ({ nilai: score }));
  console.log('Nilai dari terendah ke tertinggi : ');
  console.table(dataTable);

  // highest and lowest
  console.log(`\nNilai tertinggi\t: ${max}`);
  console.log(`Nilai terendah\t: ${min}`);

  // passed and failed
  console.log(`Siswa lulus : ${passed}, Siswa tidak lulus : ${failed}`);

  // average
  console.log(`Rata-rata Nilai\t : ${average.toFixed(2)}`);

  // spesific number
  if (ninetyValue.length > 0) {
    console.log(
      `${ninetyValue.length} Siswa dengan nilai 90\t : ${ninetyValue}`
    );
  } else {
    console.log(`Tidak terdapat siswa dengan nilai 90!`);
  }

  if (hundredValue.length > 0) {
    console.log(
      `${hundredValue.length} Siswa dengan nilai 100 : ${hundredValue}\n`
    );
  } else {
    console.log(`Tidak terdapat siswa dengan nilai 100!\n`);
  }
};
