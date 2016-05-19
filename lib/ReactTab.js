/**
 * @file 配置页面导航的两个工具展示
 * @author luyongfang@baidu.com
 * @props
 *     tabMap: ['tab1-name','tab2name','tab3name'] // 如果为动态ajax获取的tab，则为tab的名字，即展示的
 *     tabcMap: ['tab1-con', 'tab2-con','tab3-con']  // 随意定义
 *     tabData: res.data, //全部tab的基础数据,例如ajax请求回来的多个tab的数据
 *     caseId: self.props.caseId // 其他任何的参数，可以多个
 * */
var React = require('react');
var ReactDOM = require('react-dom');
// var FormComponent = require('../FormComponent.js');
import {Row, Col} from 'react-bootstrap';
var ReactTab = React.createClass({
        getInitialState: function () {
            return {
                currentTab: 0
            };
        },
        componentDidMount: function () {
            // 第一次加载时如果第一个Tab有处理其他的事情，在这里调用父组件的函数, 0-第1个Tab, 第二个是向父组件传递当前tab的数据
            this.props.handleTabClick && this.props.handleTabChangeClick(0, this.props.tabData[0]);
        },
        handleTabClick: function (event) {
            event.preventDefault();
            var target = $(event.target);
            var tmp = target.attr('href').split('-')[3];
            var tabId = tmp.length > 2 ? tmp.slice(0, tmp.length - 1) : tmp[0];
            var tabId = parseInt(tabId, 0);
            target.parent('ul').find('li').removeClass('am-active');
            // 切换Tab时调用父组件的处理函数进行处理
            this.props.handleTabChangeClick && this.props.handleTabChangeClick(tabId, this.props.tabData[tabId]);
            this.setState({currentTab: tabId});
        },
        tabGenerator: function () {
            var liList = [];
            var self = this;
            $.each(this.props.tabMap, function (k, v) {
                var className = (k * 1 === self.state.currentTab) ? 'am-active' : '';
                var href = '[data-tab-panel-' + k + ']';
                liList.push(<li className={className} key={'tab' + v}><a href={href}>{v}</a></li>);
            });
            return liList;
        },
        componentWillReceiveProps: function () {

        },
        tabcGenerator: function () {
            // formComponent不能放在这里，因为有的不需要渲染
            /*如果渲染的组件都相同，只是参数不同，可以将下面的FormComponent替换为自己想替换的
                    k === self.state.currentTab && <FormComponent ref="formComponent" {...props}/>*/
            var divList = [];
            var self = this;
            // this.props 父组件传递过来的
            var props = $.extend(true, {}, this.props, {tabId: self.state.currentTab});
            // props['tabData']: 当前的tab数据
            props['tabData'] = props['tabData'] && props['tabData'][self.state.currentTab];
            $.each(this.props.tabcMap, function (k, v) {
                var className = (k * 1 === self.state.currentTab) ? 'am-active' : '';
                className += ' am-tab-panel';
                var attr = 'data-tab-panel-' + k;
                // 如果有复杂的逻辑展示-请修改这里的代码,这里有一个缺点是如何通过map去获取渲染哪个组件
                divList.push(<div attr data-key={attr} className={className} key={v}>
                    // 可以在tab-click的时候,ReactDOM.render的方法进行渲染到改div中
                    <div id={v}>{'tab' + k}</div>
                    </div>);
            });
            return divList;
        },
        render: function () {
            return (<div className="reactTab">
                <div className="am-tabs" data-am-tabs onClick={this.handleTabClick}>
                    <ul className="am-tabs-nav am-nav am-nav-tabs">
                        {this.tabGenerator()}
                    </ul>
                </div>
               <div className="am-tabs-bd">
                    {this.tabcGenerator()}
               </div>
           </div>);
        }
    });

module.exports = ReactTab;
