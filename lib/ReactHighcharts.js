/**
 * @file ReactHighcharts组件
 * @author renxintao@baidu.com
 * @date 2016-06-30
 */
const React = require('react');
const ReactDOM = require('react-dom');
const Highcharts = require('highcharts');
let chartType = 'Chart';
class ReactHighcharts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            refresh: false
        };
    }
    refreshed() {
        let refreshState = !this.state.refresh;
        this.setState({
            refresh: refreshState
        });
    }
    renderChart(config) {
        if (!config) {
            throw new Error('Config must be specified for the component');
        }
        let chartConfig = config.chart;
        this.chart = new Highcharts[chartType](Object.assign({}, config, {
            chart: Object.assign({}, chartConfig, {
                renderTo: this.refs.chart
            })
        }), this.props.callback);
    }
    shouldComponentUpdate(nextProps) {
        if (nextProps.neverReflow || nextProps.isPureConfig && this.props.config === nextProps.config) {
            return true;
        }
        this.renderChart(nextProps.config);
        return false;
    }
    getChart() {
        if (!this.chart) {
            throw new Error('getChart() should not be called before the component is mounted');
        }
        return this.chart;
    }
    componentDidMount() {
        this.renderChart(this.props.config);
    }
    componentWillUnmount() {
        this.chart.destroy();
    }
    render() {
        let props = this.props;
        props = Object.assign({}, props, {
            ref: 'chart'
        });
        return React.createElement('div', props);
    }
}
ReactHighcharts.Highcharts = Highcharts;
module.exports = ReactHighcharts;
