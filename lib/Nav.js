/**
 * @file 导航组件
 * @desc 适用于一级或二级导航
 * @author luyongfang@baidu.com
 * */

import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';
require('!style!css!sass!../sass/app/_navigation.scss');
export default class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openDropdown: 0,
            parentActive: 0,
            childActive: 0,
            iconList: false
        };
    }
    handleClick(parentItem, index, event) {
        let bHasChild = parentItem.children ? true : false;
        if (bHasChild) {
            // 如果触发的是有children主节点
            let bIsDown = (this.state.parentActive === index && this.state.openDropdown === index)
                ? -1 : index;
            this.setState({
                openDropdown: bIsDown,
                parentActive: index,
                childActive: bIsDown ? -1 : 0
            });
        } else {
            // 没有children的主节点
            this.setState({
                openDropdown: -1,
                childActive: -1,
                parentActive: index
            });
        }
    }
    subNavClick(parentItem, parentDex, child, childDex, event) {
        event.stopPropagation();
        this.setState({
            childActive: childDex
        });
    }
    render() {
        let self = this;
        let items = self.props.navConfig.map(function (item, index) {
            let children;
            let dropdown;
            if (item.children && !self.props.isCusChildren) {
                children = item.children.map(function (child, childDex) {
                    let iconClass = self.props.iconList ? child.frontIcon + ' subbig' : child.frontIcon;
                    let text = self.props.iconList ? '' : child.text;
                    let liClaName = self.state.childActive * 1 === childDex
                        ? 'sub_nav_down_item sub_nav_item_active' : 'sub_nav_down_item';
                    let params = {
                        parentDex: index,
                        childDex: childDex
                    };
                    let toLink = item.link + '/' + childDex;
                    let levelTwoStyle = self.props.levelTwoStyle || {};
                    let faStyle = self.props.faStyle || {};
                    return (
                        <li key={'child' + childDex} className={liClaName}
                            onClick={self.subNavClick.bind(self, item, index, child, childDex)}>
                              <Link to={toLink} params={params} style={levelTwoStyle}>
                              <i className={iconClass} faStyle={faStyle}></i>{text}</Link>
                        </li>
                    );
                });

                let dropdownClass = 'nav_drop_down';
                if (this.state.openDropdown === index) {
                    dropdownClass += ' nav_drop_down_open';
                }

                dropdown = (
                    <ul className={ dropdownClass }>
                        { children }
                    </ul>
                );
            }
            let className = this.state.parentActive * 1 === index ? 'sel ' : '';
            let text = self.props.iconList ? '' : item.text;
            let frontIcon = self.props.iconList ? item.frontIcon + ' big' : item.frontIcon;
            let liClaName = this.state.parentActive * 1 === index ? 'navItem sel ' : 'navItem';
            let levelOneStyle = self.props.levelOneStyle || {};
            let faStyle = self.props.faStyle || {};
            return (
                <li key={'parent' + index} className={liClaName} onClick={self.handleClick.bind(self, item, index)}>
                    <span className={className}>
                        {item.url && <a href={item.url} target="_blank" style={levelOneStyle}>
                            <i className={frontIcon} style={faStyle}></i>{text}</a>}
                        {!item.url && item.link && <Link to={item.link} data-key={index} style={levelOneStyle}>
                        <i className={frontIcon} faStyle={faStyle}></i>{text}</Link>}
                    </span>
                    { dropdown }
                </li>
                );
        }, this);
        // 转换iconList是从父组件传递过来的，也可以和这个组件联系在一起
        let ulClaName = self.props.iconList ? 'umpui-shrink umpui-navigation' : 'umpui-navigation';
        let style = self.props.navStyle || {
            width: this.props.width ? this.props.width + 'px' : '180px',
            background: this.props.background ? this.props.background : '#3a3f51'
        };
        return (
            <ul className={ulClaName} style={style}>
                { items }
            </ul>
        );
    }
}