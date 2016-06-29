/**@file WidgetHead组件
 * @author renxintao@baidu.com
 * @date 2016-06-22
 */
const React = require('react');
const ReactDOM = require('react-dom');
require('!style!css!sass!../sass/app/_widgetHead.scss');
class WidgetHead extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshed: this.props.initialRefreshed,
            view: this.props.widgetConf.headConf.operationConf['expand']
        };
    }

    componentDidMount() {
        this.onRefreshed();
    }

    /**
     * 刷新操作触发函数,执行Widget刷新操作回调函数
     */
    onRefreshed() {
        let newState = !this.state.refreshed;
        this.setState({
            refreshed: newState
        });
        this.props.callbackRefreshed(newState);
    }

    /**
     * 放大操作触发函数，执行Widget放大操作回调函数
     */
    onExpanded() {
        if (this.state.view === 'fa fa-expand') {
            this.setState({
                view: 'fa fa-compress'
            });
            this.props.callbackViewed();
            this.onRefreshed();
        }
        else {
            this.setState({
                view: 'fa fa-expand'
            });
            this.props.callbackViewed();
            this.onRefreshed();
        }
    }

    /**
     * 编辑操作触发函数，执行Widget编辑操作回调函数
     */
    onEdited() {
        let editWidget = this.props.widgetConf;
        this.props.callbackEdited(editWidget);
    }

    /**
     * 删除操作触发函数，执行Widget删除操作回调函数
     */
    onDeleted() {
        let deleteWidget = this.props.widgetConf;
        // 要在这里发一个ajax，请求后台操作，操作成功后，执行下行
        this.props.callbackDeleted(deleteWidget);
    }

    /**
     * WidgerHead生成函数，每一个操作绑定相应函数
     * 包括刷新、放大、编辑、删除操作
     * @return {Object} 返回WidgetHead样式
     */
    generateHead() {
        let headName = this.props.widgetConf.headConf.widgetName;
        let operationData = this.props.widgetConf.headConf.operationConf;
        let operationList = [];
        for (let key in operationData) {
            if (operationData.hasOwnProperty(key)) {
                if (key === 'refresh') {
                    operationList.unshift(<li key={key} className="widget-operation">
                            <i className={operationData[key]}
                            onClick={this.onRefreshed.bind(this)}></i></li>);
                }
                if (key === 'expand') {
                    operationList.unshift(<li key={key} className="widget-operation">
                            <i className={this.state.view} ref="expandOrCompress"
                            onClick={this.onExpanded.bind(this)}></i></li>);
                }
                if (key === 'edit') {
                    operationList.unshift(<li key={key} className="widget-operation">
                            <i className={operationData[key]}
                            onClick={this.onEdited.bind(this)}></i></li>);
                }
                if (key === 'delete') {
                    operationList.unshift(<li key={key} className="widget-operation">
                            <i className={operationData[key]} onClick={this.onDeleted.bind(this)}></i></li>);
                }
            }
        }
        let head = <div className="panel-heading widget-head" id={'widgethead_' + this.props.widgetConf.id}
        ref={'widgethead_' + this.props.widgetConf.id}><div>{headName}</div>
            <div><ul>{operationList}</ul></div></div>;
        return head;
    }
    render() {
        let head = this.generateHead();
        return head;
    }
}
module.exports = WidgetHead;
