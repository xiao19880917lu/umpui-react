/**
 * @file 日期范围选择组件
 * @Liuzechun <liuzechun@baidu.com>
 */
import React from 'react';
import ReactDOM from 'react-dom';
import MarkdownElement from '../../lib/MarkdownElement.js';
import RangeDatepicker from '../../lib/src/RangeDatepicker.js';
export default class RangeDatepickerApp extends React.Component {
    constructor(props) {
        super(props);
    }
    onChange(start, end) {
        console.log(start, end);
    }
    render() {
        const mdText = require('text!../mdFile/rangeDatepicker.md');
        let config = {
            showMenu: true
            // ,defaultValue: {
            //     start: '2016-08-13 13:09:58',
            //     end: '2016-08-16 19:09:58'
            // }
        };
        return (
            <div className="umpui-component">
                <h3 className="umpui-layer umpui-title">日期/时间范围选择</h3>
                <RangeDatepicker config={config} onChange={this.onChange.bind(this)}/>
                <div className="umpui-layer umpui-block">
                    <MarkdownElement text={mdText}/>
                </div>
            </div>
        );
    }
}
