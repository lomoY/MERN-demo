var express = require('express'),
wine= require('./src/server/route/wines'),
// To handle HTTP POST request in Express.js version 4 
// and above, you need to install middleware module called body-parser.
// body-parser extract the entire body portion of an 
// incoming request stream and exposes it on req.body .
bodyParser = require('body-parser').json();

var app = express();

var env = process.env.NODE_ENV || 'development';

if ('development' == env) {
   // configure stuff here
}

app.get('/wines', wine.findAll);
app.get('/wines/:id',wine.findById);
app.post('/wines',bodyParser,wine.addWine);
app.put('/wines/:id',wine.updateWine);
app.delete('./wines/:id',wine.deleteWine);




app.listen(3001);
console.log('Listening on port 3001...因为3000端口被react占了');