import React from 'react'
import ArticlePage from '../../components/articlepage/articlepage'
import ArticleList from '../../components/articlelist/articlelist'
import './article.css'

export default class Aricle extends React.Component{
    render(){
        return(
            <div className="layout">
                <ArticleList/>
                {/* <ArticlePage/> */}
            </div>
        )
    }
}