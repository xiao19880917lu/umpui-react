/**
 * @file Widget组件
 * @author renxintao@baidu.com
 * @date 2016-04-17
 */
var React = require('react');
var ReactDOM = require('react-dom');
import {Panel, Row, Col, Input} from 'react-bootstrap';
var WidgetHead = require('./WidgetHead');
var WidgetBody = require('./WidgetBody');
var Widget = React.createClass({
    render: function () {
        return (<div className="panel panel-default" onClick={this.handleClick}>
                    <WidgetHead head={this.props.objWidgetConf.headConf}/>
                    <WidgetBody body={this.props.objWidgetConf.bodyConf}/>
                    </div>);
    }
});

module.exports = Widget;

