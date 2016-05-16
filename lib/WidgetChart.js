/**
 * @file Input组件
 * @author renxintao
 */
var React = require('react');
var ReactDOM = require('react-dom');
var WidgetChart = React.createClass({
        getInitialState: function () {
            return {
                val: 0
            };
        },
generateChart: function () {
    if (this.props.url) {
    
    }else if (this.props.data){
        this.props.data;
        new Hig
    }else {
        return null;
    }


},
        render: function () {
            return (<div className="widget-chart">
                    <ChartHead {...this.props}/>
                    <div>{this.generateChart}</div>
                </div>);
        }
    });

module.exports = WidgetChart;

var objWidgetChartConf = {
    headConf: {
        export: true,
        share: true
    },
    chartConf: {
    }
};
// <WidgetChart objWidgetChartConf={objWidgetChartConf}/>
