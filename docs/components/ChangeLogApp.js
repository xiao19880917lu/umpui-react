/**
 * @file 更新日志
 * **/
import React from 'react';
import ReactDOM from 'react-dom';
import MarkdownElement from '../../lib/MarkdownElement.js';
export default class ChangeLogApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        const mdText = require('text!../mdFile/changeLog.md');
        return (<div className="umpui-component">
            <h3 className="umpui-layer umpui-title">更新日志</h3>
            <div className="umpui-layer umpui-block">
                <MarkdownElement text={mdText}/>
            </div>
        </div>);

    }

}