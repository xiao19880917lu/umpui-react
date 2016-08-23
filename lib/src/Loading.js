/**
 * @file 加载中...
 * @Liuzechun <liuzechun@baidu.com>
 * @date 2016-08-18
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {Spin} from 'antd';
require('!style!css!sass!../../sass/app/_loading.new.scss');

export default class Loading extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        let tip = null;
        if (this.props.tip !== undefined) {
            tip = this.props.tip;
        } else {
            tip = (
                <i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
            );
        }
        return (
            <div className="u-loading">
                <Spin spinning={this.props.loading} tip={tip}>
                    {this.props.children}
                </Spin>
            </div>
        );
    }
}
