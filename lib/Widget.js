/**
 * @file Widget组件
 * @author renxintao@baidu.com
 * @date 2016-06-22
 */
import {Row, Col} from 'react-bootstrap';
const React = require('react');
const ReactDOM = require('react-dom');
// require('!style!css!sass!../sass/app/_widgetWidget.scss');
const WidgetHead = require('./WidgetHead');
const WidgetBody = require('./WidgetBody');
class Widget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshed: false,
            xs: 6,
            md: 6,
            viewClass: 'panel panel-default panel-width'
        };
    }

    /**
     * 刷新操作Widget回调函数
     * @param {boolean} newState 刷新操作时newState
     *     状态变化true/false
     */
    onHeadRefreshed(newState) {
        this.setState({
            refreshed: newState
        });
    }

    /**
     * 放大还原操作Widget回调函数
     */
    onHeadViewed() {
        this.setState({
            viewClass: this.state.viewClass === 'panel panel-default panel-width'
            ? 'panel panel-default panel-width widgetExpandView' : 'panel panel-default panel-width'
        });
    }

    /**
     * 编辑操作Widget回调函数
     * @param {Object} editWidget
     * 要编辑的Widget相关配置
     */
    onHeadEdited(editWidget) {
        this.props.onShowEditWidget(editWidget);
    }

    /**
     * 删除操作Widget回调函数
     * @param {Object} deleteWidget
     * 要删除的Widget相关配置
     */

    onHeadDeleted(deleteWidget) {
        this.props.onDeleteWidget(deleteWidget);
    }
    generateWidgetBody() {
        let bodyConfs = this.props.objWidgetConf.bodyConf;
        let widgetBodyList = [];
        if (bodyConfs.length === 1) {
            widgetBodyList.push(<WidgetBody bodyConf={bodyConfs[0]} xs={12} md={12}/>);
        }
        else if (bodyConfs.length > 1) {
            for (let bodyConf in bodyConfs) {
                if (bodyConfs.hasOwnProperty(bodyConf)) {
                    widgetBodyList.push(<WidgetBody bodyConf={bodyConfs[bodyConf]} xs={6} md={6}/>);
                }
            }
        }
        return <div ref='chart' className="panel-body" id={'widgetBody_' + this.props.objWidgetConf.id}
        key={'widgetBody_' + this.props.objWidgetConf.id} ref={'widgetBody_' + this.props.objWidgetConf.id}>
            <Row className = 'show-grid'>{widgetBodyList}</Row></div>;
    }
    render() {
        return (
            <Col xs={this.state.xs} md={this.state.md}>
            <div className={this.state.viewClass} id={'widget_' + this.props.objWidgetConf.id}
            ref={'widget_' + this.props.objWidgetConf.id}>
            <WidgetHead widgetConf={this.props.objWidgetConf}
            initialRefreshed={this.state.refreshed}
            callbackRefreshed={this.onHeadRefreshed.bind(this)}
            callbackViewed={this.onHeadViewed.bind(this)}
            callbackEdited={this.onHeadEdited.bind(this)}
            callbackDeleted={this.onHeadDeleted.bind(this)}/>
            {this.generateWidgetBody()}
            </div>
            </Col>
           );
    }
}

module.exports = Widget;

