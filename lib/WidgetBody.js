/**
 * @file WidgetBody组件
 * @author renxintao@baidu.com
 * @date 2016-05-17
 */
var React = require('react');
var ReactDOM = require('react-dom');
// require('!style!css!sass!../sass/app/_widgetBody.scss');
var ReactHighcharts = require('react-highcharts/dist/ReactHighcharts.src');
var ReactHighstock = require('react-highcharts/dist/ReactHighstock.src');
var $ = require('jquery');
var WidgetBody = React.createClass({
    generateBody: function () {
        var bodyType = this.props.widgetConf.bodyConf.widgetType;
        var chartConfig = this.props.widgetConf.bodyConf.widgetContent;
        var id = this.props.widgetConf.id;
        var widgetBodyId = 'widgetBody_' + id;
        switch (bodyType) {
            case 'text':
                var widgetBody = this.props.widgetConf.bodyConf.widgetContent;
                return widgetBody;
            case 'chart':
                return  <ReactHighcharts config={chartConfig} />;
            case 'stock':
                return <ReactHighstock config={chartConfig} />;
            default:
                return null;
        }
    },
    render: function () {
        return (
        <div ref='chart' className="panel-body" id={'widgetBody_' + this.props.widgetConf.id}
        ref={'widgetBody_' + this.props.widgetConf.id} onClick={this.handleClick}>
             {this.generateBody()}
        </div>);
    }
});

module.exports = WidgetBody;
