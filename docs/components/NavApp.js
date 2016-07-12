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
        this.state = {
            iconList: false
        };
    }
    changeIconList() {
        this.setState({iconList: !this.state.iconList});
    }
    render() {
        const mdText = require('text!../mdFile/nav.md');
        return (
            <div className="umpui-component">
                <h3 className="umpui-layer umpui-title">导航列表展示</h3>
                <span onClick={this.changeIconList.bind(this)}><i className="fa fa-list">点击收缩</i></span>
                <div className="umpui-block">
                    <Nav ref="nav" navConfig={PageData.NavData}
                    background={'#3a3f51'} hoverBackground={'#4a4a4a'}
                    fontColor={'#fff'} hoverFontColor={'#eee'} iconList={this.state.iconList}/>
                </div>
                <div className="umpui-layer umpui-block">
                    <MarkdownElement text={mdText}/>
                </div>
            </div>
        );
    }

}
