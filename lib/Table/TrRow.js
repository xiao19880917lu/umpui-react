
/**
 * @file 简易表格组件 依赖Immutable和amazeUI
 * @author luyongfang@baidu.com
 * */
/* eslint-disable fecs-camelcase */
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Link} from 'react-router';
import UserMixin from '../mixins/UserMixin.js';
import $ from 'jquery';
let Card = require('../Card.js').default;
let Utils = require('../utils/Utils.js');
export default class TrRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: this.props.checked,
            isDown: this.props.expandAll || false
        };
    }
    cusOperaEvent(data, action, event) {
        !event && (event = window.event);
        event.preventDefault();
        event.stopPropagation();
        action.onClick && action.onClick(data, event.target);
    }
    checkIt() {
        this.props.callback(this.props.id, !this.props.checked, this.props.obj);
        this.setState({checked: !this.state.checked});
        return;
    }
    generatorRow() {
        let tdList = [];
        let self = this;
        let data = self.props.obj;
        for (let k in self.props.showTags) {
            let v = self.props.showTags[k];
            let tdData = (data[k] != null) ? data[k] : '';
            if (typeof v === 'object' && v.display === false) {
                continue;
            } else if (typeof v === 'object' && v['type']) {
                let elliClass = v['ellipsis'] ? 'ellipsis' : '';
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
                        tdList.push(<td key={k} className={elliClass} data-key={k} ref={k}
                            onMouseEnter={elliClass ? self.handleMouseEvent.bind(self, data[k], 'enter', k) : null}
                            onMouseLeave={elliClass ? self.handleMouseEvent.bind(self, data[k], 'leave', k) : null}
                            onClick={self.props.handleEdit.bind(null, data)}>
                            <span className="fa fa-pencil"></span>{data[k] ? data[k] : ''}</td>);
                        break;
                    case 'JSON':
                        let json = JSON.stringify(tdData, null, 2);
                        let html = Utils.syntaxHighlight(json);
                        tdList.push(<td key={k} className={elliClass} data-key={k}><pre className="json"
                                dangerouslySetInnerHTML={self.createMarkup(html)}></pre></td>);
                        break;
                    case 'html':
                        tdList.push(<td key={k} data-key={k}
                                dangerouslySetInnerHTML={self.createMarkup(tdData)}></td>);
                    default:
                        break;
                }
            } else {
                if (k === 'operation') {
                    let Links = [];
                    v.links.forEach(function (obj, dex) {
                        let objLink = obj.link(null, data);
                        let link = objLink.basicLink + (objLink.extra ? '/' + self.props.linkExtra[objLink.extra] : '');
                        let beforeLink = obj.beforeLink ? obj.beforeLink : '';
                        Links.push(<Link to={link} onClick={beforeLink.bind(this, null, data)} key={dex}>
                            {obj.title}</Link>);
                    });
                    if (v.render && typeof(v.render) === 'function') {
                        v.render(null, data);
                    }
                    tdList.push(<td key={k} data-key={k}>{Links}</td>);
                } else if (k === 'cusOperation') {
                    // 只提供click回调函数
                    let actionList = [];
                    let actions = self.props.showTags[k]['actions'];
                    actions.forEach(function (action, dex) {
                        if (action.render) {
                            let cusRender = action.render(null, data);
                            actionList.push(<span onClick={self.cusOperaEvent.bind(self, data, action)}>
                                {cusRender}</span>);
                        } else {
                            actionList.push(<a href="#" className=""
                                onClick={self.cusOperaEvent.bind(self, data, action)}>
                                {action['title']}</a>);
                        }
                    });
                    tdList.push(<td>{actionList}</td>);

                } else {
                    let elliClass = (typeof v === 'object' && v['ellipsis']) ? 'ellipsis' : '';
                    typeof v === 'object' && v['render'] !== undefined && (tdData = v.render(tdData, data));
                    tdList.push(<td key={k} className={elliClass} ref={k}
                        onMouseEnter={elliClass ? self.handleMouseEvent.bind(self, data[k], 'enter', k) : null}
                        onMouseLeave={elliClass ? self.handleMouseEvent.bind(self, data[k], 'leave', k) : null}
                        data-key={k}>{tdData}</td>);
                }
            }
        }
        let operationSpan = [];
        if (self.props.tableCfg.cfg && self.props.tableCfg.cfg.checkBox) {
            let disabled = data['disabled'] ? data['disabled'] : false;
            operationSpan.push(<span key="trcheckbox"><input type="checkbox" checked={self.props.checked}
                    onChange={this.checkIt.bind(this)} disabled={disabled}/></span>);
        }
        if (self.props.tableCfg.display && self.props.tableCfg.display.expand) {
            let foldUp = 'fa fa-caret-right';
            let foldDown = 'fa fa-caret-down';
            let strClaName = this.state.isDown || this.props.expandAll ? foldDown : foldUp;
            operationSpan.push(<span key="trexpand" data-key={data['id']} className={strClaName}
                onClick={self.expandExtraInfo.bind(self, 'expandtr' + data['id'])}></span>);
        }
        if (self.props.tableCfg.display && self.props.tableCfg.display.tips) {
            let tips = this.props.obj['tips'];
            let ref = 'trtips_' + data['id'];
            operationSpan.push(<span key="trtips" data-key={data['id']} ref={ref}
                    className='fa fa-question-circle'
                    onMouseEnter={this.handleMouseEvent.bind(this, tips, 'enter', ref)}
                    onMouseLeave={this.handleMouseEvent.bind(this, tips, 'leave', ref)}></span>);
        }
        if (operationSpan.length > 0) {
            tdList.unshift(<td key={'extra' + data['id']} className="extra">{operationSpan}</td>);
        }
        return tdList;
    }
    expandExtraInfo(refK) {
        this.props.expandExtraInfo(refK, !this.state.isDown);
        this.setState({isDown: !this.state.isDown});
    }
    handleMouseEvent(tips, type, refk, e) {
        let refKey = refk ? refk : 'tr';
        let elem = $(ReactDOM.findDOMNode(this.refs[refKey]));
        switch (type) {
            case 'enter':
                let data = {
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
    }
    createMarkup(htmlString) {
        return {
            __html: htmlString
        };
    }
    render() {
        let tdList = this.generatorRow();
        let disabled = this.props.obj['disabled'] ? this.props.obj['disabled'] : false;
        let style = {};
        if (disabled) {
            style = {
                background: '#e4e5e7'
            };
        }
        return (<tr ref="tr" style={style}>{tdList}</tr>);
    }
}
