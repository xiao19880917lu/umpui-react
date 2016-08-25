/**
 * @file ReactModal-Form表单  适用于弹出层的表单
 * @author luyongfang@baidu.com
 * */
import React from 'react';
import ReactDOM from 'react-dom';
import {Panel, Input, Col} from 'react-bootstrap';
import Select from 'antd/lib/select';
import ReactInput from './ReactInput.js';
import $ from 'jquery';
import DatePicker from 'antd/lib/date-picker';
const Option = Select.Option;
let Immutable = require('immutable');
let ReactCheckbox = require('./ReactCheckbox.js').default;
let Utils = require('./utils/Utils.js');
let ReactLoading = require('./ReactLoading.js').default;
require('!style!css!sass!../sass/app/_modal.scss');
export default class ReactModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            close: this.props.close ? this.props.close : false,
            refresh: 0,
            errMsg: [],
            height: '100%'
        };
        this.params = {};
    }
    componentWillMount() {
        $('#modal').css({height: '100%'});
        console.log('ReactModal will mount');
    }
    componentWillUnmount() {
        this.props = null;
        $('#modal').length > 0 && $('#modal').remove();
    }
    componentWillReceiveProps(nextProps) {
        // 当传递了新的props时，将现在存储的参数清空
        if (!Immutable.is(Immutable.fromJS(this.props.item), Immutable.fromJS(nextProps.item))) {
            this.params = {};
        }
        if (nextProps.close !== this.state.close) {
            this.setState({close: nextProps.close});
        }
    }
    validateValues(dex, val) {
        let item = this.props.item;
        if (item && Array.isArray(item.config) && item.config[dex]
                && !item.config[dex]['isEmpty'] && val === '') {
            return item.config[dex]['label'] + '不能为空';
        }
        return false;

    }
    handleChange(ref, dex, val, dataString) {
        if (dex === 'checkbox') {
            this.params[ref]['display'] = val;
            this.setState({refresh: ++this.state.refresh});
        } else {
            let sVal = !dataString ? val : dataString;
            let strMsg = this.validateValues(dex, sVal);
            strMsg && (this.state.errMsg[ref] = strMsg);
            (!strMsg) && this.state.errMsg[ref] && (delete this.state.errMsg[ref]);
            this.params[ref] = sVal;
        }
    }
    getFormValues() {
        if (this.props.modalCon.type === 'checkbox') {
            let ckObj = {};
            for (let key in this.params) {
                ckObj[key] = this.params[key]['display'];
            }
            return ckObj;
        }
        return this.params;
    }
    formClick(event) {
        event.stopPropagation();
    }
    handleClick(actionType) {
        let params = this.params;
        let oriParams = {};
        let ckObj = null;
        if (actionType === 'confirm') {
            let arrMsg = [];
            for (let k in this.state.errMsg) {
                if (this.state.errMsg.hasOwnProperty(k)) {
                    arrMsg.push(this.state.errMsg[k]);
                }
            }
            if (arrMsg.length > 0) {
                this.refs.loading.setState({loading: true, content: this.state.arrMsg.join('\n'), timeout: 4000});
                return true;
            }
            if (this.props.modalCon.type === 'checkbox') {
                ckObj = {};
                for (let key in params) {
                    ckObj[key] = params[key]['display'];
                }
            }
            // 将原来的item和现在进行融合
            if (this.props.data) {
                this.params = $.extend({}, this.props.data, ckObj ? ckObj : this.params, true);
            }
            this.props.handleModalClick && this.props.handleModalClick(this.params, ckObj ? ckObj : this.props.data, this.props.item);
            this.setState({refresh: this.state.refresh++, close: true, errMsg: []});
        } else {
            this.props.handleCancel && this.props.handleCancel(this.props.item);
            this.setState({refresh: this.state.refresh++, close: true, errMsg: []});
        }
        $('#modal').css({height: 0});
        $('#modalDiv').length > 0 && $('#modalDiv').remove();
    }
    generateModal() {
        let self = this;
        switch (this.props.modalCon.type) {
            case 'tip':
            case 'warning':
                return <div className="umpui-tip">{this.props.modalCon.msg}</div>;
                break;
            case 'form':
                let liList = [];
                $.each(this.props.item.config, function (dex, item) {
                    let refKey = 'modal_' + item.name;
                    let defaultValue = item.defaultValue;
                    switch (item.type) {
                        case 'select':
                            let opList = [];
                            for (let i = 0; i < item.map.length; i++) {
                                opList.push(<Option key={'option' + i} value={item.map[i]['value']}>
                                    {item.map[i]['label']}</Option>);
                            }
                            liList.push(<li key={'modal' + dex} type="select" data-dex={dex}>
                                <label>{item.label}</label>
                                <Select  optionFilterProp="children" notFoundContent="无法找到"
                                    ref={item.name} name={item.name} defaultValue={defaultValue}
                                    onChange={self.handleChange.bind(self, item.name, dex)}>
                                {opList}
                                </Select></li>);
                            break;
                        case 'input':
                            liList.push(<li key={'modal' + dex} type="input" data-dex={dex}>
                                <label>{item.label}</label>
                                <ReactInput ref={item.name} name={item.name} defaultValue={defaultValue}
                                    value={item.defaultVal} placeholder={item.desc}
                                    handleChange={self.handleChange.bind(self, item.name, dex)}>
                                </ReactInput>
                                </li>);
                            break;
                        case 'datetime':
                            liList.push(<li key={'modal' + dex} type="datetime" data-dex={dex}>
                                <label>{item.label}</label>
                                <DatePicker showTime format="yyyy-MM-dd HH:mm:ss" name={item.name}
                                    ref={item.name} placeholder="请选择时间"
                                    onChange={self.handleChange.bind(self, item.name, dex)}/>
                            </li>);
                            break;
                        default:
                            break;
                    }
                });
                return <ul className="umpui-formlist" onClick={this.formClick}>{liList}</ul>;
                break;
            case 'checkbox':
                // item是tags,其他传递也这样传递,k => v v is string or object,if object no display must be pass false
                let liList2 = [];
                let typeDef = Object.prototype.toString;
                $.each(this.props.item, function (key, value) {
                    !self.params[key] && (self.params[key] = {});
                    let isObject = typeDef.call(value) === '[object Object]';
                    // 先判断props是否传递了display, 如果传递了则取值display否则，默认为true
                    let checked = (isObject && value.display != undefined) ? value.display :  true;
                    // 如果是新传递item，则self.params为{}, 会采用props传递的，如果没有更新item, 则采用params中的display
                    checked = self.params[key]['display'] != undefined ? self.params[key]['display'] : checked;
                    let fieldParams = {
                        title: isObject ? value.title : value,
                        display: checked
                    };
                    Object.assign(self.params[key], isObject ? value : {}, fieldParams);
                    let label = isObject ? value.title : value;
                    liList2.push(<li  key={'modal' + key}><ReactCheckbox ref={key} key={key} name={key}
                        checked={checked} type="checkbox" label={label}
                        handleChange={self.handleChange.bind(self, key, 'checkbox')}></ReactCheckbox></li>);
                });
                let dire = this.props.modalCon.direction;
                let clsName = dire && dire === 'horizontal' ? 'umpui-horizontal umpui-ckList'
                    : 'umpui-vertical umpui-ckList';
                return (<ul className={clsName}>{liList2}</ul>);
                break;
            default:
                break;
        }
    }
    generateBtn() {
        let btnList = [];
        let self = this;
        switch (this.props.modalCon.type) {
            case 'warning':
                btnList.push(<button key={'modalok'} data-name="cancel"
                        className="mb-sm btn btn-primary"
                        onClick={this.handleClick.bind(self, 'confirm')}>确定</button>);
                break;
            default:
                btnList.push(<button key={'modalok'} data-name="ok"
                        onClick={this.handleClick.bind(self, 'confirm')}
                        className="mb-sm btn btn-primary">确定</button>);
                btnList.push(<button key={'modalno'} data-name="cancel"
                        onClick={this.handleClick.bind(self, 'cancel')}
                        className="mb-sm btn btn-danger">取消</button>);
                break;
        }
        return btnList;
    }
    handleDrag(event) {
    }
    handleDragEnd(event) {
        let elem = ReactDOM.findDOMNode(this.refs.reactModal);
        elem.style.left = event.clientX + 'px';
        elem.style.top = event.clientY + 'px';
    }
    render() {
        let style = {
            display: 'block'
        };
        if (this.state.close) {
            style = {
                display: 'none'
            };
        }
        $('#modal').css({height: '100%'});
        return (
            <div id="umpui-modal" style={style}>
                <ReactLoading ref="loading"/>
                <div ref="reactModal" className="umpui-prompt" draggable='true'
                    onDrag={this.handleDrag.bind(this)}
                    onDragEnd={this.handleDragEnd.bind(this)}>
                    <div data-name="cancel" className="umpui-title">
                        <i className="fa fa-times" onClick={this.handleClick.bind(this, 'cancel')}></i>
                        </div>
                    {this.generateModal()}
                    <div className="umpui-modalOperate">
                        <div>{this.generateBtn()}</div>
                    </div>
                </div>
            </div>
        );
    }
}
