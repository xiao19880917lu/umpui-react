/**
 * @file 菜单栏组件
 * @author wujie08@baidu.com
 * @date 2016-04-27
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {NavDropdown, Nav, NavItem, MenuItem, Dropdown} from 'react-bootstrap';
require('../sass/app/top-navbar.css');

class Header extends React.Component {
    constructor(props) {
        super(props);
    }
    navItemGenerator() {
        let navData = this.props.navData;
        let navList = [];
        for (let key in navData) {
            if (navData.hasOwnProperty(key)) {
                navList.push(<NavItem key={key} href={navData[key]}>{key}</NavItem>);
            }
        }
        return navList;
    }
    navDropdownGenerator() {
        let menuData = this.props.menuData;
        let menuList = [];
        for (let key in menuData) {
            if (this.menuItemGenerator(key) != null) {
                menuList.push(this.menuItemGenerator(key));
            }
        }
        return menuList;
    }
    menuItemGenerator(type) {
        let menuData = this.props.menuData;
        let item;
        let itemList = [];
        // 获取对应组件配置参数
        let arrData = menuData[type].data;
        // 获取对应组件图标及文字
        let icon = menuData[type].icon;
        let name = menuData[type].name;
        const ddAlertTitle = (
            <span>
                <em className={icon}></em>{name}<em className="fa fa-sort-desc"></em>
            </span>
        );
        switch (type) {
            case 'dropdown':
                for (let key in arrData) {
                    if (arrData.hasOwnProperty(key)) {
                        item = arrData[key];
                        itemList.push(<MenuItem className="animated flipInX" href={item} key={item}>
                                {key}</MenuItem>);
                    }
                }
                return (<NavDropdown noCaret key={type} title={ ddAlertTitle } id="basic-nav-dropdown" >
                        {itemList}</NavDropdown>);
            default:
                console.log('无法找到' + type + '类型组件');
                return null;
        }
    }
    operationGenerator() {
        let operationData = this.props.operationData;
        let itemList = [];
        for (let key in operationData) {
            if (operationData.hasOwnProperty(key)) {
                itemList.push(<li key={'list' + key } className='right-operation'><i key={key} className={operationData[key]}></i></li>);
            }
        }
        return itemList;
    }
    render() {
        return (
            <header className="topnavbar-wrapper">
                <nav role="navigation" className="navbar topnavbar">
                    <div className="navbar-header">
                        <a href="#/" className="navbar-brand">
                            <div className="brand-logo">
                                <img src={this.props.icon} alt="App Logo" className="img-responsive" />
                            </div>
                        </a>
                    </div>
                    <div className="nav-wrapper">
                        <ul className="nav navbar-nav">
                            {this.navItemGenerator()}
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            {this.operationGenerator()}
                            {this.navDropdownGenerator()}
                        </ul>
                    </div>
                </nav>
            </header>
        );
    }

}

module.exports = Header;

/**
 * <Header icon='../dist/img/oicon.png' navData={data} menuData={menuData} />
 * icon: 菜单栏左侧平台Icon图片地址
 * navData: key-value数组，菜单栏选项数据，key为显示的选项名，value为选项跳转url地址, 格式如下：
 *      let data = {
 *          '仪表盘': '?r=newdashboard',
 *          '运维': '?r=op/task',
 *          '监控': '?r=op/alert',
 *      };
 *
 * menuData：菜单栏右侧组件，目前已提供下拉列表组件，dropdown表示组件类型为下拉表，icon为下拉表图标，data为下拉表中选项，格式如下：
 *      let menuData = {
 *          'dropdown': {
 *              'icon': 'icon-user',
 *              'data': {
 *                  '设置': '?r=op/setting',
 *                  '退出': '?r=op/quit',
 *              },
 *          },
 *      };
 */
