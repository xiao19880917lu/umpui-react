/**
 * @file Loading 组件
 * @desc 一般用于上方提示的Loading组件
 * @author luyongfang
 */
import React from 'react';
import ReactDOM from 'react-dom';
require('!style!css!sass!../sass/app/_loading.scss');
export default class ReactLoading extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: '',
            loading: false,
            timeout: null
        };
    }
    render() {
        let self = this;
        if (!this.state.loading) {
            /*let loadDom = document.getElementById('loading');
            loadDom && ReactDOM.unmountComponentAtNode(loadDom);*/
            return null;
        }
        if (this.state.timeout) {
            setTimeout(function () {
                self.setState({timeout: null, loading: false});
            }, self.state.timeout);
        }
        return (<div id="loading">
                    <div className="wrapper">
                        <div className="double-bounce1"></div>
                        <div className="double-bounce2"></div>
                    </div>
                    <span>{this.state.content}</span>
                </div>);
    }
}
