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
    this.renderArticle=this.renderArticle.bind(this)
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

  renderArticle({ match }){
      console.log(match)
      return <ArticleItem id={'59f9bbadc78de505a65169e2'}/>
  };

  render () {
    return (
      <div>
        <h1>ArticleList</h1>
        <Router>
          <ul>
            {this.renderItem()}
          </ul>
        </Router>
        {/* {<Route path='/article/:id' component={this.renderArticle} />} */}
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
        <Link to={this.props._id}>
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
