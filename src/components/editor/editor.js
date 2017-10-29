import React from 'react';
import ReactDOM from 'react-dom';
import {EditorState,convertToRaw,convertFromRaw} from 'draft-js';
import Editor,{createEditorStateWithText} from 'draft-js-plugins-editor';
import createInlineToolbarPlugin from 'draft-js-inline-toolbar-plugin';//draft插件：行内工具
// import createEmojiPlugin from 'draft-js-emoji-plugin';//draft插件：emoj表情
import axios from 'axios';
import './editor.css'
import 'draft-js-inline-toolbar-plugin/lib/plugin.css'
// import 'draft-js-emoji-plugin/lib/plugin.css';

// 实例化插件
const inlineToolbarPlugin = createInlineToolbarPlugin();
// const emojiPlugin = createEmojiPlugin();
// const { EmojiSuggestions, EmojiSelect } = emojiPlugin;//创建自定义标签
const { InlineToolbar } = inlineToolbarPlugin;

const draftPlugins=[inlineToolbarPlugin]



export default class Edit extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            title:'请编辑你的文章标题',
            content:'开始你您的写作...'
        };
        const content = window.localStorage.getItem('content');

        if (content) {
            this.state.editorState = EditorState.createWithContent(convertFromRaw(JSON.parse(content)));
          } else {
            this.state.editorState = EditorState.createEmpty();
        }
        

        this.onChange = (editorState) => {
            
            const contentState = editorState.getCurrentContent();
            console.log('content state',convertToRaw(contentState));
            this.saveContent(contentState);
            this.setState({
                editorState
            })
        };

        this.focus =() => {this.editor.focus }
      }


      saveContent = (content) =>{
        const data = JSON.stringify({content: convertToRaw(content)});

        axios.post('/post/', {data})
            .then(function(res){
                console.log(res)
            })
        
      };

    //   updatePost = (data) => {
    //     const data = {
    //         title:tile,
    //         content:content
    //     }

    //     axios.put('/post/'+id,{
    //         content:'完全乱七八糟'
    //     })
    //   }

      componentDidMount() {
        axios.get(`/post/`).then(val => val.json)
        .then(rawContent => {
          if (rawContent) {
            this.setState({ editorState: EditorState.createWithContent(convertFromRaw(rawContent)) })
          } else {
            this.setState({ editorState: EditorState.createEmpty() });
          }
        });
      }
      
      render() {
        return (
            <div onClick={this.focus}>
                <Editor 
                    editorState={this.state.editorState} 
                    onChange={this.onChange} 
                    plugins={[inlineToolbarPlugin]} 
                    ref={(element) => { this.editor = element; }}
                />
                <InlineToolbar/>
                {/* <EmojiSuggestions /> */}
                {/* <EmojiSelect /> */}
            </div>
        );
      }
}
