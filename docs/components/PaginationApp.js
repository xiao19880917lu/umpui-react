/**
 * @file Table使用说明
 * **/
import React from 'react';
import ReactDOM from 'react-dom';
import marked from 'marked';
import {message} from 'antd';
import Pagination from '../../lib/Table/Pagination.js';
import MarkdownElement from '../../lib/MarkdownElement.js';
import PageData from '../mockData/PageData.js';
export default class PaginationApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        const mdText = require('text!../mdFile/pagination.md');
        return (<div className="umpui-component">
            <h3 className="umpui-layer umpui-title">分页组件</h3>
            <Pagination {...PageData.pagination}/>
            <div className="umpui-layer umpui-block">
                <MarkdownElement text={mdText}/>
            </div>
        </div>);
    }

}
