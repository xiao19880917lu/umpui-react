/**
 * @file 生成MarkDown样式，text是通过require引入的
 * */
import React from 'react';
import marked from 'marked';
export default class MarkdownElement extends React.Component {
    constructor(props) {
        super(props);
        marked.setOptions({
            gfm: true,
            tables: true,
            breaks: false,
            pedantic: false,
            sanitize: true,
            smartLists: true,
            smartypants: false
        });
    }
    render() {
        const text = this.props.text;
        const html = marked(text || '');
        return (<div dangerouslySetInnerHTML={{__html: html}}></div>);
    }
}
