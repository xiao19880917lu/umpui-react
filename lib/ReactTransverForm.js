/**
 * @file NOC顶部
 * @author luyongfang@baidu.com
 * */
var React = require('react');
var ReactDOM = require('react-dom');
var DateTimeField = require('react-bootstrap-datetimepicker');
import {Panel, Col, Row, Input} from 'react-bootstrap';
require('!style!css!sass!../sass/app/_reactTransverForm.scss');
var ReactTransverForm = React.createClass({
    getInitialState: function () {
        return {
            refresh: 0
        };
    },
    generateTransverFormUI: function () {
        var formList = [];
        var formConfig = this.props.config.formConfig;
        // 设置没行显示几个查询条件
        var lineNum = this.props.config.lineNum ? this.props.config.lineNum : 3;
        var startNum = 0;
        var colClass = Math.floor(12 / lineNum);
        var colList = [];
        var len = formConfig.length;
        formConfig.map(function (item, dex) {
            // 该项是否必须填写, 如果必须则后面有红色的*号
            var className = item.fill ? 'fill' : '';
            if ((startNum % lineNum) === 0 && startNum !== 0) {
                // 如果是第一个元素或者是新行开始
                colList = [];
            }
            switch (item.type) {
                case 'input':
                    colList.push(<Col lg = {colClass}>
                        <label className={className}>{item.label}</label>
                        <Input ref={item.ref} standalone type={item.inputType} name={item.ref}
                            placeholder={item.placeholder} className="form-control" />
                        </Col>);
                    break;
                case 'select':
                    var opList = [];
                    for (var i in item.opMap) {
                        if (item.opMap.hasOwnProperty(i)) {
                            opList.push(<option key={'option' + i} value={i}>{item.opMap[i]}</option>);
                        }
                    }
                    colList.push(<Col lg={ colClass }>
                        <label className={className}>{item.label}</label>
                            <Input ref={item.ref} standalone type="select" name={item.ref} className="form-control m-b">
                            {opList}
                            </Input>
                        </Col>);
                    break;
                case 'datetime':
                    colList.push(<Col lg = {colClass}>
                        <label className={className}>{item.label}</label>
                        <DateTimeField ref={item.ref} name={item.ref} standalone/>
                        </Col>);
                    break;
            }
            startNum++;
            if (((startNum % lineNum) === 0) || (startNum === len)) {
                formList.push(<Row>{colList}</Row>);
            }
        });
        return formList;
    },
    getFormValues: function () {
        var refs = this.refs;
        var params = {};
        for (var key in refs) {
            if (refs.hasOwnProperty(key)) {
                params[key] = this.refs[key].getValue();
            }
        }
        return params;
    },
    render: function () {
        console.log(1234);
        return (
                <Panel header={this.props.config.title}>
                    <form className="form-horizontal transver-form">
                        {this.generateTransverFormUI()}
                    </form>
                </Panel>
        );
    }
});

module.exports = ReactTransverForm;
