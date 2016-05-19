/**
 * @file Widget组件
 * @author renxintao@baidu.com
 * @date 2016-04-17
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
    onHeadRefreshed: function (newState) {
       // console.log("newState1="+newState);
        this.setState({
            refreshed: newState
        });
    },
    onHeadExpanded: function (newXs, newMd) {
       // console.log("newXs="+newXs);
       // console.log("newMd="+newMd);
        this.setState({
            xs: newXs,
            md: newMd
        });
    },
    onHeadEdited: function (editWidget) {
       // console.log("onHeadEdited");
       // console.log(editWidget);
        this.props.onShowEditWidget(editWidget);
    },
    onHeadDeleted: function (deleteWidget) {
       // console.log("on HeadDeleted");
       // console.log(deleteWidget);
        this.props.onDeleteWidget(deleteWidget);
    },
    render: function () {
        return (
            <Col xs={this.state.xs} md={this.state.md} id={this.props.objWidgetConf.id}
            ref={this.props.objWidgetConf.id}>
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

