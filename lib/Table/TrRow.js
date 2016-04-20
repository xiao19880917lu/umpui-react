
/**
 * @file 简易表格组件 依赖Immutable和amazeUI
 * @author luyongfang@baidu.com
 * */
/* eslint-disable fecs-camelcase */
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Link} from 'react-router';

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
            if (typeof v === 'object' && v.display === false){
                return;
            }else if (typeof v === 'object' && v['type']) {
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
                        tdList.push(<td key={k} data-key={k}>{tdData}</td>);
                        break;
                    case 'edit':
                        tdList.push(<td key={k} data-key={k} onClick={self.props.handleEdit.bind(null, data)}>
                                {data[k] ? data[k] : ''}<span className="fa fa-pencil"></span></td>);
                        break;
                    case 'JSON':
                        tdList.push(<td key={k} data-key={k}><div className="json">{JSON.stringify(tdData)}</div></td>);
                        break;
                    default:
                        break;
                }
            }else {
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
                }else {
                    typeof v === 'object' && v['render'] !== undefined && (tdData = v.render(tdData, data));
                    tdList.push(<td key={k} data-key={k}>{tdData}</td>);
                }
            }
        });
        if (self.props.tableCfg.cfg && self.props.tableCfg.cfg.checkBox) {
            tdList.unshift(<td key={'chk' + data['id']}><input type="checkbox" checked={self.props.checked}
                onChange={this.checkIt}/></td>);
        }
        if (self.props.tableCfg.expand) {
            var strClaName = 'fa fa-plus';
            var strClaName = 'fa fa-plus';
            tdList.unshift(<td key={data['id']} className="expand"><span data-key={data['id']} className={strClaName}
                    onClick={self.props.expandExtraInfo}></span></td>);
        }
        return tdList;
    },
    createMarkup: function (htmlString) {
        return {
            __html: htmlString
        };
    },
    render: function () {
        var tdList = this.generatorRow();
        return (<tr>{tdList}</tr>);
    }
});
module.exports = TrRow;
