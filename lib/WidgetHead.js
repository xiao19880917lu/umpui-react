/**
 * @file WidgetHead组件
 * @author renxintao@baidu.com
 * @date 2016-05-24
 */
var React = require('react');
var ReactDOM = require('react-dom');
require('!style!css!sass!../sass/app/_widgetHead.scss');
var WidgetHead = React.createClass({
    getInitialState: function () {
        return {
            refreshed: this.props.initialRefreshed
        };
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
        console.log("on Expand");
        if (this.props.initialExpandXs !== 12 && this.props.initialExpandMs !== 12) {
            var newXs = 12;
            var newMd = 12;
            this.props.callbackExpanded(newXs, newMd);
            $(this.refs.expandOrCompress).removeClass('fa fa-expand');
            $(this.refs.expandOrCompress).addClass('fa fa-compress');
        } else {
            var newXs = 6;
            var newMd = 6;
            this.props.callbackExpanded(newXs, newMd);
            $(this.refs.expandOrCompress).removeClass('fa fa-compress');
            $(this.refs.expandOrCompress).addClass('fa fa-expand');
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
        var head = <div className="panel-heading widget-head"><div>{headName}</div>
            <div><ul>{operationList}</ul></div></div>;
        return head;
    },
    render: function () {
        var head = this.generateHead();
        return head;
    }
});
module.exports = WidgetHead;
