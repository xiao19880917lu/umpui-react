/**
 * @file横向或者纵向的form表单展示框
 * **/
import React from 'react';
import ReactDOM from 'react-dom';
import marked from 'marked';
import MarkdownElement from '../../lib/MarkdownElement.js';
import PageData from '../mockData/PageData.js';
import ReactList from '../../lib/ReactList.js';
export default class ListApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        const mdText = require('text!../mdFile/nav.md');
        return (
            <div className="umpui-component">
                <h3 className="umpui-layer umpui-title">导航列表展示1展示</h3>
                <div className="umpui-block">
                    <ReactList ref="nav" data={PageData.ListData}/>
                </div>
                <h3 className="umpui-layer umpui-title">导航列表展示2展示</h3>
                <div className="umpui-block">
                    <ReactList ref="nav" {...PageData.ListData2}/>
                </div>
                <div className="umpui-layer umpui-block">
                    <MarkdownElement text={mdText}/>
                </div>
            </div>
        );
    }

}
