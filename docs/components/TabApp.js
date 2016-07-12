/**
 * @file横向或者纵向的form表单展示框
 * **/
import React from 'react';
import ReactDOM from 'react-dom';
import marked from 'marked';
import PageData from '../mockData/PageData.js';
import ReactTab from '../../lib/ReactTab.js';
import MarkdownElement from '../../lib/MarkdownElement.js';
export default class TabApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    handleOperation(tabId) {
        console.log('当前activetab:' + tabId);
    }
    tabcGenerator(tabMap, tabcMap, currentTab) {
        let divList = [];
        tabcMap.forEach(function (v, k) {
            let className = (k * 1 === currentTab) ? 'am-active' : '';
            className += ' am-tab-panel';
            let attr = 'data-tab-panel-' + k;
            // 如果有复杂的逻辑展示-请修改这里的代码,这里有一个缺点是如何通过map去获取渲染哪个组件
            divList.push(<div attr data-key={attr} className={className} key={v}>
                <div id={v}>{'自定义tabcGenerator,当前是第' + k + '个Tab'}</div>
                </div>);
        });
        return divList;
    }
    render() {
        const mdText = require('text!../mdFile/tab.md');
        return (
            <div className="umpui-component">
                <div className="umpui-block">
                    <ReactTab ref="tab" {...PageData.tabData} handleOperation={this.handleOperation.bind(this)}
                    tabcGenerator={this.tabcGenerator.bind(this)}/>
                </div>
                <div className="umpui-layer umpui-block">
                    <MarkdownElement text={mdText}/>
                </div>
            </div>
        );
    }

}
