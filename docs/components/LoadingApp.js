/**
 * @file 日期范围选择组件
 * @Liuzechun <liuzechun@baidu.com>
 */
import React from 'react';
import ReactDOM from 'react-dom';
import MarkdownElement from '../../lib/MarkdownElement.js';
import Loading from '../../lib/src/Loading.js';
import {Spin, Switch, Card} from 'antd';

export default class LoadingApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
    }
    toggle(value) {
        this.setState({loading: value});
    }
    render() {
        const mdText = require('text!../mdFile/loading.md');
        // 这里可以是任何内容
        const container = (
                    <Card style={{width: 300}}>
                        <p>这里可以是任何内容</p>
                        <p>可以是表单</p>
                        <p>也可以是对话框</p>
                    </Card>
                );
        const tip = (
                    <span>正在加载中...</span>
                );
        return (
            <div className="umpui-component">
                <h3 className="umpui-layer umpui-title">Loading组件</h3>
                <div className="inline-block">
                    <Loading loading={this.state.loading}>
                        {container}
                    </Loading>
                </div>
                &nbsp;&nbsp;&nbsp;
                <div className="inline-block">
                    <Loading key="2" loading={this.state.loading} tip={tip}>
                        {container}
                    </Loading>
                </div>
                <div>切换加载状态：
                    <Switch checked={this.state.loading} onChange={this.toggle.bind(this)} />
                </div>
                <div className="umpui-layer umpui-block">
                    <MarkdownElement text={mdText}/>
                </div>
            </div>
        );
    }
}
