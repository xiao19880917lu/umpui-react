/**
 * @file WidgetBody组件
 * @author renxintao@baidu.com
 * @date 2016-06-23
 */
import {Row, Col, Modal, ModalHeader, ModalBody, ModerFooter, Button} from 'react-bootstrap';
const React = require('react');
const ReactDOM = require('react-dom');
require('!style!css!sass!../sass/app/_widgetBody.scss');
const ReactHighcharts = require('./ReactHighcharts');
const ReactHighstock = require('./ReactHighstock');
const exporting = require('highcharts/modules/exporting');
const EventSystem = require('./EventSystem');
const Business = require('./Business/Business').default;
exporting(ReactHighcharts.Highcharts);
exporting(ReactHighstock.Highcharts);
class WidgetBody extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        };
    }
    componentDidMount() {
        let that = this;
        let thisWidget = this.props.widgetConf;
        let thisWidgetId = this.props.widgetConf.id;
        let bodyType = this.props.bodyConf.bodyType;
        let thisBodyId = this.props.bodyConf.bodyId;
        let tool = 'tool' + thisBodyId;
        if (bodyType === 'stock') {
            EventSystem.register(tool, function (thisChartX) {
                let thisX = thisChartX;
                let chart = that.refs['widgetBody_stock_' + thisBodyId];
                let cChart = chart.chart;
                let series = cChart.series;
                let data = series[0].data;
                let flag = 0;
                for (let serie in series) {
                    if (series[serie].visible) {
                        flag++;
                    }
                }
                if (flag > 0) {
                    for (let i in data) {
                        if (data[i].x === thisX) {
                            let datas = [];
                            for (let serie in series) {
                                if (series[serie].name !== 'Navigator') {
                                    datas.push(cChart.series[serie].data[i]);
                                }
                            }
                            cChart.tooltip.refresh(datas);
                            cChart.xAxis[0].drawCrosshair(null, datas[0]);
                        }
                    }
                }
            }, 'execute');
        }
        if (bodyType === 'chart') {
            EventSystem.register(tool, function (thisChartX) {
                let thisX = thisChartX;
                let cChart = that.refs['widgetBody_chart_' + thisBodyId].chart;
                let series = cChart.series;
                let data = series[0].data;
                let flag = 0;
                for (let serie in series) {
                    if (series[serie].visible) {
                        flag++;
                    }
                }
                if (flag > 0) {
                    for (let i in data) {
                        if (data[i].x === thisX) {
                            let datas = [];
                            for (let serie in series) {
                                if (series[serie].visible === true) {
                                    datas.push(cChart.series[serie].data[i]);
                                }
                            }
                            cChart.tooltip.refresh(datas);
                            cChart.xAxis[0].drawCrosshair(null, datas[0]);
                        }
                    }
                }
            }, 'execute');
        }
    }

    /**
     * 模态框关闭操作触发函数
     */
    close() {
        this.setState({showModal: false});
    }

    /**
     * 模态框弹出操作触发函数
     */
    open() {
        this.setState({showModal: true});
    }

    /**
     * 单图刷新操作触发函数
     */
    refresh() {
        let bodyType = this.props.bodyConf.bodyType;
        let bodyId = this.props.bodyConf.bodyId;
        switch (bodyType) {
            case 'chart':
                this.refs['widgetBody_chart_' + bodyId].refreshed();
                break;
            case 'stock':
                this.refs['widgetBody_stock_' + bodyId].refreshed();
                break;
            default:
                break;
        }
    }

    /**
     * 全显操作触发函数
     */
    allShow() {
        let bodyType = this.props.bodyConf.bodyType;
        let bodyId = this.props.bodyConf.bodyId;
        switch (bodyType) {
            case 'chart':
                let getCharts = this.refs['widgetBody_chart_' + bodyId].getChart();
                let chartSeries = getCharts.series;
                for (let serie in chartSeries) {
                    if (chartSeries.hasOwnProperty(serie)) {
                        chartSeries[serie].show();
                    }
                }
                break;
            case 'stock':
                let getStock = this.refs['widgetBody_stock_' + bodyId].getChart();
                let stockSeries = getStock.series;
                for (let serie in stockSeries) {
                    if (stockSeries.hasOwnProperty(serie)) {
                        stockSeries[serie].show();
                    }
                }
                break;
            default:
                break;
        }
    }

    /**
     * 全隐操作触发函数
     */
    allHide() {
        let bodyType = this.props.bodyConf.bodyType;
        let bodyId = this.props.bodyConf.bodyId;
        switch (bodyType) {
            case 'chart':
                let getCharts = this.refs['widgetBody_chart_' + bodyId].getChart();
                let chartSeries = getCharts.series;
                for (let serie in chartSeries) {
                    if (chartSeries.hasOwnProperty(serie)) {
                        chartSeries[serie].hide();
                    }
                }
                break;
            case 'stock':
                let getStock = this.refs['widgetBody_stock_' + bodyId].getChart();
                let stockSeries = getStock.series;
                for (let serie in stockSeries) {
                    if (stockSeries.hasOwnProperty(serie)) {
                        stockSeries[serie].hide();
                    }
                }
                break;
            default:
                break;
        }
    }

    /**
     * 生成刷新、分享、全显、全隐操作按钮
     * @return {Object} 操作按钮内容
     */
    generateOperation() {
        let operationList = [];
        let operation = this.props.bodyConf.operation;
        for (let key in operation) {
            if (operation.hasOwnProperty(key) && operation[key]) {
                switch (key) {
                    case '刷新':
                        operationList.push(<button key={key} onClick={this.refresh.bind(this)}
                        className='btn btn-primary btn-operation'>{key}</button>);
                        break;
                    case '分享':
                        operationList.push(<button key={key} onClick={this.open.bind(this)}
                        className='btn btn-primary btn-operation'>{key}</button>);
                        break;
                    case '全显':
                        operationList.push(<button key={key} onClick={this.allShow.bind(this)}
                        className='btn btn-primary btn-operation'>{key}</button>);
                        break;
                    case '全隐':
                        operationList.push(<button key={key} onClick={this.allHide.bind(this)}
                        className='btn btn-primary btn-operation'>{key}</button>);
                        break;
                    default:
                        break;
                }
            }
        }
        return operationList;
    }

    /**
     * 生成WidgetBody
     * @return {Object} WidgetBody内容
     */
    generateBody() {
        let that = this;
        let bodyType = this.props.bodyConf.bodyType;
        let chartConfig = this.props.bodyConf.bodyContent;
        let bodyId = this.props.bodyConf.bodyId;
        switch (bodyType) {
            case 'text':
                return <div>{chartConfig}</div>;
            case 'chart':
                return (<div>{that.generateOperation()}
                        <ReactHighcharts config={chartConfig}
                        ref={'widgetBody_chart_' + bodyId}/></div>);
            case 'stock':
                return (<div>{that.generateOperation()}
                        <ReactHighstock config={chartConfig}
                        ref={'widgetBody_stock_' + bodyId}/></div>);
            case 'business':
                return (<Business width={this.props.width}/>);
            default:
                return null;
        }
    }

    /**
     * 生成虚线
     * @return {Object} 虚线内容
     */
    generateLine() {
        let line = this.props.line;
        if (line) {
            return <div className={'dotline'}></div>;
        }
    }
    render() {
        return (<Col xs = {this.props.xs} md = {this.props.md}>
        {this.generateBody()}
        <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
            <Modal.Header closeButton>
                <Modal.Title>分享链接</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{this.props.bodyConf.shareUrl}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={this.close.bind(this)}>Close</Button>
            </Modal.Footer>
        </Modal>
        {this.generateLine()}
        </Col>);
    }
}
module.exports = WidgetBody;
