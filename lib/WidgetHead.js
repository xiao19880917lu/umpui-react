/**
 * @file WidgetHead组件
 * @author renxintao@baidu.com
 * @date 2016-04-17
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
    onRefreshed: function () {
        // console.log("on Refreshed");
        var newState = !this.state.refreshed;
        this.setState({
            refreshed: newState
        });
        this.props.callbackRefreshed(newState);
    },
    onExpanded: function () {
        // console.log("on Expand");
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
    onEdited: function () {
        var editWidget = this.props.widgetConf;
        // console.log("on Edited");
        // console.log(editWidget);
        this.props.callbackEdited(editWidget);
    },
    onDeleted: function () {
        var deleteWidget = this.props.widgetConf;
        // console.log("on Deleted");
        // console.log(deleteWidget);
        // 要在这里发一个ajax，请求后台操作，操作成功后，执行下行
        this.props.callbackDeleted(deleteWidget);
    },
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
