import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import Home from './pages/home'
import Article from './pages/article/article'
import Photo from './pages/photo'
import About from './pages/about'
import Edit from './pages/edit/edit'
import style from './App.css'
import NavHeader from './components/NavHeader/NavHeader'
import Footer from'./components/NavFooter/footer'
const SiteIndex = () => (
  <Router>
    <div>
    <NavHeader/>
      <div>     
      </div>
      <Route exact path="/" component={Home}/>
      <Route path="/photo" component={Photo}/>
      <Route path="/about" component={About}/>
      <Route path="/edit" component={Edit}/>
      <Route path="/topics" component={Topics}/>
      <Route path="/article" component={Article}/>
      <Footer/>
    </div>
  </Router>
)




const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>
          Rendering with React
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>
          Components
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>
          Props v. State
        </Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic}/>
    <Route exact path={match.url} render={() => (
      <h3>Please select a topic.</h3>
    )}/>
  </div>
)

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
)

export default SiteIndex