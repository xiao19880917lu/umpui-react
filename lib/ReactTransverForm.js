/**
 * @file 横向的FORM表单
 * @author luyongfang@baidu.com
 * */
import React from 'react';
import ReactDOM from 'react-dom';
import ReactInput from './ReactInput.js';
import {Panel, Col, Row} from 'react-bootstrap';
import DatePicker from 'antd/lib/date-picker';
import Select from 'antd/lib/select';
const Option = Select.Option;
// let DateTimeField = require('react-bootstrap-datetimepicker');
require('!style!css!sass!../sass/app/_reactTransverForm.scss');
export default class ReactTransverForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            refresh: 0
        };
        this.params = {};
    }
    generateTransverFormUI() {
        let self = this;
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
            let defaultValue = item.defaultValue != null ? item.defaultValue : '';
            switch (item.type) {
                case 'input':
                    colList.push(<Col lg = {colClass} key={item.ref + dex}>
                        <label className={className}>{item.label}</label>
                        <ReactInput ref={item.ref} type={item.inputType} name={item.ref}
                             placeholder={item.placeholder} defaultValue={item.defaultValue}
                             handleChange={self.handleChange.bind(self, item.ref)}/>
                        </Col>);
                    break;
                case 'select':
                    let opList = [];
                    for (let i in item.opMap) {
                        if (item.opMap.hasOwnProperty(i)) {
                            opList.push(<Option key={'option' + i} value={i}>{item.opMap[i]}</Option>);
                        }
                    }
                    colList.push(<Col lg={ colClass } key={item.ref + dex}>
                        <label className={className}>{item.label}</label>
                            <Select  optionFilterProp="children" notFoundContent="无法找到"
                                ref={item.ref} name={item.ref} defaultValue={defaultValue}
                                onChange={self.handleChange.bind(self, item.ref)}>
                            {opList}
                            </Select>
                        </Col>);
                    break;
                case 'datetime':
                    colList.push(<Col lg = {colClass} key={item.ref + dex}>
                        <label className={className}>{item.label}</label>
                        <div><DatePicker showTime format="yyyy-MM-dd HH:mm:ss" name={item.ref}
                            ref={item.ref} placeholder="请选择时间" defaultValue={defaultValue}
                            onChange={self.handleChange.bind(self, item.ref)}/></div>
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
    handleChange(ref, val, dataString) {
        this.params[ref] = dataString ? dataString : val;
    }
    getFormValues() {
        console.log(this.params);
        return this.params;
        /*let refs = this.refs;
        for (let key in refs) {
            if (refs.hasOwnProperty(key)) {
                this.params[key] = this.refs[key].getValue();
            }
        }*/
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
