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
import DatePicker from 'antd/lib/date-picker';
import Select from 'antd/lib/select';
import {Panel, Col} from 'react-bootstrap';
const Option = Select.Option;
require('!style!css!sass!../sass/app/_reactForm.scss');
export default class ReactForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            refresh: 0
        };
        this.params = {};
    }
    generateFormUI() {
        let formList = [];
        let formConfig = this.props.config && this.props.config.formConfig ? this.props.config.formConfig : [];
        let formData = this.props.formData ? this.props.formData : {};
        let self = this;
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
                                handleChange={self.handleChange.bind(self, item.ref)}/>
                        </Col>
                    </div>);
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

                    break;
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
        let strHeader = this.props.config && this.props.config.title ? this.props.config.title : '';
        return (
                <Panel header={strHeader}>
                    <form className="form-horizontal">
                        {this.generateFormUI()}
                    </form>
                </Panel>
        );
    }
}
