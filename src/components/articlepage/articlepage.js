import React from 'react'
import ReactDOM from 'react-dom'
import { EditorState, convertFromRaw } from 'draft-js'
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor'
import {getPost} from './../../service/postcrud'
import './articlepage.css'

export default class ArticlePage extends React.Component {

  constructor (props) {
    super(props)
    this.state = {}
    const content = window
      .localStorage
      .getItem('content')
    // 当前页面的_id
    this.state._id = props.match.params._id;

    if (content) {
      this.state.editorState = EditorState.createWithContent(convertFromRaw(JSON.parse(content)))
    } else {
      this.state.editorState = EditorState.createEmpty()
    }

    this.onChange = this
      .onChange
      .bind(this)
    this.focus = () => {
      this.editor.focus
    }
  }

  onChange () {
    // onChange为required的方法
  }

  componentDidMount () {
    var self = this
    getPost()
      .then(function (res) {
        var rawContentState = JSON.parse(res.data.contentState)
        self.setState({editorState: EditorState.createWithContent(convertFromRaw(rawContentState.contentState))})
      })
  }

  render () {
    return (
      <div className ='articleEditContainer' onClick={this.focus}>
        <Editor
          readOnly={true}
          editorState={this.state.editorState}
          onChange={this.onChange}
          ref={(element) => {
                 this.editor = element
               }} />
      </div>
    )
  }
}
