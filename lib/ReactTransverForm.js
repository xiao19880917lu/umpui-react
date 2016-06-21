/**
 * @file 横向的FORM表单
 * @author luyongfang@baidu.com
 * */
import React from 'react';
import ReactDOM from 'react-dom';
import ReactInput from './ReactInput.js';
import {Panel, Col, Row, Input} from 'react-bootstrap';
let DateTimeField = require('react-bootstrap-datetimepicker');
require('!style!css!sass!../sass/app/_reactTransverForm.scss');
export default class ReactTransverForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            refresh: 0
        };
    }
    generateTransverFormUI() {
        let formList = [];
        let formConfig = this.props.config.formConfig;
        // 设置没行显示几个查询条件
        let lineNum = this.props.config.lineNum ? this.props.config.lineNum : 3;
        let startNum = 0;
        let colClass = Math.floor(12 / lineNum);
        let colList = [];
        let len = formConfig.length;
        formConfig.map(function (item, dex) {
            // 该项是否必须填写, 如果必须则后面有红色的*号
            let className = item.fill ? 'fill' : '';
            if ((startNum % lineNum) === 0 && startNum !== 0) {
                // 如果是第一个元素或者是新行开始
                colList = [];
            }
            switch (item.type) {
                    // bootstrap废弃<Input ref={item.ref} standalone type={item.inputType} name={item.ref}
                    //    placeholder={item.placeholder} className="form-control" />
                case 'input':
                    colList.push(<Col lg = {colClass} key={item.ref + dex}>
                        <label className={className}>{item.label}</label>
                        <ReactInput ref={item.ref} type={item.inputType} name={item.ref}
                             placeholder={item.placeholder} className=""/>
                        </Col>);
                    break;
                case 'select':
                    let opList = [];
                    for (let i in item.opMap) {
                        if (item.opMap.hasOwnProperty(i)) {
                            opList.push(<option key={'option' + i} value={i}>{item.opMap[i]}</option>);
                        }
                    }
                    colList.push(<Col lg={ colClass } key={item.ref + dex}>
                        <label className={className}>{item.label}</label>
                            <Input ref={item.ref} standalone type="select" name={item.ref} className="form-control m-b">
                            {opList}
                            </Input>
                        </Col>);
                    break;
                case 'datetime':
                    colList.push(<Col lg = {colClass} key={item.ref + dex}>
                        <label className={className}>{item.label}</label>
                        <DateTimeField ref={item.ref} name={item.ref} standalone/>
                        </Col>);
                    break;
            }
            startNum++;
            if (((startNum % lineNum) === 0) || (startNum === len)) {
                formList.push(<Row key={'row' + startNum}>{colList}</Row>);
            }
        });
        return formList;
    }
    getFormValues() {
        let refs = this.refs;
        let params = {};
        for (let key in refs) {
            if (refs.hasOwnProperty(key)) {
                params[key] = this.refs[key].getValue();
            }
        }
        return params;
    }
    render() {
        return (
                <Panel header={this.props.config.title}>
                    <form className="form-horizontal transver-form">
                        {this.generateTransverFormUI()}
                    </form>
                </Panel>
        );
    }
}
