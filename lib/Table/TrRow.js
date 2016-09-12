
/**
 * @file 简易表格组件 依赖Immutable和amazeUI
 * @author luyongfang@baidu.com
 * */
/* eslint-disable fecs-camelcase */
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Link} from 'react-router';
import {Input, Radio, Checkbox, Select} from 'antd';
import UserMixin from '../mixins/UserMixin.js';
import $ from 'jquery';
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
const Option = Select.Option;
let Immutable = require('immutable');
let Card = require('../Card.js').default;
let Utils = require('../utils/Utils.js');
export default class TrRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // checked: this.props.checked,
            lineData: this.props.obj,
            isDown: this.props.expandAll || false,
            active: false
        };
    }
    componentWillReceiveProps(nextProps) {
        if (!Immutable.is(Immutable.Map(nextProps.obj), Immutable.Map(this.props.obj))) {
            this.setState({
                lineData: nextProps.obj
            });
        }
    }
    cusOperaEvent(data, action, event) {
        !event && (event = window.event);
        event.preventDefault();
        event.stopPropagation();
        action.onClick && action.onClick(data, event.target);
    }
    checkIt(e) {
        e = e || window.event;
        e.stopPropagation();
        e.preventDefault();
        this.props.callback(this.props.id, !this.props.checked, this.props.obj);
        // this.setState({checked: !this.state.checked});
        return;
    }

    /**
     * 因为是多行编辑，所以编辑之后的数据应该统一在table上存储
     * 同时需要记录编辑的是哪行
     * 编辑之后的数据，都是保存的value而不是展示的label等
     * stopPropagation 防止冒泡到tr上触发checkbox的选择事件
     * @param {string} field 编辑的是哪个字段
     * @param {string} fieldValue 编辑之后的字段值
     * @param {Object} e event对象
     */
    setLineData(field, fieldValue, e) {
        e = e || window.event;
        e.stopPropagation();
        e.preventDefault();
        let objNewData = {};
        objNewData[field] = fieldValue;
        let objNewLineData = Object.assign({}, this.state.lineData, objNewData);
        this.props.setEditTableData && this.props.setEditTableData(this.props.id, objNewLineData);
        this.setState({lineData: objNewLineData});
    }

    /**
     * radio/inpu没有直接获取事件之后的值，需要通过e获取，封装一层
     * @param {string} field  要编辑的字段
     * @param {Object} e Event对象
     */
    setEditData(field, e) {
        e = e || window.event;
        e.stopPropagation();
        e.preventDefault();
        let value = e.target.value;
        this.setLineData(field, value);
    }
    generatorRow() {
        let tdList = [];
        let self = this;
        let data = self.state.lineData;
        // 当前行是灰色的,不可以进行编辑
        let disabled = data['disabled'] ? data['disabled'] : false;
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
                if (k === 'cusOperation') {
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
                    tdList.push(<td className="operation">{actionList}</td>);

                } else {
                    let elliClass = (typeof v === 'object' && v['ellipsis']) ? 'ellipsis' : '';
                    typeof v === 'object' && v['render'] !== undefined && (tdData = v.render(tdData, data));
                    /**
                     * 1. 是否可编辑edit: true/false
                     * 2. 当前编辑字段的类型: text/radio/checkbox/select
                     * 3. text => input
                     *    radio => 只有1个 boolean选择是或者否
                     *    radioGroup => group组选择
                     *    checkbox => 可能有多个选择-配置map[]
                     *    select => 提供map
                     * 4. tr处在disabled的状态下是不可以进行编辑的,且展示的字段是中文不能够是值
                     *    这里的编辑配置只适合数据比较少的情况，前端可以配置的
                     *    对于编辑项的配置比较复杂的情况不适合，如下拉框好长好长的需要从后端获取的
                     *    对于从后端获取的option的这种情况可以在ajax请求后更改tableCfg重新渲染获得-待做感觉不太好
                     */
                    let arrEdit = [];
                    let newTdData = null;
                    if (typeof v === 'object' && v['editCfg'] && v['editCfg']['edit']) {
                        switch (v.editCfg['elemType']) {
                            case 'text':
                                if (disabled || !this.props.lineEdit) {
                                    newTdData = tdData;
                                    break;
                                }
                                arrEdit.push(<Input defaultValue={tdData}
                                        onChange={this.setEditData.bind(this, k)}/>);
                                break;
                            case 'radio':
                                if (disabled || !this.props.lineEdit) {
                                    newTdData = tdData;
                                    break;
                                }
                                let arrValues = ['是', 1, false, '1'];
                                let arrAgainstValues = ['否', 0, true, '0'];
                                let checked = false;
                                let bSwitchVal = -1;
                                let iDex = arrValues.indexOf(tdData);
                                if (iDex !== -1) {
                                    checked = true;
                                    bSwitchVal = arrAgainstValues[iDex];
                                } else {
                                    iDex = arrAgainstValues.indexOf(tdData);
                                    bSwitchVal = arrValues[iDex];
                                }
                                arrEdit.push(<Radio defaultChecked={checked} checked={checked}
                                        onClick={this.setLineData.bind(this, k, bSwitchVal)}></Radio>);
                                break;
                            case 'checkbox':
                                /**
                                 * defaultValue对应options中的label字段
                                 * checkbox可以多选，就说明值可以是多个，这里多个值用逗号进行分割
                                 */
                                let arrOptions = v['editCfg']['options'];
                                let arrData = tdData.split(',');
                                let arrDefv = [];
                                let arrDefL = [];
                                for (let option of arrOptions) {
                                    if (arrData.indexOf(option['value'].trim()) !== -1) {
                                        arrDefv.push(option['value']);
                                        arrDefL.push(option['label']);
                                    }
                                }
                                if (disabled || !this.props.lineEdit) {
                                    newTdData = arrDefL.join(',');
                                    break;
                                }
                                arrEdit.push(<CheckboxGroup options={arrOptions} defaultValue={arrDefv}
                                        onClick={this.setLineData.bind(this, k)}/>);
                                break;
                            case 'radioGroup':
                                /**
                                 * radioGroup只能选择一个, 大于等于2个可选项的情况
                                 * 后端返回的data中的值是value而不是展示的label
                                 */
                                let arrGOptions = v['editCfg']['options'];
                                let tdLabel = null;
                                let arrRadioList = [];
                                for (let option of arrGOptions) {
                                    let strKey = option['value'] + data['id'];
                                    (tdData === option['value']) && (tdLabel = option['label']);
                                    arrRadioList.push(<Radio key={strKey} value={option['value']}>
                                            {option['label']}</Radio>);
                                }
                                if (disabled || !this.props.lineEdit) {
                                    newTdData = tdLabel;
                                    break;
                                }
                                arrEdit.push(<RadioGroup value={tdData}
                                        onChange={this.setEditData.bind(this, k)}>{arrRadioList}</RadioGroup>);
                                break;
                            case 'select':
                                /**
                                 * select列表
                                 */
                                let objOptions = v['editCfg']['options'];
                                let selList = [];
                                if (disabled || !this.props.lineEdit) {
                                    newTdData = objOptions[tdData];
                                    break;
                                }
                                for (let i in objOptions) {
                                    if (objOptions.hasOwnProperty(i)) {
                                        selList.push(<Option key={'option' + i} value={i}>
                                            {objOptions[i]}</Option>);
                                    }
                                }
                                arrEdit.push(<Select defaultValue={tdData}
                                    onChange={this.setLineData.bind(this, k)}>{selList}</Select>);
                                break;
                            default:
                                break;
                        }
                    }
                    tdList.push(<td key={k} className={elliClass} ref={k}
                        onMouseEnter={elliClass ? self.handleMouseEvent.bind(self, data[k], 'enter', k) : null}
                        onMouseLeave={elliClass ? self.handleMouseEvent.bind(self, data[k], 'leave', k) : null}
                        data-key={k}>{arrEdit.length > 0 ? arrEdit : (newTdData ? newTdData : tdData)}</td>);
                }
            }
        }
        let operationSpan = [];
        let isShowCheckbox = self.props.tableCfg.cfg && self.props.tableCfg.cfg.checkBox;
        if (isShowCheckbox) {
            operationSpan.push(<span key="trcheckbox">
                <Checkbox checked={self.props.checked} onChange={this.checkIt.bind(this)} disabled={disabled}/></span>);
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
                    // className='fa fa-question-circle'
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
    removeActiveStatus() {
        this.setState({active: false});
    }
    handleClick(event) {
        let data = this.state.lineData;
        // 当前行是灰色的,不可以进行编辑
        let disabled = data['disabled'] ? data['disabled'] : false;
        if (!disabled) {
            this.props.callback(this.props.id, !this.props.checked, this.props.obj);
        }
    }
    doubleClick() {
        this.props.trDoubleClick && this.props.trDoubleClick();
        this.setState({active: true});
    }
    render() {
        let tdList = this.generatorRow();
        let disabled = this.props.obj['disabled'] ? this.props.obj['disabled'] : false;
        // let isShowCheckbox = this.props.tableCfg.cfg && this.props.tableCfg.cfg.checkBox;
        let className = this.state.active ? 'actived' : '';
        className += this.props.checked ? ' selected' : '';
        let style = disabled ? {background: '#e4e5e7'} : {};
        return (<tr ref="tr" style={style}
                    className={className}
                    onClick={this.handleClick.bind(this)}
                    onDoubleClick={this.doubleClick.bind(this)}>{tdList}</tr>);
    }
}
