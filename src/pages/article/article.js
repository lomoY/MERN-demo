import React from 'react'
import ArticlePage from '../../components/articlepage/articlepage'
import './article.css'

export default class Aricle extends React.Component{
    render(){
        return(
            <div className="layout">
                <ArticlePage/>
            </div>
        )
    }
}