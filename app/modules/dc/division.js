var BASE = 10;

const Useful = require('../../../data/primes');

var factorOf1s = [
  [],
  [],
  [11],
  [3, 37],
  [11, 101],
  [41, 271],
  [3, 7, 11, 13, 37],
  [239, 4649],
  [11, 37, 101, 137],
  [3, 37, 333667],
  [11, 41, 271, 9091],
  [21649, 513239],
  [3, 7, 11, 13, 37, 101, 9901],
  [53, 79, 265371653],
  [11, 239, 4649, 909091],
  [3, 31, 37, 41, 271, 2906161],
];

/*
 * Determine whether number is prime.
 *
 */
function isPrime(num) {
  num = 1*num;
  return Useful.primes.indexOf(num) !== -1;
}

/*
 * Perform mechanical division to get period, digit by digit.
 * Also, keep track of where in the period each numerator starts.
 */
function divide(num, denom) {
  let digits = [];
  let numerators = {};
  let position = 1;

  while (num > 0 && !numerators[num]) {
    numerators[num] = position++;
    let digit = Math.floor(num * BASE / denom);
    digits.push(digit);
    num = num * BASE - digit * denom;
  }

  let beginRepeat = num > 0 ? numerators[num] : -1; // num is 0 if decimal resolves.
  let result = { period: digits.join(''), periodNumerators: numerators, beginRepeat };

  return result;
}

/*
 * Get periods for specified denominator.
 * Return a hash:
 * {
 *   byPeriod: [{ |period|: [{ numerator, position }...]}],
 *   byNumerator: [{ |numerator|: { period, position }}]
 * }           
 *
 * This feels like it needs to be broken up.
 */
function getPeriods(denom) {
  let prime = isPrime(denom);
  let periods = {};
  for (let num = 1; num < denom; num++) {
    // Check each numerator, and calculate the period if it hasn't already been done.
    if (!periods[num]) {
      let { period, periodNumerators, beginRepeat } = divide(num, denom);
      periods[num] = { period: period, position: periodNumerators[num], beginRepeat };
      // This forEach block is only for prime numbers.
      prime && Object.keys(periodNumerators).forEach(num => {
        periods[num] = { period: period, position: periodNumerators[num], beginRepeat };
      });
    }
  }
  let output = {};
  for (let num = 1; num < denom; num++) {
    let period = periods[num].period;
    let numerator = num;
    let position = periods[num].position;
    let beginRepeat = periods[num].beginRepeat;
    if (!output[period]) { output[period] = []; }
    output[period].push({ numerator, position, beginRepeat });
  }

  return { byPeriod: output, byNumerator: periods };
}

/*
 * To be completed.
 */
function getAllOfLength(l) {
}

exports.divide = divide;
exports.getPeriods = getPeriods;
exports.getAllOfLength = getAllOfLength;
