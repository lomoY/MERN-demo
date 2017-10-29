import React from 'react'
import Editor from '../../components/editor/editor'
// import FlatButton from 'material-ui/FlatButton';
import './edit.css'

export default class PageEdit extends React.Component {
  render () {
    return (
      <div className="EditContainer">
        <h2>Edit</h2>
        <label>文章题目</label><input type="text" placeholder="请输入文章的标题"></input>
        <Editor/>
        <button type="button">保存</button>
      </div>

    )
  }
}
