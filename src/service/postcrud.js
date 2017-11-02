import axios from 'axios';
import React from 'react';


// 获取当前草稿的文本
function getPost (id) {
    return axios({
      method: 'get',
      url: '/post/59f9bbadc78de505a65169e2',
      data: {
        id: id
      }
    }).then(function (res) {
    //   console.log(res)
      return res
    })
  };

function savePost(title,desc,contentState) {
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
function updatePost(id,contentState){
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

export {getPost,savePost,updatePost,getArticleList}