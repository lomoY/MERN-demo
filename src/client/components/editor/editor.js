// todo:图片，URL
import React from 'react';
import ReactDOM from 'react-dom';
import {getArticle, saveArticle, updateArticle} from './../../service/postcrud'
import {EditorState, convertToRaw, convertFromRaw, RichUtils} from 'draft-js';
import Editor, {createEditorStateWithText} from 'draft-js-plugins-editor';
// draft plugins
import {
    ItalicButton,
    BoldButton,
    UnderlineButton,
    CodeButton,
    HeadlineOneButton,
    HeadlineTwoButton,
    HeadlineThreeButton,
    UnorderedListButton,
    OrderedListButton,
    BlockquoteButton,
    CodeBlockButton
} from 'draft-js-buttons';
import createInlineToolbarPlugin from 'draft-js-inline-toolbar-plugin'; //行内工具
import createImagePlugin from 'draft-js-image-plugin'; //图片
import createLinkPlugin from 'draft-js-anchor-plugin'; //超链接
import './editor.css'
import 'draft-js-inline-toolbar-plugin/lib/plugin.css'
import 'draft-js-image-plugin/lib/plugin.css';
// import createEmojiPlugin from 'draft-js-emoji-plugin';//draft插件：emoj表情 import
// 'draft-js-emoji-plugin/lib/plugin.css'; 实例化插件
const imagePlugin = createImagePlugin();
const linkPlugin = createLinkPlugin(); //无法正常工作
const inlineToolbarPlugin = createInlineToolbarPlugin({
    structure: [
        BoldButton,
        ItalicButton,
        UnderlineButton,
        CodeButton,
        HeadlineOneButton,
        HeadlineTwoButton,
        HeadlineThreeButton,
        UnorderedListButton,
        OrderedListButton,
        BlockquoteButton,
        CodeBlockButton,
        linkPlugin.LinkButton
    ]
});
// const emojiPlugin = createEmojiPlugin(); const { EmojiSuggestions,
// EmojiSelect } = emojiPlugin;//创建自定义标签
const {InlineToolbar} = inlineToolbarPlugin;

const draftPlugins = [inlineToolbarPlugin, imagePlugin, linkPlugin]

export default class Edit extends React.Component {

    // 设置props叫做内容，然后由父component的传下来 问题1：draft.JS如何直接将内容放进去
    // 问题2：draft.js如何将编辑框里的内容取出来
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            desc:''
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

        this.updateCotentSate = this
            .updateCotentSate
            .bind(this)
        this.saveContent = this
            .saveContent
            .bind(this)

        this.onChangeTitle = this
            .onChangeTitle
            .bind(this);

        this.onChangeDesc = this
            .onChangeDesc
            .bind(this);
    }

    onChange(editorState) {
        const contentState = editorState.getCurrentContent();

        // console.log('content state',convertToRaw(contentState));
        const raw = convertToRaw(contentState)
        console.log(raw)
        // console.log(typeof(raw))//对象
        console.log('jsonStringify', JSON.stringify({contentState: convertToRaw(contentState)})) //将对象变成string

        // console.log(convertToRaw(contentState)) this.saveContent(contentState);
        this.setState({editorState})
    }

    onChangeTitle(e) {
        this.setState({title: e.target.value});
    }
    onChangeDesc(e) {
        console.log(this)
        this.setState({desc: e.target.value})
    }

    saveContent = () => {
        const contentState = this
            .state
            .editorState
            .getCurrentContent();
        const data = JSON.stringify({contentState: convertToRaw(contentState)});
        saveArticle(this.state.title,this.state.desc,data);
    };

    getContentState() {
        var self = this
        getArticle().then(function (res) {
            //由Json字符串转为Json对象
            var rawContentState = JSON.parse(res.data.contentState);
            //由Json对象变成contentState对象
            const newContentState = convertFromRaw(rawContentState.contentState);
        })
    }
    updateCotentSate() {
        var self = this;
        const contentState = this
            .state
            .editorState
            .getCurrentContent();
        const data = JSON.stringify({contentState: convertToRaw(contentState)});
        updateArticle('59f6bc44b7664b5fd2789c27', data)
    }

    componentDidMount() {
        // axios     .get(`/post/`)     .then(val => val.json)     .then(rawContent => {
        //         if (rawContent) {             this.setState({ editorState:
        // EditorState.createWithContent(convertFromRaw(rawContent))      })         }
        // else {             this.setState({ editorState: EditorState.createEmpty()
        //     });         }     });
        var self = this;
        // getArticle()     .then(function (res) {         //由Json字符串转为Json对象         var
        // rawContentState = JSON.parse(res.data.contentState);         self.setState({
        //           editorState:
        // EditorState.createWithContent(convertFromRaw(rawContentState.contentState))
        //     })     })
    }

    render() {
        return (
            <div onClick={this.focus}>
                <input
                    className="articleTitle"
                    type="text"
                    placeholder="在此输入文章标题"
                    value={this.state.title}
                    onChange={this.onChangeTitle}/>
                <input className="articledesc" type="text" value={this.state.desc} onChange={this.onChangeDesc} placeholder="在此输入文章概述"/>
                <Editor
                    editorState={this.state.editorState}
                    onChange={this.onChange}
                    plugins={draftPlugins}
                    ref={(element) => {
                    this.editor = element;
                }}/>
                <InlineToolbar/> {/* <EmojiSuggestions /> */}
                {/* <EmojiSelect /> */}
                <button type="button" onClick={this.getContentState}>取回contentState</button>
                <button type="button" onClick={this.updateCotentSate}>更新</button>
                <button type="button" onClick={this.saveContent}>保存</button>
            </div>
        );
    }
}
