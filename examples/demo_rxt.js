/**
 * @file Widget组件调用
 * @author renxintao@baidu.com
 * @date 2016-06-22
 */
import React from 'react';
import ReactDOM from 'react-dom';
import Widget from '../lib/Widget';
import {Panel, Row, Col, Input} from 'react-bootstrap';
let widgetsData = [{
        id: 'objWidgetConf1',
        headConf: {
            widgetName: 'Flow Viewi1',
            operationConf: {
                'refresh': 'fa fa-refresh',
                'expand': 'fa fa-expand',
                'edit': 'fa fa-pencil-square-o',
                'delete': 'fa fa-trash'
            }
        },
        bodyConf: {
            widgetType: 'text',
            widgetContent: '12345'
        }
    },
    {
        id: 'objWidgetConf2',
        headConf: {
            widgetName: 'Flow View2',
            operationConf: {
                'refresh': 'fa fa-refresh',
                'expand': 'fa fa-expand',
                'edit': 'fa fa-pencil-square-o',
                'delete': 'fa fa-trash'
            }
        },
        bodyConf: {
            widgetType: 'text',
            widgetContent: '56789'
        }
    },
    {
        id: 'objWidgetConf6',
        headConf: {
            widgetName: 'Chart View1',
            operationConf: {
                'refresh': 'fa fa-refresh',
                'expand': 'fa fa-expand',
                'edit': 'fa fa-pencil-square-o',
                'delete': 'fa fa-trash'
            }
        },
        bodyConf: {
            widgetType: 'chart',
            widgetContent: {
                xAxis: {
                    categories: ['Jan', 'Fed', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                },
                series: [{
                    data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 295.6, 454.4, 350.2]
                }]
            },
            shareUrl: 'www.abc.com',
            operation: {
                '刷新': true,
                '分享': true
            }
        }
    },
    {
        id: 'objWidgetConf7',
        headConf: {
            widgetName: 'Stock View1',
            operationConf: {
                'refresh': 'fa fa-refresh',
                'expand': 'fa fa-expand',
                'edit': 'fa fa-pencil-square-o',
                'delete': 'fa fa-trash'
            }
        },
        bodyConf: {
            widgetType: 'stock',
            widgetContent: {
                rangeSelector: {
                    selected: 1
                },
                title: {
                    text: 'AAPL Stock Price'
                },
                series: [{
                    name: 'AAPL',
                    data: [
                        [1220832000000, 22.56], [1220918400000, 21.67], [1221004800000, 21.66],
                        [1221091200000, 21.81], [1221177600000, 21.28], [1221436800000, 20.05],
                        [1221523200000, 19.98], [1221609600000, 18.26], [1221696000000, 19.16],
                        [1221782400000, 20.13], [1222041600000, 18.72], [1222128000000, 18.12],
                        [1222214400000, 18.39], [1222300800000, 18.85], [1222387200000, 18.32],
                        [1222646400000, 15.04], [1222732800000, 16.24], [1222819200000, 15.59],
                        [1222905600000, 14.3], [1222992000000, 13.87], [1223251200000, 14.02],
                        [1223337600000, 12.74], [1223424000000, 12.83], [1223510400000, 12.68],
                        [1223596800000, 13.8], [1223856000000, 15.75], [1223942400000, 14.87],
                        [1224028800000, 13.99], [1224115200000, 14.56], [1224201600000, 13.91],
                        [1224460800000, 14.06], [1224547200000, 13.07], [1224633600000, 13.84],
                        [1224720000000, 14.03], [1224806400000, 13.77], [1225065600000, 13.16],
                        [1225152000000, 14.27], [1225238400000, 14.94], [1225324800000, 15.86],
                        [1225411200000, 15.37], [1225670400000, 15.28], [1225756800000, 15.86],
                        [1225843200000, 14.76], [1225929600000, 14.16], [1226016000000, 14.03],
                        [1226275200000, 13.7], [1226361600000, 13.54], [1226448000000, 12.87],
                        [1226534400000, 13.78], [1226620800000, 12.89], [1226880000000, 12.59],
                        [1226966400000, 12.84], [1227052800000, 12.33], [1227139200000, 11.5],
                        [1227225600000, 11.8], [1227484800000, 13.28], [1227571200000, 12.97],
                        [1227657600000, 13.57], [1227830400000, 13.24], [1228089600000, 12.7],
                        [1228176000000, 13.21], [1228262400000, 13.7], [1228348800000, 13.06],
                        [1228435200000, 13.43], [1228694400000, 14.25], [1228780800000, 14.29],
                        [1228867200000, 14.03], [1228953600000, 13.57], [1229040000000, 14.04],
                        [1229299200000, 13.54]],
                    tooltip: {
                        valueDecimals: 2
                    }
                }]
            },
            shareUrl: 'www.123.com',
            operation: {
                '刷新': true,
                '分享': true
            }
        }
    }];
