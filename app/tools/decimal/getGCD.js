/*
 * getGCD
 */
function getGCD(int1, int2) {
  let ints = [int1, int2];
  let finished = false;
  while (!finished) {
    ints = [Math.max(...ints), Math.min(...ints)];
    if (Number.isInteger(ints[0] / ints[1])) {
      finished = true;
    } else {
      ints[0] = ints[0] - ints[1];
    }
  }
  return ints[1];
}

exports.getGCD = getGCD;
