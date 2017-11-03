import axios from 'axios';
import React from 'react';


// 获取当前草稿的文本
function getArticle (id) {
  console.log(id)
    return axios({
      method: 'get',
      url: '/post/'+id
    }).then(function (res) {

      return res
    })
  };

function saveArticle(title,desc,contentState) {
    axios({
      method: 'post',
      url: '/post/',
      data: {
        title:title,
        desc:desc,
        contentState: contentState
      }
    }).then(function (res) {
      console.log(res)
    })
  };

// 更新当前的post
function updateArticle(id,contentState){
    axios({
      method: 'put',
      url: '/post/59f6bc44b7664b5fd2789c27',
      // params:{id:'59f6bc44b7664b5fd2789c27'},//应该改为Id
      data: {contentState: contentState}
    }).then(function (res) {
      console.log(res)
    })
  };

function getArticleList(){
  return axios({
    method:'get',
    url:'/articlelist/'
  }).then(function(res){
    console.log(res);
    return res.data
  })
}

// 批量管理Post
class Posts extends React.Component {
  // 删除当前文章选中的文章，包含批量删除
}

export {getArticle,saveArticle,updateArticle,getArticleList}