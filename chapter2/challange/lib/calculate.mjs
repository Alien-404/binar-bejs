// sorting score
export const sortedScore = (scores) => {
  // sorting using merge sort
  function mergeSort(arr) {
    if (arr.length <= 1) {
      return arr;
    }

    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);

    return merge(mergeSort(left), mergeSort(right));
  }

  function merge(left, right) {
    let result = [];

    while (left.length && right.length) {
      if (left[0] < right[0]) {
        result.push(left.shift());
      } else {
        result.push(right.shift());
      }
    }

    return [...result, ...left, ...right];
  }

  // sorted value
  const sorted = mergeSort(scores);

  return sorted;
};

// min max in score
export const minMax = (sortedScore) => {
  // get max and min score
  const min = Math.min(...sortedScore);
  const max = Math.max(...sortedScore);

  return {
    min,
    max,
  };
};

// average score
export const averageScore = (scores) => {
  // get total
  const total = scores.reduce((acc, cur) => acc + cur);

  // get average
  const average = total / scores.length;

  return average;
};

// pass criteria with score >= 60
export const passCriteria = (scores, mmm = 60) => {
  let passed = 0,
    failed = 0;

  // loop
  scores.forEach((score) => {
    if (score >= mmm) {
      passed++;
    } else {
      failed++;
    }
  });

  return {
    passed,
    failed,
  };
};

// spesific score 90 and 100
export const spesificScore = (scores) => {
  // score equal 90 and 100
  const ninetyValue = scores.filter((score) => score === 90);
  const hundredValue = scores.filter((score) => score === 100);

  return {
    ninetyValue,
    hundredValue,
  };
};
