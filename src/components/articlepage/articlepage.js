import React from 'react'
import PostCRUD from './../../service/postcrud'
import {EditorState, convertToRaw, convertFromRaw, RichUtils} from 'draft-js';
import { stateToHTML } from 'draft-js-export-html'
import renderHTML from 'react-render-html'
import './articlepage.css'

export default class ArticlePage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
        myhtml: ''
    }
  }

  componentWillMount () {
    var data
    var self = this

    PostCRUD
      .getPost()
      .then(function (res) {
        // 由Json字符串转为Json对象
        var rawContentState = JSON.parse(res.data.contentState)
        // 由Json对象变成contentState对象
        const newContentState = convertFromRaw(rawContentState.contentState)
        // 由ContentState对象变成html
        const contentHTML = stateToHTML(newContentState)
        console.log(contentHTML)
        self.setState({myhtml: contentHTML})
        console.log(self.state.myhtml)
      })
  }

  render () {
    return (
      <div>
        <h1 className='title' name='title'>{this.state.title}</h1>
        <div name='content'>
            {renderHTML(this.state.myhtml)}
        </div>
      </div>
    )
  }
}
