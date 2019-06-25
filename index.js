var restify = require('restify');
var api = require('./endpoints');

var server = restify.createServer();
server.use(restify.plugins.bodyParser({ mapParams: true }));

server.pre((req, res, next) => {
  res.contentType = 'JSON';
  next();
});

server.get('/denom/:denom', api.denom);
server.get('/phi/:powers', api.phi);

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});

