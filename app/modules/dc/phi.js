const sqrt5 = Math.pow(5, .5);
const PHI = (1 + sqrt5) / 2;
const PHI_OBJ = { sqrt5: 1, whole: 1 };

/*
 * Multiply two powers of phi, given that each is (a*sqrt(5) + b) / 2.
 */
function multPhi(phi1, phi2) {
  let sqrt5 = phi1.sqrt5 * phi2.sqrt5 * 5;
  let whole = phi1.whole * phi2.whole;
  let middle = phi1.sqrt5 * phi2.whole + phi2.sqrt5 * phi1.whole;

  let phiProd = { sqrt5: middle / 2, whole: (sqrt5 + whole) / 2 };
  return phiProd;
}

/*
 * Recursively calculate the nth power of phi.
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

function phiRows(powers) {
  let rows = [];
  for (let i = 0; i <= powers; i++) {
    rows.push(calcPhi(i));
  }
  return rows;
}

exports.phiRows = phiRows;

