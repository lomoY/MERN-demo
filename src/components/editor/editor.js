import React from 'react';
import ReactDOM from 'react-dom';
import {EditorState, convertToRaw, convertFromRaw, RichUtils} from 'draft-js';
import Editor, {createEditorStateWithText} from 'draft-js-plugins-editor';
import createInlineToolbarPlugin from 'draft-js-inline-toolbar-plugin'; //draft插件：行内工具
// import createEmojiPlugin from 'draft-js-emoji-plugin';//draft插件：emoj表情
import PostCRUD from './../../service/postcrud'
import axios from 'axios';
import './editor.css'
import 'draft-js-inline-toolbar-plugin/lib/plugin.css'
// import 'draft-js-emoji-plugin/lib/plugin.css';
import {stateToHTML} from 'draft-js-export-html';
import renderHTML from 'react-render-html';
// 实例化插件
const inlineToolbarPlugin = createInlineToolbarPlugin();
// const emojiPlugin = createEmojiPlugin(); const { EmojiSuggestions,
// EmojiSelect } = emojiPlugin;//创建自定义标签
const {InlineToolbar} = inlineToolbarPlugin;

const draftPlugins = [inlineToolbarPlugin]

//现在这里测试一下draft-js-export-html

export default class Edit extends React.Component {

    // 设置props叫做内容，然后由父component的传下来 问题1：draft.JS如何直接将内容放进去
    // 问题2：draft.js如何将编辑框里的内容取出来
    constructor(props) {
        super(props);
        this.state = {
            myhtml: '',
        };
        const content = window
            .localStorage
            .getItem('content');

        if (content) {
            this.state.editorState = EditorState.createWithContent(convertFromRaw(JSON.parse(content)));
        } else {
            this.state.editorState = EditorState.createEmpty();

        }

        this.onChange = this
            .onChange
            .bind(this)
        this.focus = () => {
            this.editor.focus
        }
        this.getContentState = this
            .getContentState
            .bind(this);
        
        this.updateCotentSate=this.updateCotentSate.bind(this)
    }

    onChange(editorState) {
        const contentState = editorState.getCurrentContent();

        // console.log('content state',convertToRaw(contentState));
        const raw = convertToRaw(contentState)
        console.log(raw)
        // console.log(typeof(raw))//对象
        console.log('jsonStringify', JSON.stringify({contentState: convertToRaw(contentState)})) //将对象变成string

        // console.log(convertToRaw(contentState))
        // this.saveContent(contentState);
        this.setState({editorState})
    }

    saveContent = (contentState) => {
        //由于在CRUDmodule中不引入draft，因此JsonObj转String的工作在这里完成
        const data = JSON.stringify({contentState: convertToRaw(contentState)});
        PostCRUD.savePost('59f6bc44b7664b5fd2789c27',data);
    };

    getContentState() {
        var self = this
        PostCRUD
            .getPost()
            .then(function (res) {
                //由Json字符串转为Json对象
                var rawContentState = JSON.parse(res.data.contentState);
                //由Json对象变成contentState对象
                const newContentState = convertFromRaw(rawContentState.contentState);
                //由ContentState对象变成html
                const contentHTML = stateToHTML(newContentState)
                console.log(contentHTML)
                self.setState({myhtml: contentHTML})
                console.log(self.state.myhtml)
            })
    }
    updateCotentSate() {
        var self = this;
        const contentState = this.state.editorState.getCurrentContent();
        const data = JSON.stringify({contentState: convertToRaw(contentState)});
        PostCRUD.updatePost('59f6bc44b7664b5fd2789c27',data)
    }

    componentDidMount() {
        // axios.get(`/post/`).then(val => val.json) .then(rawContent => {   if
        // (rawContent) {     this.setState({ editorState:
        // EditorState.createWithContent(convertFromRaw(rawContent)) })   } else {
        // this.setState({ editorState: EditorState.createEmpty() });   } });
    }

    render() {
        return (
            <div onClick={this.focus}>
                <Editor
                    readOnly={false}
                    editorState={this.state.editorState}
                    onChange={this.onChange}
                    plugins={[inlineToolbarPlugin]}
                    ref={(element) => {
                    this.editor = element;
                }}/>
                <InlineToolbar/> {/* <EmojiSuggestions /> */}
                {/* <EmojiSelect /> */}
                <button type="button" onClick={this.getContentState}>取回contentState</button>
                <button type="button" onClick={this.updateCotentSate}>更新</button>
                <div>{renderHTML(this.state.myhtml)}</div>
            </div>
        );
    }
}
