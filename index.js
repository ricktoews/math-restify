var restify = require('restify');
var dc = require('./app/modules/dc/division');

function respond(req, res, next) {
  res.send('hello ' + req.params.name);
  next();
}

var server = restify.createServer();
server.get('/hello/:name', respond);
server.head('/hello/:name', respond);

server.get('/dc/:denom', (req, res, next) => {
  let denom = req.params.denom;
  let payload = dc.getPeriods(denom);
  res.contentType = 'json';
  res.send(payload.byPeriod);
  next();
});

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});

