/**@file WidgetBody组件
 * @author renxintao@baidu.com
 * @date 2016-06-22
 */
import {Modal, ModalHeader, ModalBody, ModerFooter, Button} from 'react-bootstrap';
const React = require('react');
const ReactDOM = require('react-dom');
require('!style!css!sass!../sass/app/_widgetBody.scss');
const ReactHighcharts = require('react-highcharts/dist/ReactHighcharts.src');
const ReactHighstock = require('react-highcharts/dist/ReactHighstock.src');
const exporting = require('highcharts/modules/exporting');
exporting(ReactHighcharts.Highcharts);
exporting(ReactHighstock.Highcharts);
class WidgetBody extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        };
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
        let bodyType = this.props.widgetConf.bodyConf.widgetType;
        let id = this.props.widgetConf.id;
        switch (bodyType) {
            case 'chart':
                this.refs['widgetBody_chart_' + id].refreshed();
                break;
            case 'stock':
                this.refs['widgetBody_stock_' + id].refreshed();
                break;
            default:
                break;
        }
    }

    /**
     * 全显操作触发函数
     */
    allShow() {
        let bodyType = this.props.widgetConf.bodyConf.widgetType;
        let id = this.props.widgetConf.id;
        switch (bodyType) {
            case 'chart':
                let getCharts = this.refs['widgetBody_chart_' + id].getChart();
                let chartSeries = getCharts.series;
                for (let serie in chartSeries) {
                    if (chartSeries.hasOwnProperty(serie)) {
                        chartSeries[serie].show();
                    }
                }
                break;
            case 'stock':
                let getStock = this.refs['widgetBody_stock_' + id].getChart();
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
        let bodyType = this.props.widgetConf.bodyConf.widgetType;
        let id = this.props.widgetConf.id;
        switch (bodyType) {
            case 'chart':
                let getCharts = this.refs['widgetBody_chart_' + id].getChart();
                let chartSeries = getCharts.series;
                for (let serie in chartSeries) {
                    if (chartSeries.hasOwnProperty(serie)) {
                        chartSeries[serie].hide();
                    }
                }
                break;
            case 'stock':
                let getStock = this.refs['widgetBody_stock_' + id].getChart();
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
        let operation = this.props.widgetConf.bodyConf.operation;
        for (let key in operation) {
            if (operation.hasOwnProperty(key) && operation[key]) {
                switch (key) {
                    case '刷新':
                        operationList.push(<button key={key} onClick={this.refresh.bind(this)}
                        className='btn btn-primary btn-operation'>{key}</button>);
                    case '分享':
                        operationList.push(<button key={key} onClick={this.open.bind(this)}
                        className='btn btn-primary btn-operation'>{key}</button>);
                    case '全显':
                        operationList.push(<button key={key} onClick={this.allShow.bind(this)}
                        className='btn btn-primary btn-operation'>{key}</button>);
                    case '全隐':
                        operationList.push(<button key={key} onClick={this.allHide.bind(this)}
                        className='btn btn-primary btn-operation'>{key}</button>);
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
        let bodyType = this.props.widgetConf.bodyConf.widgetType;
        let chartConfig = this.props.widgetConf.bodyConf.widgetContent;
        let id = this.props.widgetConf.id;
        let widgetBodyId = 'widgetBody_' + id;
        switch (bodyType) {
            case 'text':
                let widgetBody = this.props.widgetConf.bodyConf.widgetContent;
                return widgetBody;
            case 'chart':
                console.log(that);
                return (<div>{that.generateOperation()}
                        <ReactHighcharts config={chartConfig}
                        ref={'widgetBody_chart_' + this.props.widgetConf.id}/></div>);
            case 'stock':
                return (<div>{that.generateOperation()}
                        <ReactHighstock config={chartConfig}
                        ref={'widgetBody_stock_' + this.props.widgetConf.id}/></div>);
            default:
                return null;
        }
    }
    render() {
        return (
        <div ref='chart' className="panel-body" id={'widgetBody_' + this.props.widgetConf.id}
        ref={'widgetBody_' + this.props.widgetConf.id} onClick={this.handleClick}>
        {this.generateBody()}
        <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
            <Modal.Header closeButton>
                <Modal.Title>分享链接</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{this.props.widgetConf.bodyConf.shareUrl}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={this.close.bind(this)}>Close</Button>
            </Modal.Footer>
        </Modal>
        </div>);
    }
}

module.exports = WidgetBody;

