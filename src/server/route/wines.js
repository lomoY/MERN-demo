var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/winedb');//后面的这个winedb值的是dbs的名字
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connected to 'winedb' database");
    db.collection('wines', {strict:true}, function(err, collection) {
        if (err) {
            console.log("The 'wines' collection doesn't exist. Creating it with sample data...");
            populateDB();
        }
    });
  console.log('连接mangodb成功!')
});
// //创建一个Schema,数据表中的单条数据的格式会和它保持一致，同时，进行REST请求时候的数据k-v对也要保持一致
var WineSchema = mongoose.Schema({
    name:String,
    year:String
})

// //将Schema和模型结合到一起
var Wine = mongoose.model('wines', WineSchema);

// GET获取所有的wines
exports.findAll = function(req, res) {
        console.log('all')
        Wine.find(function(err, wines){
            if(err){
                res.send('有错误，错误消息为: '+err);
            }else{
                res.json(wines);
            }
        })
    };

//GET获取一个wine
exports.findById = function(req, res) {
 
        var id = req.params.id;
        console.log('Retrieving wine: ' + id);
        Wine.findById(req.params.id,function(err,wine){
            if(err){
                res.send(err)
            }else{
                console.info(wine)
                res.json(wine)
            }
        })
    };

// POST增加一个wine
exports.addWine = function(req, res) {
    console.log(req.body)
    // console.log('Adding wine: ' + JSON.stringify(wine));
    var wine = new Wine();
    wine.name = req.body.name;
    wine.year=req.body.year;
    wine.save(function(err){
        if(err){
            res.send(err)
        }else{
            res.json({message:'wine 创建成功'})
        }
    })
}

exports.deleteWine = function(req, res) {
    var id = req.params.id;
    console.log('Deleting wine: ' + id);
    Wine.remove({
        _id:req.params.id
    },function(err,wine){
        if(err){
            res.send(err)
        }else{
            res.json({message:'成功删除'})
        }
    })
}

exports.updateWine = function(req, res) {
    console.log('wine: ' + req.params.id +'更新中');

    Wine.findById(req.params.id,function(err,wine){
        if(err){
            res.send(err);
        }else{
            console.log(req.body)
            wine.name=req.body.name;
            wine.save(function(err){
                if(err){
                    res.send(err)
                }else{
                    res.json('message:wine已经更新')
                }
            })            
        }
    })
}


// /*--------------------------------------------------------------------------------------------------------------------*/
// // Populate database with sample data -- Only used once: the first time the application is started.
// // You'd typically not find this code in a real-life app, since the database would already exist.
// var populateDB = function() {

//     var wines = [
//     {
//         name: "CHATEAU DE SAINT COSME",
//         year: "2009",
//         grapes: "Grenache / Syrah",
//         country: "France",
//         region: "Southern Rhone",
//         description: "The aromas of fruit and spice...",
//         picture: "saint_cosme.jpg"
//     },
//     {
//         name: "LAN RIOJA CRIANZA",
//         year: "2006",
//         grapes: "Tempranillo",
//         country: "Spain",
//         region: "Rioja",
//         description: "A resurgence of interest in boutique vineyards...",
//         picture: "lan_rioja.jpg"
//     }];

//     db.collection('wines', function(err, collection) {
//         collection.insert(wines, {safe:true}, function(err, result) {});
//     });

// };