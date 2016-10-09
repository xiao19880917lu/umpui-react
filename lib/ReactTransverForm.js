/**
 * @file 横向的FORM表单
 * @author luyongfang@baidu.com
 * */
import React from 'react';
import ReactDOM from 'react-dom';
import ReactInput from './ReactInput.js';
import ReactCheckbox from './ReactCheckbox.js';
import {Panel, Col, Row} from 'react-bootstrap';
import DatePicker from 'antd/lib/date-picker';
import Button from 'antd/lib/button';
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
        this.initData(props.config.formConfig);
    }
    // 重置表单数据
    initData(cfg) {
        let formCfg = cfg ? cfg : this.props.config.formConfig;
        this.params = {};
        for (let k of formCfg) {
            this.params[k.ref] = k.defaultValue ? k.defaultValue : '';
        }
    }
    generateTransverFormUI() {
        let self = this;
        // console.log(this.params);
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
            // let defaultValue = item.defaultValue != null ? item.defaultValue : '';
            // self.params[item.ref] = defaultValue;
            switch (item.type) {
                case 'input':
                    colList.push(<Col lg = {colClass} key={item.ref + dex}>
                        <label className={className}>{item.label}</label>
                        <ReactInput ref={item.ref} type={item.inputType} name={item.ref}
                             placeholder={item.placeholder}
                             defaultValue={self.params[item.ref]}
                             value={self.params[item.ref]}
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
                                ref={item.ref} name={item.ref}
                                // defaultValue={self.params[item.ref]}
                                value={self.params[item.ref]}
                                onChange={self.handleChange.bind(self, item.ref)}>
                            {opList}
                            </Select>
                        </Col>);
                    break;
                case 'datetime':
                    colList.push(<Col lg = {colClass} key={item.ref + dex}>
                        <label className={className}>{item.label}</label>
                        <div><DatePicker showTime format="yyyy-MM-dd HH:mm:ss" name={item.ref}
                            value={self.params[item.ref]}
                            ref={item.ref} placeholder="请选择时间"
                            onChange={self.handleChange.bind(self, item.ref)}/></div>
                        </Col>);
                    break;
                case 'checkbox':
                    (self.params[item.ref] === '') && (self.params[item.ref] = item.checked);
                    colList.push(<Col lg = {colClass} key={item.ref + dex}>
                        <label className={className}>{item.label}</label>
                        <ReactCheckbox checked={self.params[item.ref]}
                            value={self.params[item.ref]}
                            handleChange={self.handleChange.bind(self, item.ref)}/>
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
    clearValues() {
        this.initData();
        this.forceUpdate();
        this.props.onClear && this.props.onClear();
    }
    submitValues() {
        // console.log(this.params);
        this.props.onSubmit && this.props.onSubmit(this.params);
    }

    /**
     * 表单值变化时
     * @param  {string} ref        自定义传入的值，用于区分是哪个值发生了变化
     * @param  {string} val        组件默认传入的值，input、select等传入
     * @param  {string} dataString 组件默认传入的值，只有datetime传入，其他组件没有
     */
    handleChange(ref, val, dataString) {
        // console.log(ref, val, dataString);
        this.params[ref] = dataString ? dataString : val;
        this.props.onFormChange && this.props.onFormChange(this.params);
        this.forceUpdate();
    }
    getFormValues() {
        return this.params;
    }
    generateButton() {
        let self = this;
        let buttonsCfg = this.props.config.button;
        if (buttonsCfg === undefined) {
            return;
        }
        let buttons = [];
        buttonsCfg.map((e, index) => {
            if (e.action !== undefined) {
                switch (e.action) {
                    case 'submit':
                        buttons.push(<Button {...e}
                                onClick={this.submitValues.bind(this)}>
                                {e.value}
                                </Button>);
                        break;
                    case 'clear':
                        buttons.push(<Button {...e}
                                onClick={this.clearValues.bind(this)}>
                                {e.value}
                                </Button>);
                        break;
                    default:
                        buttons.push(<Button {...e}>
                                {e.value}
                                </Button>);
                        break;
                }
            } else {
                buttons.push(<Button {...e}>
                        {e.value}
                        </Button>);
            }
        });
        return (
            <div className='form-buttons'>
                {buttons}
            </div>
        );
    }
    render() {
        return (
                <Panel header={this.props.config.title}>
                    <form className="form-horizontal transver-form">
                        {this.generateTransverFormUI()}
                        {this.generateButton()}
                        {this.props.children && this.props.children}
                    </form>
                </Panel>
        );
    }
}
