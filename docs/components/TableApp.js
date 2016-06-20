/**
 * @file Table使用说明
 * **/
import React from 'react';
import ReactDOM from 'react-dom';
import marked from 'marked';
import Table from '../../lib/Table/Table.js';
import MarkdownElement from '../../lib/MarkdownElement.js';
import PageData from '../mockData/PageData.js';
import $ from 'jquery';
export default class TableApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        const mdText = require('text!../mdFile/table.md');
        return (<div className="umpui-component">
            <h3 className="umpui-layer umpui-title">Table表格</h3>
            <Table ref="table" {...PageData.table} />
            <div className="umpui-layer umpui-block">
                <MarkdownElement text={mdText}/>
            </div>
        </div>);
    }

}