let newWidget = [{
    id: 'objWidgetConf4',
    headConf: {
        widgetName: 'Flow View4',
        operationConf: {
            'refresh': 'fa fa-refresh',
            'expand': 'fa fa-expand',
            'edit': 'fa fa-pencil-square-o',
            'delete': 'fa fa-trash'
        }
    },
    bodyConf: {
        widgetType: 'text',
        widgetContent: 'fghij'
    }
}];
let editWidget = [{
    id: 'objWidgetConf4',
    headConf: {
        widgetName: 'Flow View10',
        operationConf: {
            'refresh': 'fa fa-refresh',
            'expand': 'fa fa-expand',
            'edit': 'fa fa-pencil-square-o',
            'delete': 'fa fa-trash'
        }
    },
    bodyConf: {
        widgetType: 'text',
        widgetContent: 'zxcvbbnb'
    }
}];
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            widgetsData: this.props.widgetsData
        };
    }

    /**
     * 表单组件点击添加操作回调函数
     * 此函数添加新的Widget组件并刷新状态
     * @param {Array<Object>} newWidget
     * 要添加的Widget的配置
     */
    onAddWidget() {
        let newWidget = this.props.newWidget;
        let widgets = this.state.widgetsData;
        widgets.push(newWidget[0]);
        this.setState({
            widgetsData: widgets
        });
    }

    /**
     * 编辑操作回调函数
     * 此函数返回要编辑的Widget的配置，供表单组件使用
     * @param {Array<Object>} editWidget
     * 要编辑的Widget的配置
     */
    onEditWidget() {
        let editWidget = this.props.editWidget;
        console.log(editWidget);
        let widgets = this.state.widgetsData;
        for (let i in widgets) {
            if (widgets[i].id === editWidget[0].id) {
                widgets[i] = editWidget[0];
            }
        }
        this.setState({
            widgetsData: widgets
        });
    }

    /**
     * 删除操作回调函数
     * 此函数删除WidgetHead传来的需要删除的Widget组件配置
     * @param {Array<Object>} deleteWidget
     * 要删除的Widget配置
     */
    onDeleteWidget(deleteWidget) {
        let widgets = this.state.widgetsData;
        for (let i in widgets) {
            if (widgets[i].id === deleteWidget.id) {
                widgets.splice(i, 1);
            }
        }
        this.setState({
            widgetsData: widgets
        });
    }
    generateWidget() {
        let widgets = this.props.widgetsData;
        let widgetList = [];
        for (let widget in widgets) {
            widgetList.push(<Widget objWidgetConf={widgets[widget]} onShowEditWidget={this.onShowEditWidget}
                    onDeleteWidget={this.onDeleteWidget.bind(this)} />);
        }
        return widgetList;
    }
    render() {
        return  <Row clasName ="show-grid">
        <p>Widget组件</p>
        {this.generateWidget()}
        <button onClick={this.onAddWidget.bind(this)}>onAddWidget</button>
        <button onClick= {this.onEditWidget.bind(this)}>onEditWidget</button>
        </Row>;
    }
}

ReactDOM.render(
        <App widgetsData={widgetsData} newWidget={newWidget} editWidget={editWidget}/>,
        document.getElementById('container'));
