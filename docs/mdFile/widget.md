### 功能
    通过配置可以自定义Widget组件的标题内容，标题的刷新、放大、编辑、删除等操作，自定义Widget显示内容
### 配置参数: 即props
    id: 必须，唯一标识该Widget
    headConf: 必须，配置WidgetHead
        widgetName: 必须，配置Widget名称
        operationConf: 必须，配置Widget操作按钮，刷新、放大、编辑、删除操作可配置；
    bodyConf: 必须，配置WidgetBody
        bodyId: 必须，配置Widget存放实体id
        bodyType: 必须，配置Widget存放实体类型，有'text'、'chart'、'stock'三种类型
        bodyContent: 必须，配置Widget存放实体内容，实体类型为'text',直接填写内容;实体类型为'chart'或'stock'时，存放图表配置
        shareUrl: 'chart'或'stock'类型必须，配置图表分享路径
        operation: 'chart'或'stock'类型必须，配置图表操作，包括刷新、分享操作
### 源代码

```
import React from 'react';
import ReactDOM from 'react-dom';
import Widget from 'umpui-react';
// 文本类型配置
let widgetsData = {
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
        bodyConf: [{
            bodyId: 'bodyConf1_1',
            bodyType: 'text',
            bodyContent: '12345'
        }, {
            bodyId: 'bodyConf1_2',
            bodyType: 'text',
            bodyContent: '23456'
        }]
    }
// chart类型配置
let widgetData = {
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
        bodyConf: [{
            bodyId: 'bodyConf6_1',
            bodyType: 'chart',
            bodyContent: {
                xAxis: {
                    categories: ['Jan', 'Fed', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle',
                    borderWidth: 0
                },
                plotOptions: {
                    series: {
                        point: {
                            events: {
                                mouseOver() {
                                    EventSystem.evoke('toolbodyConf6_1', this.x, 'execute');
                                    EventSystem.evoke('toolbodyConf6_2', this.x, 'execute');
                                    EventSystem.evoke('toolbodyConf6_3', this.x, 'execute');
                                }
                            }
                        }
                    }
                },
                tooltip: {
                    shared: true,
                    crosshairs: {
                        width: 1,
                        color: 'gray',
                        dashStyle: 'Solid'
                    }
                },
                series: [{
                        name: 'Tokyo',
                        data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
                    }, {
                        name: 'New York',
                        data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
                    }, {
                        name: 'Berlin',
                        data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
                    }, {
                        name: 'London',
                        data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
                    }]
            },
            shareUrl: 'www.abc.com',
            operation: {
                '刷新': true,
                '分享': true
            }
        }]
    }
// stock类型配置
let widgetData = {
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
        bodyConf: [{
            bodyId: 'bodyConf7_1',
            bodyType: 'stock',
            bodyContent: {
                rangeSelector: {
                    selected: 1
                },
                title: {
                    text: 'AAPL Stock Price'
                },
                legend: {
                    enabled: true,
                    align: 'right',
                    backgroundColor: '#FCFFC5',
                    borderColor: 'black',
                    borderWidth: 2,
                    layout: 'vertical',
                    verticalAlign: 'top',
                    y: 100,
                    shadow: true
                },
                plotOptions: {
                    series: {
                        point: {
                            events: {
                                mouseOver() {
                                    EventSystem.evoke('toolbodyConf7_1', this.x, 'execute');
                                    EventSystem.evoke('toolbodyConf7_2', this.x, 'execute');
                                    EventSystem.evoke('toolbodyConf7_3', this.x, 'execute');
                                }
                            }
                        }
                    }
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
                        [1229299200000, 13.54]
                        ],
                    tooltip: {
                        valueDecimals: 2
                    }
               }]
            }
        }]
    }
    /**
     * 编辑操作回调函数
     * 此函数返回要编辑的Widget的配置，供表单组件使用
     * @param {Array<object>} editWidget
     *     要编辑的Widget的配置
     */
    onShowEditWidget(editWidget) {
        console.log(editWidget);
        // 在这里触发表单填充数据
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
<Widget objWidgetConf={widgetData} onShowEditWidget={this.onShowEditWidget} onDeleteWidget={this.onDeleteWidget}/>;
```
