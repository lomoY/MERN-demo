import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import Home from './container/home'
import Article from './container/article/article'
import ArticlePage from './components/articlepage/articlepage'
import Photo from './container/photo'
import About from './container/about'
import Edit from './container/edit/edit'
import './App.css'
import NavHeader from './components/NavHeader/NavHeader'
import Footer from'./components/NavFooter/footer'
const RouterMap = () => (
  <Router>
    <div>
      <NavHeader/>
      <Route exact path="/" component={Home}/>
      <Route path="/photo" component={Photo}/>
      <Route path="/about" component={About}/>
      <Route path="/edit" component={Edit}/>
      <Route path="/article" component={Article}/>
      <Footer/>
    </div>
  </Router>
)

export default RouterMap