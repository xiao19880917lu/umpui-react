/**
 * @file 简要介绍
 * **/
import React from 'react';
import ReactDOM from 'react-dom';
import MarkdownElement from '../../lib/MarkdownElement.js';
export default class IntroductionApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        const mdText = require('text!../mdFile/introduction.md');
        return (<div className="umpui-component">
                <div className="umpui-layer umpui-block">
                    <MarkdownElement text={mdText}/>
                </div>
            </div>
        );

    }

}
