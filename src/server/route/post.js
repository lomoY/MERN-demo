var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

mongoose.connect('mongodb://localhost/post')
var db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  console.log("Connected to 'post' database")
  db.collection('post', {strict: true}, function (err, collection) {
    if (err) {
      console.log("The 'post' collection doesn't exist. Creating it with sample data...")
      populateDB()
    }
  })
  console.log('连接mangodb成功!')
})
// //创建一个Schema,数据表中的单条数据的格式会和它保持一致，同时，进行REST请求时候的数据k-v对也要保持一致
var PostSchema = mongoose.Schema({
  title: String,
  desc: String,
  contentState: String
})

PostSchema.plugin(mongoosePaginate)

// //将Schema和模型结合到一起
var Post = mongoose.model('post', PostSchema)

// 获取当前Post
exports.findById = function (req, res) {
  var id = req.params.id
  console.log('Retrieving post: ' + id)
  Post.findById(req.params.id, function (err, post) {
    if (err) {
      res.send(err)
    }else {
      console.info(post)
      res.json(post)
    }
  })
}

// 获取postlist
// pageSize:单页文档数量
// pageNum: 第几页
exports.getArticleList = function (req, res) {
  Post.paginate({}, { page: 1, limit: 10 }, function (err, result) {
    res.send(result)
  // result.docs
  // result.total
  // result.limit - 10
  // result.page - 3
  // result.pages
  })
}

// 保存当前Post
exports.savePost = function (req, res) {
  //   console.log('Adding post: ' + JSON.stringify(post))
  var post = new Post()
  console.log(req.body)
  post.contentState = req.body.contentState
  post.title=req.body.title
  post.desc=req.body.desc

  post.save(function (err, savedPost) {
    if (err) {
      res.send(err)
    }else {
      res.json({
        message: 'success',
        data: savedPost
      })
    }
  })
}

// 更新当前的Post
exports.updatePost = function (req, res) {
  console.log('req', req.params)
  Post.findById(req.params.id, function (err, post) { // 这里直接回通过req中的id找到表中的ObjectId
    if (err) {
      res.send(err)
    }else {
      console.log('body', req.body)

      post.contentState = req.body.contentState
      post.save(function (err) {
        if (err) {
          res.send(err)
        }else {
          res.send(post)
        }
      })
    }
  })
}

/*
*取消编辑的内容
*/
exports.cancelEdit = function (req, res) {
  var id = req.params.id
  console.log('Deleting post: ' + id)
  Post.remove({
    _id: req.params.id
  }, function (err, wine) {
    if (err) {
      res.send(err)
    }else {
      res.json({message: '成功删除'})
    }
  })
}
// /*--------------------------------------------------------------------------------------------------------------------*/
// // Populate database with sample data -- Only used once: the first time the application is started.
// // You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function () {
  var post =
  {
    title: '文章测试',
    subtitle: '文章测试子标题',
    content: '测试内容ABCDBSBADBASDBSADBSDBSABASDBAB'
  }

  db.collection('post', function (err, collection) {
    collection.insert(post, {safe: true}, function (err, result) {})
  })
}
