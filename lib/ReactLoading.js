/**
 * @file Loading 组件
 * @desc 一般用于上方提示的Loading组件
 * @author luyongfang
 */
var React = require('react');
var ReactDOM = require('react-dom');
require('!style!css!sass!../sass/app/_loading.scss');
var ReactLoading = React.createClass({
    getInitialState: function () {
        return {
            content: '',
            loading: false,
            timeout: null
        };
    },
    render: function () {
        var self = this;
        if (!this.state.loading) {
            var loadDom = document.getElementById('loading');
            loadDom && ReactDOM.unmountComponentAtNode(loadDom);
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
});
module.exports = ReactLoading;
