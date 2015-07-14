var express = require('express'),
    app     = express();

app.set('view engine', 'jade');

app.use(express.static(process.cwd() + '/public'))

app.get('/', function(request, response) {
  response.render('index', {
    myCoolMessage: 'Jade rocks!!'
  });
});

console.log('listening on localhost:8025');
app.listen(8025);
