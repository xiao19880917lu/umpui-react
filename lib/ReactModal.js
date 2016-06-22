/**
 * @file NOC顶部
 * @author luyongfang@baidu.com
 * */
import React from 'react';
import ReactDOM from 'react-dom';
import {Panel, Input, Col} from 'react-bootstrap';
import {Selected} from 'amazeui-react';
import $ from 'jquery';
var ReactInput = require('./ReactInput.js');
var ReactSelect = require('./ReactSelect.js');
var ReactCheckbox = require('./ReactCheckbox.js').default;
var Utils = require('./utils/Utils.js');
var DateTimeField = require('react-bootstrap-datetimepicker');
require('!style!css!sass!../sass/app/_modal.scss');
var ReactModal = React.createClass({
    getInitialState: function () {
        return {
            close: this.props.close ? this.props.close : false,
            refresh: 0,
            data: this.props.data ? this.props.data : {},
            item: this.props.item ? this.props.item : {},
            modalCon: this.props.modalCon ?  this.props.modalCon : {}
        };
    },
    componentWillMount: function () {
        $('#modal').css({height: '100%'});
        console.log('ReactModal will mount');
    },
    componentWillUnmount: function () {
        this.props = null;
        $('#modal').length > 0 && $('#modal').remove();
    },
    componentWillReceiveProps: function (nextProps) {
        if (nextProps.close !== this.state.close) {
            this.setState({close: nextProps.close});
        }
    },
    handleClick: function (event) {
        var action = $(event.target).attr('data-name');
        if (!action) {
            return;
        }
        $('#modal').css({height: 0});
        if (action === 'ok') {
            var refs = this.refs;
            var params = {};
            for (var k in refs) {
                if (k === 'reactModal') {
                    continue;
                }
                var st = refs[k].state;
                var val = (st.val || st.val * 1 === 0) ? st.val : ((st.value || st.value * 1 === 0) ? st.value : '');
                var type = refs[k].state.type ? refs[k].state.type : 'common';
                var liElem = $(ReactDOM.findDOMNode(refs[k])).parent('li');
                var type = liElem && liElem[0] ? liElem[0].getAttribute('type') : 'common';
                // 如果是日期，如何转化呢
                switch (type) {
                    case 'checkbox':
                        // 只赋值选中的checkbox
                        val && (params[k] = val);
                        break;
                    case 'datetime':
                        var dateVal = refs[k].getValue();
                        if (dateVal.indexOf('-') !== -1) {
                            var val = dateVal;
                        } else {
                            var day = new Date(parseInt(dateVal / 1000, 0) * 1000);
                            var val = Utils.getLocalFormatTime(day);
                        }
                        params[k] = val;
                        break;
                    default:
                        params[k] = val;
                        break;
                }
            }
            if (this.state.data) {
                var params = $.extend({}, this.state.data, params, true);
            }
            this.props.handleModalClick && this.props.handleModalClick(this.state.item, params);
            this.setState({refresh: this.state.refresh++, close: true});
        } else {
            // this.props = null;
            this.props.handleCancel && this.props.handleCancel(this.state.item, params);
            this.setState({refresh: this.state.refresh++, close: true});
        }
        $('#modalDiv').length > 0 && $('#modalDiv').remove();
    },
    formClick: function (event) {
        // event.preventDefault();
        event.stopPropagation();
    },
    generateModal: function () {
        switch (this.state.modalCon.type) {
            case 'tip':
            case 'warning':
                return <div className="tip">{this.state.modalCon.msg}</div>;
                break;
            case 'form':
                var liList = [];
                $.each(this.state.item.config, function (dex, item) {
                    var refKey = 'modal_' + item.name;
                    switch (item.type) {
                        case 'select':
                            var selectedProps = {
                                data: item.map,
                                maxHeight: 150,
                                btnStyle: 'secondary'
                                // searchBox: true
                            };
                            liList.push(<li key={'modal' + dex} type="select">
                                <label>{item.label}</label>
                                <Selected ref={item.name}{...selectedProps}
                                btnStyle="primary" multiple={false}/></li>);
                            break;
                        case 'input':
                            liList.push(<li key={'modal' + dex} type="input"><label>{item.label}</label>
                                <ReactInput ref={item.name} name={item.name} value={item.defaultVal}
                                placeholder={item.desc}></ReactInput>
                                </li>);
                            break;
                        case 'datetime':
                            if (item.viewMode === 'date') {
                                var defaultVal = '2016-05-17';
                                var props = {
                                    viewMode: 'date',
                                    format: 'YYYY-MM-DD',
                                    inputFormat: 'YYYY-MM-DD'
                                };
                            } else {
                                var defaultVal = '2016-06-20 00:00:00';
                                var props = {
                                    viewMode: 'datetime',
                                    format: 'YYYY-MM-DD HH:mm:ss',
                                    inputFormat: 'YYYY-MM-DD HH:mm:ss'
                                };
                            }
                            liList.push(<li key={'modal' + dex} type="datetime"><label>{item.label}</label>
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
                var liList = [];
                var typeDef = Object.prototype.toString;
                $.each(this.state.item, function (key, value) {
                    var checked = (value.display === false) ? false : true;
                    var label = (typeDef.call(value) === '[object Object]') ? value.title : value;
                    liList.push(<li  key={'modal' + key}><ReactCheckbox ref={key} key={key} name={key}
                        checked={checked} type="checkbox" label={label}></ReactCheckbox></li>);
                });
                return (<ul className="form-group">{liList}</ul>);
                break;
            default:
                break;
        }
    },
    generateBtn: function () {
        var btnList = [];
        switch (this.state.modalCon.type) {
            case 'warning':
                btnList.push(<button key={'modalok'} data-name="cancel" className="mb-sm btn btn-primary">确定</button>);
                break;
            default:
                btnList.push(<button key={'modalok'} data-name="ok" className="mb-sm btn btn-primary">确定</button>);
                btnList.push(<button key={'modalno'} data-name="cancel"  className="mb-sm btn btn-danger">取消</button>);
                break;
        }
        return btnList;
    },
    handleDrag: function (event) {
    },
    handleDragEnd: function (event) {
        var elem = ReactDOM.findDOMNode(this.refs.reactModal);
        elem.style.left = event.clientX + 'px';
        elem.style.top = event.clientY + 'px';
    },
    render: function () {
        var style = {
            display: 'block'
        };
        if (this.state.close) {
            var style = {
                display: 'none'
            };
        }
        $('#modal').css({height: '100%'});
        return (
            <div id="modal" style={style}>
                <div ref="reactModal" className="my-prompt" draggable='true'
                    onDrag={this.handleDrag}
                    onDragEnd={this.handleDragEnd}>
                    <div data-name="cancel" className="title" onClick={this.handleClick}></div>
                    {this.generateModal()}
                    <div className="modalOperate" onClick={this.handleClick}>
                        <div>{this.generateBtn()}</div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = ReactModal;
