/**
 * @file Widget组件
 * @author renxintao@baidu.com
 * @date 2016-05-24
 */
var React = require('react');
var ReactDOM = require('react-dom');
import {Row, Col} from 'react-bootstrap';
var WidgetHead = require('./WidgetHead');
var WidgetBody = require('./WidgetBody');
var Widget = React.createClass({
    getInitialState: function () {
        return {
            refreshed: false,
            xs: 6,
            md: 6
        };
    },
    /**
     * 刷新操作Widget回调函数
     * @param {boolean} newState 刷新操作时newState
     *     状态变化true/false
     */
    onHeadRefreshed: function (newState) {
        this.setState({
            refreshed: newState
        });
    },
    /**
     * 放大操作Widget回调函数
     * @param {Number} newXs newMd,占的列数
     */
    onHeadExpanded: function (newXs, newMd) {
        this.setState({
            xs: newXs,
            md: newMd
        });
    },
    /**
     * 编辑操作Widget回调函数
     * @param {Object} editWidget 
     *     要编辑的Widget相关配置
     */ 
    onHeadEdited: function (editWidget) {
        this.props.onShowEditWidget(editWidget);
    },
    /**
     * 删除操作Widget回调函数
     * @param {Object} deleteWidget 
     *     要删除的Widget相关配置
     */ 
    onHeadDeleted: function (deleteWidget) {
        this.props.onDeleteWidget(deleteWidget);
    },
    render: function () {
        return (
            <Col xs={this.state.xs} md={this.state.md} id={'widget_'+this.props.objWidgetConf.id}
            ref={'widget_'+this.props.objWidgetConf.id}>
            <div className="panel panel-default">
                    <WidgetHead widgetConf={this.props.objWidgetConf}
                        initialRefreshed={this.state.refreshed}
                        callbackRefreshed={this.onHeadRefreshed}
                        initialExpandXs={this.state.xs}
                        initialExpandMd={this.state.md}
                        callbackExpanded={this.onHeadExpanded}
                        callbackEdited={this.onHeadEdited}
                        callbackDeleted={this.onHeadDeleted}/>
                    <WidgetBody body={this.props.objWidgetConf.bodyConf}/>
                </div>
             </Col>
             );
    }
});

module.exports = Widget;

