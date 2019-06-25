var dc = require('./app/modules/dc/division');
var phiRows = require('./app/modules/dc/phi');

function denom(req, res, next) {
  let denom = req.params.denom;
  let payload = dc.getPeriods(denom);
  res.contentType = 'json';
  res.send(payload.byPeriod);
  next();
}

function phi(req, res, next) {
  let powers = req.params.powers;
  let payload = phiRows.phiRows(powers);
  res.send(payload);
  next();
}

exports.denom = denom;
exports.phi = phi;
