var dc = require('./app/modules/dc/dc');
var dcHelpers = require('./app/modules/dc/dc-helpers');
var phiModule = require('./app/modules/phi/phi');
var pythag = require('./app/modules/pythag/pythag');


function denom_byNumerator(req, res, next) {
  let denom = req.params.denom;
  let { byNumerator } = dc.getExpansions(denom);
  res.send(byNumerator);
  next();
}

function denom_byExpansion(req, res, next) {
  let denom = req.params.denom;
  let payload = dc.getExpansions(denom);
  res.send(payload.byExpansion);
  next();
}

function denom(req, res, next) {
  let denom = req.params.denom;
  let { byExpansion } = dc.getExpansions(denom);
  let formatted = dcHelpers.formatExpansions(byExpansion);
  res.send(formatted);
  next();
}

function phi(req, res, next) {
  let powers = req.params.powers;
  let payload = phiModule.getPhiData(powers);
  res.send(payload);
  next();
}

function pythag_byCorner(req, res, next) {
  var corner = req.params.corner;
  var data = pythag.getByCorner(corner);
  res.send(data);
  next();
}

function pythag_byA(req, res, next) {
  var a = parseInt(req.params.a, 10);
  var data = pythag.getByA(a);
  res.send(data);
  next();
}

function pythag_byCList(req, res, next) {
  var cListStr = req.params.cList;
  let cList = cListStr.split(',');
  var data = pythag.getTriples(cList);
  res.send(data);
  next();
}


exports.denom_byNumerator = denom_byNumerator;
exports.denom_byExpansion = denom_byExpansion;
exports.denom = denom;
exports.phi = phi;
exports.pythag_byCorner = pythag_byCorner;
exports.pythag_byA = pythag_byA;
exports.pythag_byCList = pythag_byCList;
