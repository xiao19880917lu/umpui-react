/**
 * @file Widget使用说明
 * **/
import React from 'react';
import ReactDOM from 'react-dom';
import marked from 'marked';
import Widget from '../../lib/Widget.js';
import MarkdownElement from '../../lib/MarkdownElement.js';
import PageData from '../mockData/PageData.js';
export default class WidgetApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            widgetsData: PageData.widget
        };
    }

    /**
     * 表单组件点击添加操作回调函数
     * 此函数添加新的Widget组件并刷新状态
     * @param {Array<Object>} newWidget
     * 要添加的Widget的配置
     */
    onAddWidget() {
        let newWidget = PageData.newWidget;
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
     *     要编辑的Widget的配置
     */
    onShowEditWidget(editWidget) {
        console.log(editWidget);
        // 在这里触发表单填充数据
    }

    /**
     * 表单点击编辑操作回调函数
     * 此函数返回要编辑的Widget的配置，供表单组件使用
     * @param {Array<Object>} editWidget
     * 要编辑的Widget的配置
     */
    onEditWidget() {
        let editWidget = PageData.editWidget;
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
        let widgets = PageData.widget;
        let widgetList = [];
        for (let widget in widgets) {
            if (widgets.hasOwnProperty(widget)) {
                widgetList.push(<Widget objWidgetConf={widgets[widget]} onShowEditWidget={this.onShowEditWidget}
                    onDeleteWidget={this.onDeleteWidget.bind(this)} ref={'widget_' + widgets[widget].id}/>);
            }
        }
        return widgetList;
    }

    render() {
        const mdText = require('text!../mdFile/widget.md');
        return (<div className="umpui-component">
            <h3 className="umpui-layer umpui-title">Widget组件</h3>
            {this.generateWidget()}
            <div className="umpui-block">
                <span className="btn btn-info"
                    onClick={this.onAddWidget.bind(this)}>添加Widget</span>
                <span className="btn btn-info"
                    onClick={this.onEditWidget.bind(this)}>编辑Widget</span>
            </div>
            <div className="umpui-layer umpui-block">
                <MarkdownElement text={mdText}/>
            </div>
        </div>);
    }

}
