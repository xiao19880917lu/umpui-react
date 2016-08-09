/**
 * @file NOC顶部
 * @author luyongfang@baidu.com
 * @props {
 *  formConfig: [{},{}]  每个面板Form表单的配置
 *  formData : 当前面板的对应的数据{k:v} 其中k对应的是fromConfig中的ref
 * }
 * */
import React from 'react';
import ReactDOM from 'react-dom';
import ReactInput from './ReactInput.js';
import ReactCheckbox from './ReactCheckbox.js';
import DatePicker from 'antd/lib/date-picker';
import Select from 'antd/lib/select';
import {Panel, Col} from 'react-bootstrap';
const Option = Select.Option;
require('!style!css!sass!../sass/app/_reactForm.scss');
export default class ReactForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            refresh: 0,
            multiFirstSelect: 1,
            multiSecondSelect: 0,
            firstSelect: 1,
            secondSelect: 0
        };

        this.params = {};
        this.typeList = [];
    }
    componentDidMount() {
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            config: nextProps.config,
            multiFirstSelect: 1,
            firstSelect: 1,
            secondSelect: 0
        });
    }

    /**
     * multiSelect(二级类型为多选时)一级类型变化触发操作
     * @param {Object} data MultiSelect类型表单配置
     * @param {string} value 一级类型值
     * @param {string} dataString 一级类型设定值，可选
     */
    handleMultiFirstChange(data, value, dataString) {
        this.params[data.ref + '1'] = dataString ? dataString : value;
        this.setState({
            multiFirstSelect: value
        });
    }

    /**
     * multiSelect(二级类型为多选时)二级类型变化触发操作
     * @param {Object} ref MultiSelect类型表单配置中ref值
     * @param {string} value 二级类型值
     * @param {string} dataString 二级类型设定值，可选
     */
    handleMultiSecondChange(ref, value, dataString) {
        this.params[ref] = dataString ? dataString : value;
        this.setState({
            multiSecondSelect: value
        });
    }

    /**
     * multiSelect(二级类型为单选时)一级类型变化触发操作
     * @param {Object} data MultiSelect类型表单配置
     * @param {string} value 一级类型值
     * @param {string} dataString 一级类型设定值，可选
     */
    handleFirstChange(data, value, dataString) {
        this.params[data.ref + '1'] = dataString ? dataString : value;
        this.setState({
            firstSelect: value,
            secondSelect: Object.keys(data.SecondMap[value])[0]
        });
    }

    /**
     * multiSelect(二级类型为单选时)二级类型变化触发操作
     * @param {Object} ref MultiSelect类型表单配置中ref值
     * @param {string} value 二级类型值
     * @param {string} dataString 二级类型设定值，可选
     */
    handleSecondChange(ref, value, dataString) {
        this.params[ref] = dataString ? dataString : value;
        this.setState({
            secondSelect: value
        });
    }
    generateFormUI() {
        let formList = [];
        let formConfig = this.props.config && this.props.config.formConfig ? this.props.config.formConfig : [];
        let formData = this.props.formData ? this.props.formData : {};
        let self = this;
        self.typeList = [];
        formConfig.map(function (item, dex) {
            let className = item.fill ? 'col-lg-2 control-label fill' : 'col-lg-2 control-label';
            let defaultValue = item.defaultValue != null ? item.defaultValue : '';
            defaultValue = formData[item.ref] ? formData[item.ref] : defaultValue;
            self.params[item.ref] = defaultValue;
            switch (item.type) {
                case 'input':
                    formList.push(<div key={item.ref + dex} className="form-group">
                        <label className={className}>{item.label}</label>
                        <Col lg={ 10 }>
                            <ReactInput ref={item.ref} type={item.inputType} name={item.ref}
                            placeholder={item.placeholder} defaultValue={defaultValue}
                            maxlength={item.maxLength} handleChange={self.handleChange.bind(self, item.ref)} />
                        </Col>
                    </div>);
                    self.typeList.push(item);
                    break;
                case 'select':
                    let opList = [];
                    for (let i in item.opMap) {
                        if (item.opMap.hasOwnProperty(i)) {
                            opList.push(<Option key={'option' + i} value={i}>
                                {item.opMap[i]}</Option>);
                        }
                    }
                    formList.push(<div className="form-group" key={item.ref + dex}>
                        <label className={className}>{item.label}</label>
                        <Col lg={ 10 }>
                            <Select  optionFilterProp="children" notFoundContent="无法找到"
                                ref={item.ref} name={item.ref} defaultValue={defaultValue}
                                onChange={self.handleChange.bind(self, item.ref)}>
                            {opList}
                            </Select>
                        </Col>
                    </div>);
                    self.typeList.push(item);
                    break;
                case 'multiSelect':
                    let firstOptions = [];
                    let secondOptions = [];
                    let defaultValue = item.defaultValue != null ? item.defaultValue : '';
                    // isMulti 二级类型是否为多选
                    if (item && item.isMulti) {
                        for (let first in item.FirstMap) {
                            if (item.FirstMap.hasOwnProperty(first)) {
                                firstOptions.push(<Option key={first}>{item.FirstMap[first]}</Option>);
                            }
                        }
                        // 一级类型默认
                        let defaultFirst = Object.keys(item.FirstMap)[0];
                        // 二级类型下拉菜单内容
                        let secondSelected = item.SecondMap[self.state.multiFirstSelect] !== undefined
                        ? item.SecondMap[self.state.multiFirstSelect] : item.SecondMap[defaultFirst];
                        for (let second in secondSelected) {
                            if (secondSelected.hasOwnProperty(second)) {
                                secondOptions.push(<Option key={second}>{secondSelected[second]}</Option>);
                            }
                        }
                        formList.push(<div className="form-group" key={item.ref + dex}>
                        <label className={className}>{item.label}</label>
                        <Col lg={ 10 }>
                            <Select optionFilterProp="children" notFoundContent="无法找到"
                                ref={item.ref + dex} name={item.ref} defaultValue = {defaultFirst}
                                onChange={self.handleMultiFirstChange.bind(self, item)}>
                                {firstOptions}
                            </Select>
                        </Col>
                        </div>);
                        formList.push(<div className="form-group" key={item.ref}>
                        <label className={className}>二级类型</label>
                        <Col lg={ 10 }>
                            <Select multiple optionFilterProp="children" notFoundContent="无法找到"
                            ref={item.ref} name={item.ref}
                            onChange={self.handleMultiSecondChange.bind(self, item.ref)}>
                            {secondOptions}
                        </Select>
                        </Col>
                        </div>);
                    } else {
                        for (let first in item.FirstMap) {
                            if (item.FirstMap.hasOwnProperty(first)) {
                                firstOptions.push(<Option key={first}>{item.FirstMap[first]}</Option>);
                            }
                        }
                        // defaultValue0为默认一级类型
                        let defaultValue0 = formData[item.ref + '1'] ? formData[item.ref + '1'] + '' : defaultValue;
                        // defaultValue1为默认二级类型
                        let defaultValue1 = formData[item.ref] ? formData[item.ref] + '' : defaultValue;
                        // 二级下拉菜单显示内容
                        let secondSelected = item.SecondMap[self.state.firstSelect] !== undefined
                        ? item.SecondMap[self.state.firstSelect] : item.SecondMap[defaultValue0];
                        for (let second in secondSelected) {
                            if (secondSelected.hasOwnProperty(second)) {
                                secondOptions.push(<Option key={second}>{secondSelected[second]}</Option>);
                            }
                        }
                        formList.push(<div className="form-group" key={item.ref + dex}>
                        <label className={className}>{item.label}</label>
                        <Col lg={ 10 }>
                            <Select optionFilterProp="children" notFoundContent="无法找到"
                                ref={item.ref + dex} name={item.ref} defaultValue={defaultValue0}
                                onChange={self.handleFirstChange.bind(self, item)}>
                                {firstOptions}
                            </Select>
                        </Col>
                        </div>);
                        formList.push(<div className="form-group" key={item.ref}>
                        <label className={className}>二级类型</label>
                        <Col lg={ 10 }>
                            <Select optionFilterProp="children" notFoundContent="无法找到"
                                ref={item.ref} name={item.ref} defaultValue={defaultValue1}
                                value={self.state.secondSelect === 0 ? defaultValue1 : self.state.secondSelect}
                                onChange={self.handleSecondChange.bind(self, item.ref)}>
                                {secondOptions}
                            </Select>
                        </Col>
                        </div>);
                    }
                    self.typeList.push(item);
                    break;
                case 'datetime':
                    formList.push(<div className="form-group" key={item.ref + dex}>
                        <label className={className}>{item.label}</label>
                        <Col lg={ 10 }>
                            <div>
                                <DatePicker showTime format="yyyy-MM-dd HH:mm:ss" name={item.ref}
                                    ref={item.ref} placeholder="请选择时间"
                                    onChange={self.handleChange.bind(self, item.ref)}/>
                            </div></Col></div>);
                    self.typeList.push(item);
                    break;
                case 'checkbox':
                    self.params[item.ref] = item.checked;
                    formList.push(<div className="form-group" key={item.ref + dex}>
                        <label className={className}>{item.label}</label>
                        <Col lg={ 10 }>
                            <ReactCheckbox checked={item.checked}
                            handleChange={self.handleChange.bind(self, item.ref)}/>
                        </Col></div>);
                    // self.typeList.push(item);
                    break;
                case 'list':
                    let articleList = [];
                    for (let i in item.list) {
                        if (item.list.hasOwnProperty(i)) {
                            if (item.trashIcon) {
                                articleList.push(<article><div>{item.list[i]}</div><div><label>
                                <span className='cursor-pointer'><i className="fa fa-trash-o"
                                 onClick={self.handleTrash.bind(self, item.list[i])}></i></span>
                                </label></div></article>);
                            } else {
                                articleList.push(<article><div>item.list[i]</div></article>);
                            }
                        }
                    }
                    formList.push(<div key={item.ref + dex}><div className="opmDashboardAddedWidgetsList"
                    id="dashboards_list">{articleList}</div></div>);
                    self.typeList.push(item);
                    break;
            }
        });
        return formList;
    }
    handleChange(ref, val, dataString) {
        this.params[ref] = dataString ? dataString : val;
    }
    getFormValues() {
        let typeList = this.typeList;
        for (let i in typeList) {
            if (typeList.hasOwnProperty(i)) {
                switch (typeList[i].type) {
                    case 'input':
                        if (this.refs[typeList[i].ref] && this.refs[typeList[i].ref].state.value)
                        {
                            this.params[typeList[i].ref] = this.refs[typeList[i].ref].state.value;
                        }
                        break;
                    case 'multiSelect':
                        if (this.state && this.state.multiSecondSelect.length !== 0) {
                            this.params[typeList[i].ref] = this.state.multiSecondSelect;
                        }
                        if (this.state && this.state.secondSelect.length !== 0) {
                            this.params[typeList[i].ref] = this.state.secondSelect;
                        };
                        break;
                }
            }
        }
        return this.params;
    }
    handleRemove() {
        this.props.onCancel();
    }
    handleTrash(dashboard) {
        this.props.onDelete(dashboard);
    }
    render() {
        let strHeader = <span>{this.props.config && this.props.config.title
        ? this.props.config.title : ''}{this.props.config && this.props.config.removeIcon
        ? <span className='cursor-pointer'><i onClick={this.handleRemove.bind(this)}
         className='fa fa-times right-remove'></i></span> : ''}</span>;
        return (
                <Panel header={strHeader}>
                    <form className="form-horizontal">
                        {this.generateFormUI()}
                    </form>
                </Panel>
        );
    }
}
