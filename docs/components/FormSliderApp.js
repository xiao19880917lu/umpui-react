/**
 * @file Form表单分步骤填写
 * **/
import React from 'react';
import ReactDOM from 'react-dom';
import marked from 'marked';
import FormSlider from '../../lib/FormSlider.js';
import MarkdownElement from '../../lib/MarkdownElement.js';
import PageData from '../mockData/PageData.js';
export default class FormSliderApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            style: {display: 'block'}
        };
    }

    /**
     * 表单提交按钮点击触发函数
     * @param {Array<Object>} formData 表单参数
     * @param {Array<Object>} form 该form表单配置
     */
    handleFormSliderSubmit(formData, form) {
        this.setState({style: {display: 'none'}});
        console.log(formData);
        console.log(form);
    }

    /**
     * 表单取消按钮点击触发函数
     */
    onCancel()  {
        this.setState(
            {style: {display: 'none'},
            sliderConfig: PageData.sliderConfig});
    }
    // list列表删除按钮回调函数
    onDeleteDashboard(dashboardName) {
        console.log(dashboardName);
    }
    render() {
        const mdText = require('text!../mdFile/formSlider.md');
        return (<div className="umpui-component">
            <h3 className="umpui-layer umpui-title">级联分步骤的表单组件</h3>
            <div style={this.state.style}>
            <FormSlider formConfig={PageData.sliderConfig} fromData={PageData.formData}
            submit={this.handleFormSliderSubmit.bind(this)} cancel={this.onCancel.bind(this)}
            onDeleted={this.onDeleteDashboard.bind(this)}/>
            </div>
            <div className="umpui-layer umpui-block">
                <MarkdownElement text={mdText}/>
            </div>
        </div>);
    }

}
