const fs = require('fs');
const restify = require('restify');
const api = require('./endpoints');
//const cors = require('./cors');
const corsMiddleware = require('restify-cors-middleware')
 
const cors = corsMiddleware({
  preflightMaxAge: 5, //Optional
  origins: ['http://arithmo.toewsweb.net', '*'],
  allowHeaders: ['API-Token'],
  exposeHeaders: ['API-Token-Expiry']
})


// ssl server setup
var https_options = restify.createServer({
  certificate: fs.readFileSync('/etc/letsencrypt/live/arithmo.toewsweb.net/fullchain.pem'),
  key: fs.readFileSync('/etc/letsencrypt/live/arithmo.toewsweb.net/privkey.pem')
});
var server = restify.createServer(https_options);
// server setup
//var server = restify.createServer();
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
server.get('/pythag/:corner', api.pythag_byCorner);
server.get('/pythag_triples/:a', api.pythag_byA);
server.get('/pythag_clist/:cList', api.pythag_byCList);


// start listening.
server.listen(3000, function() {
  console.log('%s listening at %s', server.name, server.url);
});

