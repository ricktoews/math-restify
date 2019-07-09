var restify = require('restify');
var api = require('./endpoints');
const corsMiddleware = require('restify-cors-middleware');

const cors = corsMiddleware({
  preflightMaxAge: 5, //Optional
  origins: ['http://localhost:3000'],
  allowHeaders: ['API-Token'],
  exposeHeaders: ['API-Token-Expiry']
})

var server = restify.createServer();
server.use(restify.plugins.bodyParser({ mapParams: true }));

server.pre((req, res, next) => {
  res.contentType = 'JSON';
  next();
});
server.pre(cors.preflight);
server.use(cors.actual);

server.get('/denom/:denom', api.denom);
server.get('/denom_byexpansion/:denom', api.denom_byExpansion);
server.get('/denom_bynumerator/:denom', api.denom_byNumerator);
server.get('/phi/:powers', api.phi);

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});

