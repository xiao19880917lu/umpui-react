/**
 * @file 自定义Form表单包含哪些元素
 * @author luyongfang
 * */
import React from 'react';
import ReactDOM from 'react-dom';
import marked from 'marked';
import ReactTableForm from '../../lib/ReactTableForm';
import MarkdownElement from '../../lib/MarkdownElement.js';
import PageData from '../mockData/PageData.js';
export default class TableFormApp extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    getFormValue() {
        let objVal = this.refs.tableForm.getFormValues();
        console.log(objVal);
        alert(JSON.stringify(objVal));
    }
    render() {
        const mdText = require('text!../mdFile/tableForm.md');
        return (
            <div className="umpui-component">
                <h3 className="umpui-layer umpui-title">自定义要渲染的Form表单包含哪些元素</h3>
                <div className="umpui-block">
                    <ReactTableForm ref="tableForm" tableFormConfig={PageData.tableForm}
                    title="自定义需要渲染表单的元素"/>
                </div>
                <h3 className="umpui-layer umpui-title">获取表单的值</h3>
                <div className="umpui-layer umpui-block">
                    <span className="btn btn-info" onClick={this.getFormValue.bind(this)}>
                    点击获取表单的值-可看console或者alert弹出内容</span>
                </div>
                <h3 className="umpui-layer umpui-title">代码演示</h3>
                <div className="umpui-layer umpui-block">
                    <MarkdownElement text={mdText}/>                    
                </div>
            </div>         
        );
    }

}
