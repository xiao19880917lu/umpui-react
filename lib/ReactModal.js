/**
 * @file NOC顶部
 * @author luyongfang@baidu.com
 * */
var React = require('react');
var ReactDOM = require('react-dom');
var ReactInput = require('./ReactInput.js');
var ReactSelect = require('./ReactSelect.js');
var ReactCheckbox = require('./ReactCheckbox.js').default;
import{ Panel, Input } from 'react-bootstrap';
import {Selected} from 'amazeui-react';
require("!style!css!sass!../sass/app/_modal.scss");
var ReactModal = React.createClass({
        close: false,
        getInitialState: function () {
            this.close = this.props.close;
            return {
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
                    var val = refs[k].state.val ? refs[k].state.val : (refs[k].state.value ? refs[k].state.value : '');
                    var type = refs[k].state.type ? refs[k].state.type : 'common';
                    switch (type) {
                        case 'checkbox':
                            // 只赋值选中的checkbox
                            val && (params[k] = val);
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
                this.close = true;
                this.setState({refresh: this.state.refresh++});
            }else {
                this.props = null;
                this.close = true;
                this.setState({refresh: this.state.refresh++});
                $('#modal').length > 0 && $('#modal').remove();
            }

        },
        formClick: function (event) {
            event.preventDefault();
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
                                    btnStyle: 'secondary',
                                    searchBox: true
                                };
                                liList.push(<li>
                                    <label>{item.label}</label>
                                    <Selected ref={item.name} {...selectedProps} btnStyle="primary" value="ALL"/></li>);
                                /*liList.push(<li><label>{item.label}</label>
                                    <ReactSelect ref={item.name} name={item.name} data={item.map}></ReactSelect>
                                    </li>);*/
                                break;
                            case 'input':
                                liList.push(<li><label>{item.label}</label>
                                    <ReactInput ref={item.name} name={item.name} value={item.defaultVal}
                                    placeholder={item.desc}></ReactInput>
                                    </li>);
                                break;
                            default:
                                break;
                        }
                    });
                    return <ul onClick={this.formClick}>{liList}</ul>;
                    break;
                case "checkbox":
                    // item是tags,其他传递也这样传递,k => v v is string or object,if object no display must be pass false
                    var liList = [];
                    var typeDef = Object.prototype.toString;
                    $.each(this.state.item, function (key, value) {
                        var checked = (value.display === false) ? false : true;
                        var label = (typeDef.call(value) === "[object Object]") ? value.title : value;
                        liList.push(<li><ReactCheckbox ref={key} key={key} name={key} checked={checked} label={label}></ReactCheckbox></li>);
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
                    btnList.push(<button data-name="cancel" className="mb-sm btn btn-primary">确定</button>);
                    break;
                default:
                    btnList.push(<button data-name="ok" className="mb-sm btn btn-primary">确定</button>);
                    btnList.push(<button data-name="cancel"  className="mb-sm btn btn-danger">取消</button>);
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
            if (this.close) {
                this.close = false;
                return null;
            }
            $('#modal').css({height: '100%'});
            return (
                <div id="modal">
                    <div ref="reactModal" className="my-prompt" draggable='true' onClick={this.handleClick}
                        onDrag={this.handleDrag}
                        onDragEnd={this.handleDragEnd}>
                        <div data-name="cancel" className="title"></div>
                        {this.generateModal()}
                        <div className="modalOperate">
                            <div>{this.generateBtn()}</div>
                        </div>
                    </div>
                </div>
            );
        }
});

module.exports = ReactModal;
