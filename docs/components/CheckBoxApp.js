/**
 * @file checkbox - label单个演示
 * **/
import React from 'react';
import ReactDOM from 'react-dom';
import marked from 'marked';
import ReactCheckbox from '../../lib/ReactCheckbox';
import MarkdownElement from '../../lib/MarkdownElement.js';
import PageData from '../mockData/PageData.js';
export default class CheckBoxApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: true
        };
    }
    openModal() {
        this.setState({modal: !this.state.modal});
    }
    render() {
        const mdText = require('text!../mdFile/ckbox.md');
        return (
            <div className="umpui-component">
                <h3 className="umpui-layer umpui-title">label-checkbox元素</h3>
                <div className="umpui-block">
                    <ReactCheckbox {...PageData.ckbox} ref="checkbox"/>
                </div>
                <h3 className="umpui-layer umpui-title">代码演示</h3>
                <div className="umpui-layer umpui-block">
                    <MarkdownElement text={mdText}/>
                </div>
            </div>
        );
    }

}
