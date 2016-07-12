/**
 * @file横向或者纵向的form表单展示框
 * **/
import React from 'react';
import ReactDOM from 'react-dom';
import marked from 'marked';
import MarkdownElement from '../../lib/MarkdownElement.js';
import PageData from '../mockData/PageData.js';
import Nav from '../../lib/Nav';
export default class NavApp extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const mdText = require('text!../mdFile/nav.md');
        return (
            <div className="umpui-component">
                <h3 className="umpui-layer umpui-title">导航列表展示</h3>
                <div className="umpui-block">
                    <Nav ref="nav" navConfig={PageData.NavData} width={180}
                    background={'#3a3a3a'} hoverBackground={'#4a4a4a'}
                    fontColor={'#fff'} hoverFontColor={'#eee'}/>
                </div>
                <div className="umpui-layer umpui-block">
                    <MarkdownElement text={mdText}/>
                </div>
            </div>
        );
    }

}
