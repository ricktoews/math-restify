const Useful = require('../../../primes');

function countNonRepeating(denom, base) {
  let origBase = base;
  let baseFactorTally = 0;
  let primeNdx = 0;
  let currentPrime = Useful.primes[primeNdx];

  while (currentPrime <= base) {
    while (Number.isInteger(base / currentPrime)) {
      base /= currentPrime;
      baseFactorTally++;
    }

  }


}

exports.countNonRepeating = countNonRepeating;
