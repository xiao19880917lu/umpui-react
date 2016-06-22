/**
 * @file ReactModal-Form表单
 * @author luyongfang@baidu.com
 * */
import React from 'react';
import ReactDOM from 'react-dom';
import {Panel, Input, Col} from 'react-bootstrap';
import {Selected} from 'amazeui-react';
import ReactInput from './ReactInput.js';
import $ from 'jquery';
let ReactCheckbox = require('./ReactCheckbox.js').default;
let Utils = require('./utils/Utils.js');
let DateTimeField = require('react-bootstrap-datetimepicker');
let ReactLoading = require('./ReactLoading.js');
require('!style!css!sass!../sass/app/_modal.scss');
export default class ReactModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            close: this.props.close ? this.props.close : false,
            refresh: 0,
            height: '100%'
        };
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
    handleClick(msEvent, event) {
        let action = $(event.target).attr('data-name');
        if (!action) {
            return;
        }
        let errMsg = [];
        if (action === 'ok') {
            let refs = this.refs;
            let params = {};
            for (let k in refs) {
                if (k === 'reactModal' || k === 'loading') {
                    continue;
                }
                let st = refs[k].state;
                let val = (st.val || st.val * 1 === 0) ? st.val : ((st.value || st.value * 1 === 0) ? st.value : '');
                let liElem = $(ReactDOM.findDOMNode(refs[k])).parent('li');
                let type = liElem && liElem[0] ? liElem[0].getAttribute('type') : '';
                let dex = liElem && liElem[0] ? liElem[0].getAttribute('data-dex') : '';
                // 如果是日期，如何转化呢
                switch (type) {
                    case 'checkbox':
                        // 只赋值选中的checkbox
                        val && (params[k] = val);
                        break;
                    case 'datetime':
                        let dateVal = refs[k].getValue();
                        let val = dateVal;
                        if (dateVal.indexOf('-') !== -1) {
                            val = dateVal;
                        } else {
                            let day = new Date(parseInt(dateVal / 1000, 0) * 1000);
                            val = Utils.getLocalFormatTime(day);
                        }
                        params[k] = val;
                        break;
                    default:
                        params[k] = val;
                        break;
                }
                let strMsg = this.validateValues(dex, val);
                strMsg && errMsg.push(strMsg);
            }
            if (errMsg.length > 0) {
                this.refs.loading.setState({loading: true, content: errMsg.join('\n'), timeout: 4000});
                return true;
            }
            if (this.props.data) {
                params = $.extend({}, this.props.data, params, true);
            }
            this.props.handleModalClick && this.props.handleModalClick(this.props.item, params);
            this.setState({refresh: this.state.refresh++, close: true});
        } else {
            this.props.handleCancel && this.props.handleCancel(this.props.item);
            this.setState({refresh: this.state.refresh++, close: true});
        }
        $('#modal').css({height: 0});
        $('#modalDiv').length > 0 && $('#modalDiv').remove();
    }
    formClick(event) {
        event.stopPropagation();
    }
    generateModal() {
        switch (this.props.modalCon.type) {
            case 'tip':
            case 'warning':
                return <div className="tip">{this.props.modalCon.msg}</div>;
                break;
            case 'form':
                let liList = [];
                $.each(this.props.item.config, function (dex, item) {
                    let refKey = 'modal_' + item.name;
                    switch (item.type) {
                        case 'select':
                            let selectedProps = {
                                data: item.map,
                                maxHeight: 150,
                                btnStyle: 'secondary'
                                // searchBox: true
                            };
                            liList.push(<li key={'modal' + dex} type="select" data-dex={dex}>
                                <label>{item.label}</label>
                                <Selected ref={item.name}{...selectedProps}
                                btnStyle="primary" multiple={false}/></li>);
                            break;
                        case 'input':
                            liList.push(<li key={'modal' + dex} type="input" data-dex={dex}>
                                <label>{item.label}</label>
                                <ReactInput ref={item.name} name={item.name} value={item.defaultVal}
                                placeholder={item.desc}></ReactInput>
                                </li>);
                            break;
                        case 'datetime':
                            let props = {};
                            let defaultVal = '2016-05-27';
                            if (item.viewMode === 'date') {
                                defaultVal = '2016-05-17';
                                props = {
                                    viewMode: 'date',
                                    format: 'YYYY-MM-DD',
                                    inputFormat: 'YYYY-MM-DD'
                                };
                            } else {
                                defaultVal = '2016-06-20 00:00:00';
                                props = {
                                    viewMode: 'datetime',
                                    format: 'YYYY-MM-DD HH:mm:ss',
                                    inputFormat: 'YYYY-MM-DD HH:mm:ss'
                                };
                            }
                            liList.push(<li key={'modal' + dex} type="datetime" data-dex={dex}>
                                    <label>{item.label}</label>
                                <DateTimeField ref={item.name} {...props} name={item.name}
                                standalone dateTime={defaultVal} />
                            </li>);
                            break;
                        default:
                            break;
                    }
                });
                return <ul onClick={this.formClick}>{liList}</ul>;
                break;
            case 'checkbox':
                // item是tags,其他传递也这样传递,k => v v is string or object,if object no display must be pass false
                let liList2 = [];
                let typeDef = Object.prototype.toString;
                $.each(this.props.item, function (key, value) {
                    let checked = (value.display === false) ? false : true;
                    let label = (typeDef.call(value) === '[object Object]') ? value.title : value;
                    liList2.push(<li  key={'modal' + key}><ReactCheckbox ref={key} key={key} name={key}
                        checked={checked} type="checkbox" label={label}></ReactCheckbox></li>);
                });
                return (<ul className="form-group">{liList2}</ul>);
                break;
            default:
                break;
        }
    }
    generateBtn() {
        let btnList = [];
        switch (this.props.modalCon.type) {
            case 'warning':
                btnList.push(<button key={'modalok'} data-name="cancel" className="mb-sm btn btn-primary">确定</button>);
                break;
            default:
                btnList.push(<button key={'modalok'} data-name="ok" className="mb-sm btn btn-primary">确定</button>);
                btnList.push(<button key={'modalno'} data-name="cancel"  className="mb-sm btn btn-danger">取消</button>);
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
            <div id="modal" style={style}>
                <ReactLoading ref="loading"/>
                <div ref="reactModal" className="my-prompt" draggable='true'
                    onDrag={this.handleDrag.bind(this)}
                    onDragEnd={this.handleDragEnd.bind(this)}>
                    <div data-name="cancel" className="title" onClick={this.handleClick.bind(this, event)}></div>
                    {this.generateModal()}
                    <div className="modalOperate" onClick={this.handleClick.bind(this, event)}>
                        <div>{this.generateBtn()}</div>
                    </div>
                </div>
            </div>
        );
    }
}
