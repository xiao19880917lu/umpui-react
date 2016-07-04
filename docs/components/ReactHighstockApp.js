/**
 * @file ReactHighstock使用说明
 * **/
import React from 'react';
import ReactDOM from 'react-dom';
import marked from 'marked';
import ReactHighstock from '../../lib/ReactHighstock.js';
import MarkdownElement from '../../lib/MarkdownElement.js';
import PageData from '../mockData/PageData.js';
export default class WidgetApp extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const mdText = require('text!../mdFile/reactHighstock.md');
        return (<div className="umpui-component">
            <h3 className="umpui-layer umpui-title">ReactHighstock组件</h3>
            <ReactHighstock config={PageData.reactHighstock}
                        ref={'widgetBody_chart_'}/>
            <div className="umpui-layer umpui-block">
                <MarkdownElement text={mdText}/>
            </div>
        </div>);
    }

}
