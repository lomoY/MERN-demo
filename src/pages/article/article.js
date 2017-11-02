import React from 'react'
import { Switch, Route } from 'react-router-dom'
import ArticlePage from '../../components/articlepage/articlepage'
import ArticleList from '../../components/articlelist/articlelist'
import './article.css'

export default class Aricle extends React.Component{
    render(){
        return(
            <div className="layout">
                <Switch>
                    <Route exact path="/article" component={ArticleList}/>
                    <Route path='/article/:_id' component={ArticlePage}/>
                </Switch>
            </div>
        )
    }
}