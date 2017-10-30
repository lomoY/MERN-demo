import axios from 'axios'
import React from 'react'

// 编辑状态下的Post

var PostCRUD = {

  // 获取当前草稿的文本
  getPost(id) {
    return axios({
      method: 'get',
      url: '/post/59f6bc44b7664b5fd2789c27',
      data: {
        id: id
      }
    }).then(function (res) {
    //   console.log(res)

      return res
    })
  },

  /* 保存草稿 提交当前文章到文章列表
  *   title:String
  *   subtitl:String
  *   content:??
  */
  savePost(contentState) {
    axios({
      method: 'post',
      url: '/post/',
      data: {contentState: contentState}
    }).then(function (res) {
      console.log(res)
    })
  },

  // 更新当前的post
  updatePost(id,contentState){
    axios({
      method: 'put',
      url: '/post/59f6bc44b7664b5fd2789c27',
      // params:{id:'59f6bc44b7664b5fd2789c27'},//应该改为Id
      data: {contentState: contentState}
    }).then(function (res) {
      console.log(res)
    })
  }
}

// 批量管理Post
class Posts extends React.Component {
  // 删除当前文章选中的文章，包含批量删除
}

export default PostCRUD
