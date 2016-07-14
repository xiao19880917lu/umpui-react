/**
 * @file横向或者纵向的form表单展示框
 * **/
import React from 'react';
import ReactDOM from 'react-dom';
import marked from 'marked';
import ReactForm from '../../lib/ReactForm';
import ReactTransverForm from '../../lib/ReactTransverForm';
import MarkdownElement from '../../lib/MarkdownElement.js';
import PageData from '../mockData/PageData.js';
import DatePicker from 'antd/lib/date-picker';
export default class FormApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    getFormValues() {
        let objData = this.refs.apiForm.getFormValues();
        let objData2 = this.refs.apiTransForm.getFormValues();
        let jsonData = JSON.stringify(objData2);
        alert(jsonData);
    }
    onChange(value) {
        console.log(value);
    }
    render() {
        const mdText = require('text!../mdFile/form.md');
        return (
            <div className="umpui-component">
                <h3 className="umpui-layer umpui-title">纵向Form表单</h3>
                <div className="umpui-block">
                    <ReactForm ref="apiForm" config={PageData.form}/>
                </div>
                <h3 className="umpui-layer umpui-title">横向Form表单</h3>
                <div className="umpui-block">
                    <ReactTransverForm ref="apiTransForm" config={PageData.form}/>
                </div>
                <h3 className="umpui-layer umpui-title">获取表单的值</h3>
                <div>
                    <span className="btn btn-info"
                    onClick={this.getFormValues.bind(this)}>点我获横向表单值</span>
                </div>
                <div className="umpui-layer umpui-block">
                    <MarkdownElement text={mdText}/>
                </div>
            </div>
        );
    }

}
