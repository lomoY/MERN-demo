var express = require('express'),
post=require('./src/server/route/post'),
// To handle HTTP POST request in Express.js version 4 
// and above, you need to install middleware module called body-parser.
// body-parser extract the entire body portion of an 
// incoming request stream and exposes it on req.body .
bodyParser = require('body-parser');

var app = express();

var env = process.env.NODE_ENV || 'development';

if ('development' == env) {
   // configure stuff here
}
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
// configure app to use bodyParser()
// this will let us get the data from a POST
// 如果不加这两条，那么就会出现post和put中参数空白的情况
//修改commit 邮箱
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.get('/wines', wine.findAll);
// app.get('/wines/:id',wine.findById);
// app.post('/wines',wine.addWine);
// app.put('/wines/:id',wine.updateWine);
// app.delete('/wines/:id',wine.deleteWine);

app.get('/post/:id', post.findById);
app.post('/post',post.savePost);
app.put('/post/:id',post.updatePost);
app.get('/articlelist/',post.getArticleList);



app.listen(3001);
console.log('Listening on port 3001...因为3000端口被react占了');