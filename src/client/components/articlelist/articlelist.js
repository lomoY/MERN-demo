import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { getArticleList } from './../../service/postcrud'
import ArticlePage from '../articlepage/articlepage'

export default class ArticleList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      itemLength: null,
      items: []
    }
  }

  renderItem () {
    return this.state.items.map(function (item, index) {
      return <ArticleItem
               to={item._id}
               _id={item._id}
               title={item.title}
               desc={item.desc}
               key={index} />
    })
  }
  // 设置pagination

  // 首次请求
  componentWillMount () {
    var self = this
    getArticleList().then(function (res) {
      self.setState({
        items: res.docs,
        page: res.page,
        itemLength: res.docs.length
      })
      console.log(res)
    })
  }

  componentDidMount () {
    var self = this
    getArticleList().then(function (res) {
      self.setState({
        items: res.docs,
        page: res.page,
        itemLength: res.docs.length
      })
      console.log(res)
    })
  }

  render () {
    return (
      <div>
        <h1>ArticleList</h1>
        <ul>
          {this.renderItem()}
        </ul>
      </div>
    )
  }
}

// 单个的ArticleItem
// 接受参数
// 文章名字：title
// 描述：description
// 小图：..
class ArticleItem extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      id: null
    }
  }

  render () {
    return (
      <li className='articleItem' _id={this.props._id}>
        <Link to={'/article/' + this.props._id}>
        <div>
          {this.props.title}
        </div>
        <div>
          {this.props.desc}
        </div>
        </Link>
      </li>

    )
  }
}
