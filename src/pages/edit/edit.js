import React from 'react'
import Editor from '../../components/editor/editor'
// import FlatButton from 'material-ui/FlatButton'
import './edit.css'
import {getPost,savePost} from '../../service/postcrud'
import {stateToHTML} from 'draft-js-export-html'

export default class PageEdit extends React.Component {
  constructor (props) {
    super(props)
    this.state={
      id:'',//文章在数据库中的id
      title:'',//文章标题
      content:''//文章正文
    }

    
  }

  // 如果文本对象不存在，就创建新的文本对象并存到数据库中 callback：获取对象的Id

  // 如果文本对象存在，就获取ID并且更新
  findByID(id){
    
  }
  // 方法：定时保存草稿（暂时不设置草稿功能，直接保存为原文）
  // 通过ID，定时（保存）更新数据库中的对象
 

 

  // 安检：取消
  // 根据Id，删除数据库中的对象

  // 初始化
  componentWillMount(){
    var self = this;
    // getPost().then(function(res){
    //   const data = res.data;
    //   self.setState({
    //     id:data._id,
    //     content:data.content
    //   })
    //   console.log(self.state)
    // });
  }

  render () {
    return (
      <div className='EditContainer'>
        <h2>Edit</h2>
        <Editor/>
        <button type="button" onClick={this.showHtml}>显示html</button>
      </div>
    )
  }
}
