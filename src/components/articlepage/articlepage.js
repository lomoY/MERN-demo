import React from 'react';
import PostCRUD from './../../service/postcrud';
import './articlepage.css'


export default class ArticlePage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            title:'',
            content:''
        }
    }
    
    componentWillMount(){
        var data;
        var self=this;
        // console.log(PostCRUD.getPost('59f4242682f4e135d39aefc9'));//promise对象
        PostCRUD.getPost('59f4242682f4e135d39aefc9').then(function(res){
            // console.log(res);
            data = res.data;
            // console.log(data);
            self.setState({
                title:'newnew',
                content:data.content
            })   
        });
    }

    render(){
        return(
            <div>                
                <h1 className='title' name='title'>{this.state.title}</h1>
                <div name='content'>{this.state.content}</div>
            </div>
        )
    }
}