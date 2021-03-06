var express = require('express'),
    hbs = require('hbs').create(),
    compress = require('compression'),
    serveStatic = require('serve-static'),
    app = express();

app.use(compress());
app.use('/dist', serveStatic(__dirname + '/dist'));

app.set('view engine', 'hbs');
app.set('view options', { layout: false });

app.engine('hbs', hbs.__express);

app.use('/', function (req, res, next) {
  var body = '';

  res.render('__layout', { body: body });
});

app.listen(3030);
