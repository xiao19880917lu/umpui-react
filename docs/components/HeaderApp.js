/**
 * @file横向或者纵向的form表单展示框
 * **/
import React from 'react';
import ReactDOM from 'react-dom';
import MarkdownElement from '../../lib/MarkdownElement.js';
import NavData from '../mockData/NavData.js';
export default class HeaderApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        const mdText = require('text!../mdFile/header.md');
        return (
            <div className="umpui-component">
                <div className="umpui-layer umpui-block">
                    <MarkdownElement text={mdText}/>
                </div>
            </div>
        );
    }

}
