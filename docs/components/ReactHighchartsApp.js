/**
 * @file ReactHighcharts使用说明
 * **/
import React from 'react';
import ReactDOM from 'react-dom';
import marked from 'marked';
import ReactHighcharts from '../../lib/ReactHighcharts.js';
import MarkdownElement from '../../lib/MarkdownElement.js';
import PageData from '../mockData/PageData.js';
export default class WidgetApp extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const mdText = require('text!../mdFile/reactHighcharts.md');
        return (<div className="umpui-component">
            <h3 className="umpui-layer umpui-title">ReactHighcharts组件</h3>
            <ReactHighcharts config={PageData.reactHighcharts}
                        ref={'widgetBody_chart_'}/>
            <div className="umpui-layer umpui-block">
                <MarkdownElement text={mdText}/>
            </div>
        </div>);
    }

}
