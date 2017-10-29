import React from 'react'
import Editor from '../../components/editor/editor'
// import FlatButton from 'material-ui/FlatButton'
import './edit.css'
import PostCRUD from '../../service/postcrud'

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
  saveArticle(){
    PostCRUD.savePost(this.state.title,this.state.content)
  }

  // 安检：取消
  // 根据Id，删除数据库中的对象

  // 初始化
  componentWillMount(){
    var self = this;
    PostCRUD.getPost().then(function(res){
      const data = res.data;
      self.setState({
        id:data._id,
        content:data.content
      })
      console.log(self.state)
    });
  }

  render () {
    return (
      <div className='EditContainer'>
        <h2>Edit</h2>
        <label>
          文章题目
        </label>
        <input type='text' placeholder='请输入文章的标题' id={this.state._id}></input>
        <Editor/>
        <button type='button'>
          保存
        </button>
        <button type='button'>
          取消
        </button>
      </div>
    )
  }
}
