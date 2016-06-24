/**
 * @file WidgetHead组件
 * @author renxintao@baidu.com
 * @date 2016-05-24
 */
var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
require('!style!css!sass!../sass/app/_widgetHead.scss');
var WidgetHead = React.createClass({
    getInitialState: function () {
        return {
            refreshed: this.props.initialRefreshed
        };
    },

    componentDidMount() {
        this.onRefreshed();
    },

    /**
     * 刷新操作触发函数,执行Widget刷新操作回调函数
     */
    onRefreshed: function () {
        var newState = !this.state.refreshed;
        this.setState({
            refreshed: newState
        });
        this.props.callbackRefreshed(newState);
    },

    /**
     * 放大操作触发函数，执行Widget放大操作回调函数
     */
    onExpanded: function () {
        var widgetId = 'widgethead_' + this.props.widgetConf.id;
        var viewFullScreen = $('#' + widgetId + ' .fa-expand');
        var compressFullScreen = $('#' + widgetId + ' .fa-compress');
        if (viewFullScreen.length > 0) {
            $(this.refs.expandOrCompress).removeClass('fa-expand');
            $(this.refs.expandOrCompress).addClass('fa-compress');
            this.props.callbackExpanded();
            this.onRefreshed();
        }
        else if (compressFullScreen.length > 0) {
            this.props.callbackCompressed();
            $(this.refs.expandOrCompress).removeClass('fa-compress');
            $(this.refs.expandOrCompress).addClass('fa-expand');
            this.onRefreshed();
        }
    },

    /**
     * 编辑操作触发函数，执行Widget编辑操作回调函数
     */
    onEdited: function () {
        var editWidget = this.props.widgetConf;
        this.props.callbackEdited(editWidget);
    },

    /**
     * 删除操作触发函数，执行Widget删除操作回调函数
     */
    onDeleted: function () {
        var deleteWidget = this.props.widgetConf;
        // 要在这里发一个ajax，请求后台操作，操作成功后，执行下行
        this.props.callbackDeleted(deleteWidget);
    },

    /**
     * WidgerHead生成函数，每一个操作绑定相应函数
     * 包括刷新、放大、编辑、删除操作
     * @return {Object} 返回WidgetHead样式
     */
    generateHead: function () {
        var headName = this.props.widgetConf.headConf.widgetName;
        var operationData = this.props.widgetConf.headConf.operationConf;
        var operationList = [];
        for (var key in operationData) {
            if (operationData.hasOwnProperty(key)) {
                if (key === 'refresh') {
                    operationList.unshift(<li key={key} className="widget-operation">
                    <i className={operationData[key]} onClick={this.onRefreshed}></i></li>);
                }
                if (key === 'expand') {
                    operationList.unshift(<li key={key} className="widget-operation">
                    <i className={operationData[key]} ref="expandOrCompress" onClick={this.onExpanded}></i></li>);
                }
                if (key === 'edit') {
                    operationList.unshift(<li key={key} className="widget-operation">
                    <i className={operationData[key]} onClick={this.onEdited}></i></li>);
                }
                if (key === 'delete') {
                    operationList.unshift(<li key={key} className="widget-operation">
                    <i className={operationData[key]} onClick={this.onDeleted}></i></li>);
                }
            }
        }
        var head = <div className="panel-heading widget-head" id={'widgethead_' + this.props.widgetConf.id}
        ref={'widgethead_' + this.props.widgetConf.id}><div>{headName}</div>
            <div><ul>{operationList}</ul></div></div>;
        return head;
    },
    render: function () {
        var head = this.generateHead();
        return head;
    }
});
module.exports = WidgetHead;
