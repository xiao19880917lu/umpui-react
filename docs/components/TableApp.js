/**
 * @file Table使用说明
 * **/
import React from 'react';
import ReactDOM from 'react-dom';
import marked from 'marked';
import {message} from 'antd';
import Table from '../../lib/Table/Table.js';
import MarkdownElement from '../../lib/MarkdownElement.js';
import PageData from '../mockData/PageData.js';
export default class TableApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    selData() {
        let arrData = this.refs.table.getSelectedData();
        console.log(arrData);
    }
    cusHeader() {
        message.info('除了table配置的功能外,可以自定义header,如<Table><div>巴拉巴拉</div></Table>');
    }
    trDoubleClick(row) {
        console.log(row);
    }
    render() {
        const mdText = require('text!../mdFile/table.md');
        return (<div className="umpui-component">
            <h3 className="umpui-layer umpui-title">Table表格</h3>
            <div className="umpui-block">
                <span className="btn btn-info"
                    onClick={this.selData.bind(this)}>获取选中行-看console</span>
            </div>
            <Table ref="table" {...PageData.table} trDoubleClick={this.trDoubleClick.bind(this)}>
                <div className="umpui-header-extra" onClick={this.cusHeader.bind(this)}>
                    <i className="fa fa-book"></i>
                    <span>自定义功能</span>
                </div>
            </Table>
            <div className="umpui-layer umpui-block">
                <MarkdownElement text={mdText}/>
            </div>
        </div>);
    }

}
