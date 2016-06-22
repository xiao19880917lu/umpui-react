
/**
 * @file 简易表格组件 依赖Immutable和amazeUI
 * @author luyongfang@baidu.com
 * */
/* eslint-disable fecs-camelcase */
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Link} from 'react-router';
import $ from 'jquery';
var Card = require('../Card.js').default;
var Utils = require('../utils/Utils.js');
var TrRow = React.createClass({
    getInitialState: function () {
        return {
            checked: this.props.checked
        };
    },
    checkIt: function () {
        this.props.callback(this.props.id, !this.props.checked, this.props.obj);
        this.setState({checked: !this.state.checked});
        return;
    },
    generatorRow: function () {
        var tdList = [];
        var self = this;
        let data = self.props.obj;
        $.each(self.props.showTags, function (k, v) {
            let tdData = data[k] ? data[k] : '';
            if (typeof v === 'object' && v.display === false) {
                return;
            } else if (typeof v === 'object' && v['type']) {
                var elliClass = v['ellipsis'] ? 'ellipsis' : '';
                switch (v.type) {
                    case 'duration':
                        const timeDiff = ((+new Date()) - (+new Date(Date.parse(tdData.replace(/-/g, '/'))))) / 1000;
                        const dayTime = Math.floor(timeDiff / (24 * 3600));
                        const hourTime = Math.floor((timeDiff % (24 * 3600)) / 3600);
                        const minuteTime = Math.floor((timeDiff % (24 * 3600) % 3600) / 60);
                        const secTime = Math.floor(timeDiff % (24 * 3600) % 3600 % 60);
                        let timeArr = [];

                        dayTime > 0 && timeArr.push(dayTime + '天');
                        hourTime > 0 && timeArr.push(hourTime + '时');
                        minuteTime > 0 && timeArr.push(minuteTime + '分');

                        (dayTime === 0 && hourTime === 0 && minuteTime === 0)
                            && secTime > 0 && timeArr.push(secTime + '秒');
                        tdData = timeArr.join('');
                        typeof v === 'object' && v['render'] !== undefined && (tdData = v.render(tdData, data));
                        tdList.push(<td key={k} className={elliClass} data-key={k}>{tdData}</td>);
                        break;
                    case 'edit':
                        console.log(data[k]);
                        tdList.push(<td key={k} className={elliClass} data-key={k}
                            onMouseEnter={elliClass ? self.handleMouseEvent.bind(self, data[k], 'enter', k) : null}
                            onMouseLeave={elliClass ? self.handleMouseEvent.bind(self, data[k], 'leave', k) : null}
                            onClick={self.props.handleEdit.bind(null, data)}>
                            <span className="fa fa-pencil"></span>{data[k] ? data[k] : ''}</td>);
                        break;
                    case 'JSON':
                        var json = JSON.stringify(tdData, null, 2);
                        var html = Utils.syntaxHighlight(json);
                        tdList.push(<td key={k} className={elliClass} data-key={k}><pre className="json"
                                dangerouslySetInnerHTML={self.createMarkup(html)}></pre></td>);
                        break;
                    default:
                        break;
                }
            } else {
                if (k === 'operation') {
                    var Links = [];
                    $.each(v.links, function (dex, obj) {
                        var objLink = obj.link(null, data);
                        var link = objLink.basicLink + (objLink.extra ? '/' + self.props.linkExtra[objLink.extra] : '');
                        var beforeLink = obj.beforeLink ? obj.beforeLink : '';
                        Links.push(<Link to={link} onClick={beforeLink.bind(this, null, data)} key={dex}>
                            {obj.title}</Link>);
                    });
                    if (v.render && typeof(v.render) === 'function') {
                        v.render(null, data);
                    }
                    tdList.push(<td key={k} data-key={k}>{Links}</td>);
                } else {
                    var elliClass = (typeof v === 'object' && v['ellipsis']) ? 'ellipsis' : '';
                    typeof v === 'object' && v['render'] !== undefined && (tdData = v.render(tdData, data));
                    tdList.push(<td key={k} className={elliClass} ref={k}
                        onMouseEnter={elliClass ? self.handleMouseEvent.bind(self, data[k], 'enter', k) : null}
                        onMouseLeave={elliClass ? self.handleMouseEvent.bind(self, data[k], 'leave', k) : null}
                        data-key={k}>{tdData}</td>);
                }
            }
        });
        var operationSpan = [];
        if (self.props.tableCfg.cfg && self.props.tableCfg.cfg.checkBox) {
            var disabled = data['disabled'] ? data['disabled'] : false;
            operationSpan.push(<span key="trcheckbox"><input type="checkbox" checked={self.props.checked}
                    onChange={this.checkIt} disabled={disabled}/></span>);
        }
        if (self.props.tableCfg.display && self.props.tableCfg.display.tips) {
            var tips = this.props.obj['tips'];
            var ref = 'trtips_' + data['id'];
            operationSpan.push(<span key="trtips" data-key={data['id']} ref={ref}
                    className='fa fa-question-circle'
                    onMouseEnter={this.handleMouseEvent.bind(this, tips, 'enter', ref)}
                    onMouseLeave={this.handleMouseEvent.bind(this, tips, 'leave', ref)}></span>);
        }
        if (self.props.tableCfg.display && self.props.tableCfg.display.expand) {
            var strClaName = 'fa fa-caret-right';
            operationSpan.push(<span key="trexpand" data-key={data['id']} className={strClaName}
                    onClick={self.props.expandExtraInfo}></span>);
        }
        if (operationSpan.length > 0) {
            tdList.unshift(<td key={'extra' + data['id']} className="extra">{operationSpan}</td>);
        }
        return tdList;
    },
    handleMouseEvent: function (tips, type, refk, e) {
        var refKey = refk ? refk : 'tr';
        var elem = $(ReactDOM.findDOMNode(this.refs[refKey]));
        switch (type) {
            case 'enter':
                var data = {
                    server1: '已执行完',
                    server2: '已执行完eee',
                    server3: '正在执行中aa~',
                    server4: '正在执行中ss~'
                };
                Card.init({elem: elem, data: tips, type: 'string'}, 'hover', e);
                // Card.init({keyWidth:100, valueWidth:200, elem: elem, data: data, type: 'array'}, 'hover', e);
                break;
            case 'leave':
                Card.init({elem: elem, data: tips, type: 'string'}, 'leave', e);
                break;
        }
    },
    createMarkup: function (htmlString) {
        return {
            __html: htmlString
        };
    },
    render: function () {
        var tdList = this.generatorRow();
        var disabled = this.props.obj['disabled'] ? this.props.obj['disabled'] : false;
        var style = {};
        if (disabled) {
            style = {
                background: '#e4e5e7'
            };
        }
        return (<tr ref="tr" style={style}>{tdList}</tr>);
        // 不采用下面是因为可能鼠标悬浮还有其他的动作
        /*var tips = this.props.obj['tips'];
        if (disabled) {
            return(<tr ref="tr" onMouseEnter={this.handleMouseEvent.bind(this, tips, 'enter')}
                    onMouseLeave={this.handleMouseEvent.bind(this, tips, 'leave')}>{tdList}</tr>);
        }else {
            return (<tr ref="tr">{tdList}</tr>);
        }*/
    }
});
module.exports = TrRow;
