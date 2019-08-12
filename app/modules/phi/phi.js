/*
 * The value of Φ is (√5 + 1) / 2.
 * For our purposes, we will always express any power of Φ as a fraction with a denominator of 2,
 * so there's no need to specify the denominator in our calculations or include it in our results.
 */
const PHI_OBJ = { sqrt5: 1, whole: 1 };

/*
 * function multPhi: Multiply two powers of Φ, given that each is (x√5 + y) / 2.
 * (NOTE: Another way to skin this cat would be to add the exponents and find the corresponding Fibonacci and Lucas numbers;
 *        however, part of the object here is to demonstrate that powers of Φ really do follow that pattern, so ... 
 *        yeah, it'd be kind of circular, wouldn't it?))
 *
 * Let phi1 = (a√5 + b) / 2, and let phi2 = (c√5 + d) / 2.
 * To find the product of phi1 and phi2, first, multiply the numerators:
 *   Calculate a√5 x c√5 = ac x 5 = 5ac.
 *   Calculate b x d = bd.
 *   Calculate a√5 x d + b x c√5 = ad√5 + bc√5
 * Next, multiply the denominators:
 *   Calculate 2 x 2 = 4.
 *
 * The product of phi1 and phi2 is, then: (ad√5 + bc√5 + 5ac + bd) / 4.
 * 
 * For our purposes, we will maintain a denominator of 2, so we will divide 2 out of the numerator:
 *   Calculate (ad√5 + bc√5) / 2.
 *   Calculate (5ac + bd) / 2.
 * These will correspond to the two terms (x√5, y) of the result that the function returns. 
 */
function multPhi(phi1, phi2) {
  // a√5 x c√5 = ac x 5 = 5ac
  let sqrt5 = phi1.sqrt5 * phi2.sqrt5 * 5;
  // b x d = bd
  let whole = phi1.whole * phi2.whole;
  // a√5 x d + b x c√5 = ad√5 + bc√5
  let middle = phi1.sqrt5 * phi2.whole + phi2.sqrt5 * phi1.whole;

  // sqrt5: (ad√5 + bc√5) / 2
  // whole: (5ac + bd) / 2
  let phiProd = { sqrt5: middle / 2, whole: (sqrt5 + whole) / 2 };
  return phiProd;
}


/*
 * function calcPhi: Recursively calculate the nth power of Φ.
 *
 * This needs to be memoized to eliminate redundant calculations.
 */
function calcPhi(n) {
  if (n === 0) {
    return 1;
  }
  else if (n === 1) {
    return PHI_OBJ;
  } else {
    return multPhi(calcPhi(n-1), PHI_OBJ);
  }
}


/*
 * function phiRows: Compile an array of powers of Φ, expressed as fractions with a denominator of 2.
 * 
 * This is to be the payload for the phi/:n_rows call.
 */
function phiRows(powers) {
  let rows = [];
  for (let i = 0; i <= powers; i++) {
    rows.push(calcPhi(i));
  }
  return rows;
}

exports.phiRows = phiRows;

