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
        };
    }
    handleFormSlider(event) {
        event.stopPropagation();
    }
    render() {
        const mdText = require('text!../mdFile/formSlider.md');
        return (<div className="umpui-component">
            <h3 className="umpui-layer umpui-title">级联分步骤的表单组件</h3>
            <FormSlider formConfig={PageData.sliderConfig} fromData={PageData.formData}
                submit={this.handleFormSlider} />
            <div className="umpui-layer umpui-block">
                <MarkdownElement text={mdText}/>
            </div>
        </div>);
    }

}
