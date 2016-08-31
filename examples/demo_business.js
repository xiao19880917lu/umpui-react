/**
 * @file Widget组件调用
 * @author renxintao@baidu.com
 * @date 2016-06-22
 */
import React from 'react';
import ReactDOM from 'react-dom';
import Business from '../lib/Business/Business';
import {Panel, Row, Col, Input} from 'react-bootstrap';
import EventSystem from '../lib/EventSystem';
import Widget from '../lib/Widget';
let widgetsData = [
    {
        id: 'objWidgetConf1',
        headConf: {
            widgetName: '业务视图',
            operationConf: {
                'refresh': 'fa fa-refresh',
                'expand': 'fa fa-expand',
                'edit': 'fa fa-pencil-square-o',
                'delete': 'fa fa-trash'
            }
        },
        bodyConf: [{
            bodyId: 'bodyConf1_1',
            bodyType: 'business',
            bodyContent: {
                defaultUrl: '',
                searchUrl: ''
            }
        }]
    }
];
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            widgetsData: this.props.widgetsData,
            width: 0
        };
    }

    /**
     * 编辑操作回调函数
     * 此函数返回要编辑的Widget的配置，供表单组件使用
     * @param {Array<Object>} editWidget
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
    generateWidget() {
        let widgets = this.props.widgetsData;
        let widgetList = [];
        for (let widget in widgets) {
            if (widgets.hasOwnProperty(widget)) {
                if (widgets[widget].bodyConf[0].bodyType === 'business') {
                    widgetList.push(<Widget objWidgetConf={widgets[widget]} onShowEditWidget={this.onShowEditWidget}
                        onDeleteWidget={this.onDeleteWidget.bind(this)} ref={'widget_' + widgets[widget].id}
                        xs={8} md={8}/>);
                } else {
                    widgetList.push(<Widget objWidgetConf={widgets[widget]} onShowEditWidget={this.onShowEditWidget}
                        onDeleteWidget={this.onDeleteWidget.bind(this)} ref={'widget_' + widgets[widget].id}
                        xs={6} md={6}/>);
                }
            }
        }
        return widgetList;
    }
    render() {
        return  <Row className ="show-grid">
        <p>Widget组件</p>
        {this.generateWidget()}
        </Row>;
    }
}
ReactDOM.render(
        <App widgetsData={widgetsData} />,
        document.getElementById('container'));
