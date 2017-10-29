import React from 'react';
import PostCRUD from './../../service/postcrud';



export default class ArticlePage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            title:'默认标题',
            content:'默认内容'
        }
    }
    
    componentDidMount(){
        var data;
        var self=this;
        console.log(PostCRUD.getPost('59f4242682f4e135d39aefc9'));
        PostCRUD.getPost('59f4242682f4e135d39aefc9').then(function(res){
            console.log(res);
            data = res.data;
            console.log(data);
            console.log(this)
            self.setState({
                title:'newnew',
                content:data.content
            })
            
        });
    }

    render(){
        return(
            <div>                
                <h1 name='title'>{this.state.title}</h1>
                <div name='content'>{this.state.content}</div>
            </div>
        )
    }
}