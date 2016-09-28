/**
 * @file 日期范围选择组件
 * @Liuzechun <liuzechun@baidu.com>
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {Button} from 'antd';
import MarkdownElement from '../../lib/MarkdownElement.js';
import RangeDatepicker from '../../lib/src/RangeDatepicker.js';
export default class RangeDatepickerApp extends React.Component {
    constructor(props) {
        super(props);
    }
    onChange({start, end}) {
        console.log(start, end);
    }
    getValue() {
        let result = this.refs.datepicker.getValue();
        console.log(result);
    }
    setValue() {
        let start = '2016-08-13 13:09:58';
        let end = '2016-09-28 13:00:58';
        // start = new Date(start);
        // end = new Date(end);
        // this.refs.datepicker.setValue(start);
        // this.refs.datepicker.setValue(null, end);
        this.refs.datepicker.setValue(start, end);
    }
    render() {
        const mdText = require('text!../mdFile/rangeDatepicker.md');
        let config = {
            showMenu: true,
            // defaultValue: {
            //     start: '2016-08-13 13:09:58',
            //     end: '2016-08-16 19:09:58'
            // }
        };
        return (
            <div className="umpui-component">
                <h3 className="umpui-layer umpui-title">日期/时间范围选择</h3>
                <RangeDatepicker ref="datepicker" config={config} onChange={this.onChange.bind(this)}/>
                <div>
                    <Button type="primary" onClick={this.getValue.bind(this)}>获取数据</Button>
                    &nbsp;&nbsp;&nbsp;
                    <Button type="primary" onClick={this.setValue.bind(this)}>设置自定义日期</Button>
                </div>
                <div className="umpui-layer umpui-block">
                    <MarkdownElement text={mdText}/>
                </div>
            </div>
        );
    }
}
