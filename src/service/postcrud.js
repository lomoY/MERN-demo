import axios from 'axios';
import React from 'react';

// 编辑状态下的Post

var PostCRUD= {
    
    // 获取当前草稿的文本
    getPost (id) {

    const data = axios({
            method: 'get',
            url: '/post/59f4242682f4e135d39aefc9',
            data: {
                id:id
            }
        }).then(function(res){
            console.log(res);
            return res;
        });

        return data;
    },

    /* 保存草稿 提交当前文章到文章列表
    *   title:String
    *   subtitl:String
    *   content:??
    */
    savePost (title,subtitle,content) {
        axios({
            method:'post',
            url:'/post/',
            data:{
                title:title,
                subtitle:subtitle,
                content:content
            }
        }).then(function(res){
            console.log(res)
        })
    }


}

// 批量管理Post
class Posts extends React.Component {
    // 删除当前文章选中的文章，包含批量删除
}

export default PostCRUD;