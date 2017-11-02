import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import Home from './pages/home'
import Article from './pages/article/article'
import ArticlePage from './components/articlepage/articlepage'
import Photo from './pages/photo'
import About from './pages/about'
import Edit from './pages/edit/edit'
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