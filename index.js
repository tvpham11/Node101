var express = require('express'),
    app     = express(),
    NeDB    = require('nedb'),
    db      = new NeDB('hits.nedb');

app.set('view engine', 'jade');

app.use(express.static(process.cwd() + '/public'))

app.get('/', function(request, response) {
  addHit(function() {
    countHits(function(num) {
      response.render('index', {
        myCoolMessage: 'Jade rocks!!',
        pageHits: num
      });
    });
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

app.get('/hits.json', function(req, res) {


});

db.loadDatabase(function(err) {
  if (err) {
    console.log('Error loading database', err);
  } else {
    console.log('Listening on localhost:8025');
    app.listen(8025);
  }
});

function addHit(cb) {
  db.insert({created_at: new Date().toString(), name: 'Vi'}, function(err) {
    if (err) {
      console.log('err adding hit', err);
    } else {
      cb();
    }
  });
}

function countHits(cb) {
  db.count({}, function(err, count) {
    if (err) {
      console.log('err counting hits', err);
    } else {
      cb(count);
    }
  });
}
