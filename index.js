const restify = require('restify');
const api = require('./endpoints');
const cors = require('./cors');


// server setup
var server = restify.createServer();
server.use(restify.plugins.bodyParser({ mapParams: true }));
server.pre((req, res, next) => {
  res.contentType = 'JSON';
  next();
});
server.pre(cors.preflight);
server.use(cors.actual);


// AS THE API EVOLVES, THIS IS THE SECTION TO FOCUS ON.
// define api paths
server.get('/denom/:denom', api.denom);
server.get('/denom_byexpansion/:denom', api.denom_byExpansion);
server.get('/denom_bynumerator/:denom', api.denom_byNumerator);
server.get('/phi/:powers', api.phi);


// start listening.
server.listen(8081, function() {
  console.log('%s listening at %s', server.name, server.url);
});

