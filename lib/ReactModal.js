/**
 * @file NOC顶部
 * @author luyongfang@baidu.com
 * */
var React = require('react');
var ReactDOM = require('react-dom');
var ReactInput = require('./ReactInput.js');
var ReactSelect = require('./ReactSelect.js');
var ReactCheckbox = require('./ReactCheckbox.js').default;
import{Panel, Input} from 'react-bootstrap';
import {Selected} from 'amazeui-react';
require("!style!css!sass!../sass/app/_modal.scss");
var ReactModal = React.createClass({
        close: false,
        getInitialState: function () {
            return {
                refresh: 0
            };
        },
        componentWillMount: function () {
            $('#modal').css({height: '100%'});
            console.log('ReactModal will mount');
        },
        componentDidMount: function () {
            console.log('ReactModal didMount');
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
                if (this.props.data) {
                    var params = $.extend({}, this.props.data, params, true);
                }
                this.props.handleModalClick && this.props.handleModalClick(this.props.item, params);
                this.close = true;
                this.setState({refresh: this.state.refresh++});
            }else {
                this.props = null;
                this.close = true;
                this.setState({refresh: this.state.refresh++});
            }

        },
        formClick: function (event) {
            event.preventDefault();
            event.stopPropagation();
        },
        generateModal: function () {
            switch (this.props.modalCon.type) {
                case 'tip':
                case 'warning':
                    return <div className="tip">{this.props.modalCon.msg}</div>;
                    break;
                case 'form':
                    var liList = [];
                    $.each(this.props.item.config, function (dex, item) {
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
                    $.each(this.props.item, function (key, value) {
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
            switch (this.props.modalCon.type) {
                case 'warning':
                    btnList.push(<button data-name="cancel" className="mb-sm btn btn-primary">确定</button>);
                    break;
                default:
                    btnList.push(<button data-name="cancel"  className="mb-sm btn btn-danger">取消</button>);
                    btnList.push(<button data-name="ok" className="mb-sm btn btn-primary">确定</button>);
                    break;
            }
            return btnList;
        },
        render: function () {
            if (this.close) {
                this.close = false;
                return null;
            }
            $('#modal').css({height: '100%'});
            return (
                    <div id="modal">
                        <div className="my-prompt" onClick={this.handleClick}>
                            <div data-name="cancel" className="title"></div>
                            {this.generateModal()}
                            <div className="modalOperate">
                                {this.generateBtn()}
                            </div>
                        </div>
                    </div>
               );
        }
});

module.exports = ReactModal;
