/**
 * @file 树状侧边栏组件
 * @author huzaibin@baidu.com
 * @date 2016-05-03
 */
import React from "react";
import { ReactCSSTransitionGroup } from "react/lib/ReactCSSTransitionGroup";
import Immutable from "immutable";
import { Collapse } from 'react-bootstrap';
import { Router, Route, Link, History } from 'react-router';
require('!style!css!sass!../sass/app/_reactSidebar.scss');

var Sidebar = React.createClass({
    getDefaultProps: function() {
        return {
            userBlockCollapse: false
        };
    },

    getInitialState: function() {
        return {
            userBlockCollapse: this.props.userBlockCollapse,
            navData: Immutable.fromJS(this.props.itemsData),
            userInfo: Immutable.fromJS(this.props.userInfo)
        };
    },
    
    /**
     * 打开collapse组件
     */
    handleEntered: function(e) {
        var nodes = $(e).parents('.sub-bar').siblings().find('.collapse').filter('.in');
        var that = this;
        nodes.each(function(){
            that.setState({[$(this).attr('data-value')]: !that.state[$(this).attr('data-value')]});
        });
        var finalNodes = $(e).parents('.sub-bar').siblings().find('.final').filter('.active');
        finalNodes.each(function(){
            $(this).addClass('noactive');
            $(this).removeClass('active');
        });
    },

    /**
     * 处理叶子节点
     */
    handleFinal: function(e) {
        $(e.target).parent().addClass('active');
        $(e.target).parent().removeClass('noactive');
        var nodes = $(e.target).parents('li.sub-bar').siblings().find('.node').filter('.active');
        nodes.each(function(){
           $(this).removeClass('active');
           $(this).addClass('noactive');
        });
        var collapseNodes = $(e.target).parents('.sub-bar').siblings().find('.collapse').filter('.in');
        var that = this;
        collapseNodes.each(function(){
            $(this).removeClass('in');
            that.setState({[$(this).attr('data-value')]: !that.state[$(this).attr('data-value')]});
        });

    },

    /**
     * 鼠标移上去展开子节点
     */
    handleMouseEnter: function() {
        console.log('onMouseEnter');
    },


    componentDidMount: function() {
        if(window.localStorage.getItem('body')) {
            $('body').addClass(window.localStorage.getItem('body'));
        }

        var sidebar = $('.sidebar');
        var subNav = $();
        var tmpThis = this;
        sidebar.on( 'mouseenter', '.nav > li', function() {
            if(tmpThis.isSidebarCollapsed()) {
                subNav.trigger('mouseleave');
                subNav = tmpThis.toggleMenuItem( $(this) );
            }
        });
    },

    /**
     * 切换子元素
     */
    toggleMenuItem: function(listItem) {
        this.removeFloatingNav();
        var title = listItem.children('.title').html();
        var ul = listItem.children('ul');
        if( !ul.length ) return $();
        
        if( listItem.hasClass('open') ) {
            this.toggleTouchItem(listItem);
            return $();
        }
        var aside = $('.aside');
        var asideInner = $('.aside-inner');
        var mar = parseInt( asideInner.css('padding-top'), 0) + parseInt( aside.css('padding-top'), 0);
        var subNav = ul.clone(true).appendTo( aside );
        subNav.children('li').first().before("<li class='sidebar-subnav-header'>" + title  + "</li>");

        this.toggleTouchItem(listItem);
        var itemTop = (listItem.position().top + mar) - $('.sidebar').scrollTop();
        var vwHeight = $(window).height();
        listItem.closest('ul').offset().left, listItem.closest('ul').width();

        subNav
            .addClass('nav-floating')
            .css({
                position: 'absolute',
                top: itemTop,
                bottom: (subNav.outerHeight(true) + itemTop > vwHeight) ? 0 : 'auto',
                'margin-left': '70px'
            });
        subNav.find('ul').addClass('sub-nav-floating');
        subNav.on('mouseleave', function() {
            this.toggleTouchItem(listItem);
            listItem.children('.sidebar-subnav-header').remove();
            subNav.remove();
        }.bind(this));

        return subNav;

    },

    removeFloatingNav: function() {
        $('.sidebar-subnav.nav-floating').remove();
        $('.sidebar li.open').removeClass('open');
    },

    toggleTouchItem: function(element) {
        element.siblings('li').removeClass('open').end().toggleClass('open');
    },

    /**
     * 判断侧边栏是否收缩
     */
    isSidebarCollapsed: function() {
        return $('body').hasClass('aside-collapsed');
    },


    /**
     * 点击事件
     */
    handleClick: function(data, e) {
        if(this.state[data]) {
            $('.aside-collapsed').find("ul[data-value=" + data + "]").removeClass('in');
            $('.aside-collapsed').find("ul[data-value=" + data + "]").siblings('.nav-item').find('.node').removeClass('active');
            $('.aside-collapsed').find("ul[data-value=" + data + "]").siblings('.nav-item').find('.node').addClass('noactive');
        }else{
            $('.aside-collapsed').find("ul[data-value=" + data + "]").siblings('.nav-item').find('.node').removeClass('noactive');
            $('.aside-collapsed').find("ul[data-value=" + data + "]").siblings('.nav-item').find('.node').addClass('active');
            $('.aside-collapsed').find("ul[data-value=" + data + "]").addClass('in');

            var finalNode = $('.aside-collapsed').find("ul[data-value=" + data + "]").parents('li.sub-bar').siblings().find('.final');
            finalNode.each(function(){
                $(this).removeClass('active');
                $(this).addClass('noactive');
            });
        }
        this.setState({[data]: !this.state[data]});
    },

    /**
     * 生成树状图
     */
    generatorSidebar: function(navData, linkPath) {
        var lis = navData.map(function(d, i){
            if(d.get('children')){
                var toLink = d.get('label') + "/" + d.get('id');
                return (<li className="sub-bar" key={i}>
                    <div className="title">{d.get('label')}</div>
                    <div className="nav-item" onClick={this.handleClick.bind(this, d.get('id'))}>
                        <Link to={toLink} title={d.get('label')}>
                            <div className={ this.state[d.get('id')] ? "node active": "node noactive"}>
                                <em className={d.get('icon')}></em>
                                <span data-localize="sidebar.nav.DASHBOARD">{d.get('label')}</span>
                                <div className="pull-left label label-info">{d.get('children').size}</div>
                            </div>
                        </Link>
                    </div>
                    <Collapse data-value={d.get('id')} in={this.state[d.get('id')]} timeout={100} onEntered={this.handleEntered} dimension="width">
                        {this.generatorSidebar(d.get('children'), linkPath)}
                    </Collapse>
                </li>);
            }else{
                var toLink = d.get('label') + "/" + d.get('id');
                return (<li className={ this.state[d.get('id')] ? 'active sub-bar' : ' sub-bar'} key={i}>
                    <div className="title">{d.get('label')}</div>
                    <Link to={toLink} title={d.get('label')}>
                        <div className={ this.state[d.get('id')] ? "node active final" : "node final noactive"} onClick={this.handleFinal} >
                            <em className={d.get('icon')}></em>
                            <span>{d.get('label')}</span>
                        </div>
                    </Link>
                </li>);
            }
        }.bind(this));
        return (
            <ul className="nav">{lis}</ul>
        );
    },

    render: function() {
        var userInfo = this.state.userInfo;
        return (
            <div className="wrapper">
                <aside className='aside'>
                    <div className="aside-inner">
                        <nav data-sidebar-anyclick-close="" className="sidebar">
                            {userInfo == null ? null :
                            <Collapse id="user-block" in={this.state.userBlockCollapse} >
                                <div className="user-block">
                                    <div className="user-block-picture">
                                        <img src={this.state.userInfo.get('picture')} alt={this.state.userInfo.get('username')} width="60" height="60" className="img-thumbnail img-circle"/>
                                        <div className="circle circle-success circle-lg" style={{position: 'absolute', bottom: 0, right: 0, border: '2px solid #fff'}}></div>
                                    </div>
                                    <div className="user-block-info">
                                        <span className="user-block-name">Hello, {this.state.userInfo.get('username')==null ? "游客": this.state.userInfo.get('username')}</span>
                                        <span className="user-block-role">{this.state.userInfo.get('role')==null ? "员工": this.state.userInfo.get('role')}</span>
                                    </div>
                                </div>
                            </Collapse>}
                            {this.generatorSidebar(this.state.navData, "/")}
                            <a className="unfold js-left-panel-collapse-btn" id="left-click-open" onClick={this.handleHorizontalCollapse} ></a>
                        </nav>
                    </div>
                </aside>
            </div>
        );
    },

    handleHorizontalCollapse: function() {
        if($('body').hasClass('aside-collapsed')) {
            $('body').removeClass('aside-collapsed');
            window.localStorage.removeItem('body');
        } else {
            $('body').addClass('aside-collapsed');
            window.localStorage.setItem('body', 'aside-collapsed');
        }
    }


});

module.exports = Sidebar;
                /*<ReactCSSTransitionGroup
                    component="section"
                    transitionName={'rag-fadeIn'}
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}
                >
                </ReactCSSTransitionGroup>*/
