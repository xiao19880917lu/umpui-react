/**
 * @file 配置页面导航的两个工具展示
 * @author luyongfang@baidu.com
 * @props
 *     tabMap: ['tab1-name','tab2name','tab3name'] // 如果为动态ajax获取的tab，则为tab的名字，即展示的
 *     tabcMap: ['tab1-con', 'tab2-con','tab3-con']  // 随意定义
 *     tabData: res.data, //全部tab的基础数据,例如ajax请求回来的多个tab的数据
 *     caseId: self.props.caseId // 其他任何的参数，可以多个
 *     isCusOperation: true // 是否有自定义操作
 * */
import React from 'react';
import ReactDOM from 'react-dom';
require('!style!css!sass!../sass/app/_tab.scss');
export default class ReactTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTab: this.props.activeId ? this.props.activeId : 0
        };
    }
    componentDidMount() {
        // 第一次加载时如果第一个Tab有处理其他的事情，在这里调用父组件的函数, 0-第1个Tab, 第二个是向父组件传递当前tab的数据
        this.props.handleTabClick && this.props.handleTabChangeClick(0, this.props.tabData[0]);
    }
    handleTabClick(tabId, event) {
        event.preventDefault();
        event.stopPropagation();
        // 切换Tab时调用父组件的处理函数进行处理
        this.props.handleTabChangeClick && this.props.handleTabChangeClick(tabId, this.props.tabData[tabId]);
        this.setState({currentTab: tabId});
    }
    handleOperation(event) {
        event.stopPropagation();
        this.props.handleOperation && this.props.handleOperation(this.state.currentTab
                , this.props.tabMap, this.props.tabcMap);
    }
    tabGenerator() {
        let liList = [];
        let self = this;
        this.props.tabMap.forEach(function (v, k) {
            let className = (k * 1 === self.state.currentTab) ? 'am-active' : '';
            let href = '[data-tab-panel-' + k + ']';
            let iStyle = self.props.iconList && self.props.iconList[k] ? {'margin-right': '10px'} : {};
            liList.push(<li className={className} key={'tab' + v} onClick={self.handleTabClick.bind(self, k)}>
                <a href={href}><i className={self.props.iconList[k]} style={iStyle}></i>{v}</a></li>);
        });
        if (this.props.isCusOperation) {
            let strClass = this.props.className || 'fa fa-cogs';
            liList.push(<li key="taboperation" className="umpui-tab-operation"
                onClick={self.handleOperation.bind(self)}><i className={strClass}></i></li>);
        }
        return liList;
    }
    tabcGenerator() {
        // formComponent不能放在这里，因为有的不需要渲染
        /*如果渲染的组件都相同，只是参数不同，可以将下面的FormComponent替换为自己想替换的
                k === self.state.currentTab && <FormComponent ref="formComponent" {...props}/>*/
        let divList = [];
        let self = this;
        // this.props 父组件传递过来的
        let props = Object.assign(true, {}, this.props, {tabId: self.state.currentTab});
        // props['tabData']: 当前的tab数据
        props['tabData'] = props['tabData'] && props['tabData'][self.state.currentTab];
        if (this.props.tabcGenerator) {
            divList = this.props.tabcGenerator(this.props.tabMap, this.props.tabcMap, self.state.currentTab);
        } else {
            // 默认提供
            this.props.tabcMap.forEach(function (v, k) {
                let className = (k * 1 === self.state.currentTab) ? 'am-active' : '';
                className += ' am-tab-panel';
                let attr = 'data-tab-panel-' + k;
                // 如果有复杂的逻辑展示-请修改这里的代码,这里有一个缺点是如何通过map去获取渲染哪个组件
                divList.push(<div attr data-key={attr} className={className} key={v}>
                    <div id={v}>{'tab' + k}</div>
                    </div>);
            });
        }
        return divList;
    }
    render() {
        return (<div className="umpui-tab">
            <div className="am-tabs" data-am-tabs>
                <ul className="am-tabs-nav am-nav am-nav-tabs">
                    {this.tabGenerator()}
                </ul>
            </div>
           <div className="am-tabs-bd">
                    {this.tabcGenerator()}
           </div>
       </div>);
    }
}
