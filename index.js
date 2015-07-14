var express = require('express'),
    app     = express();

app.set('view engine', 'jade');

app.use(express.static(process.cwd() + '/public'))

app.get('/', function(request, response) {
  response.render('index', {
    myCoolMessage: 'Jade rocks!!'
  });
});

app.get('/greet/:name', function(req, res) {
  var names = ['Vi', 'Tim', 'Nick', 'Jim'];

  var name = req.params.name;

  if (names.indexOf(name) >= 0) {
    res.render('greet', {
      name: req.params.name
    });
  } else {
    res.status(404).render('404');
  }

});

console.log('listening on localhost:8025');
app.listen(8025);
