/**
 * @file NOC顶部
 * @author luyongfang@baidu.com
 * @props {
 *  formConfig: [{},{}]  每个面板Form表单的配置
 *  formData : 当前面板的对应的数据{k:v} 其中k对应的是fromConfig中的ref
 * }
 * */
var React = require('react');
var ReactDOM = require('react-dom');
var DateTimeField = require('react-bootstrap-datetimepicker');
import {Panel, Col, Input} from 'react-bootstrap';
require('!style!css!sass!../sass/app/_reactForm.scss');
var ReactForm = React.createClass({
    getInitialState: function () {
        return {
            refresh: 0
        };
    },
    generateFormUI: function () {
        var formList = [];
        var formConfig = this.props.config && this.props.config.formConfig ? this.props.config.formConfig : [];
        var formData = this.props.formData ? this.props.formData : {};
        var self = this;
        formConfig.map(function (item, dex) {
            var className = item.fill ? 'col-lg-2 control-label fill' : 'col-lg-2 control-label';
            var defaultVal = formData[item.ref] ? formData[item.ref] : '';
            switch (item.type) {
                case 'input':

                    formList.push(<div key={item.ref + dex} className="form-group">
                        <label className={className}>{item.label}</label>
                        <Col lg={ 10 }>
                            <Input ref={item.ref} standalone type={item.inputType} name={item.ref}
                                placeholder={item.placeholder} className="form-control"
                                defaultValue={defaultVal}/>
                        </Col>
                    </div>);
                    break;
                case 'select':
                    var opList = [];
                    for (var i in item.opMap) {
                        if (item.opMap.hasOwnProperty(i)) {
                            opList.push(<option key={'option' + i} value={i}>
                                {item.opMap[i]}</option>);
                        }
                    }
                    formList.push(<div className="form-group" key={item.ref + dex}>
                        <label className={className}>{item.label}</label>
                        <Col lg={ 10 }>
                            <Input ref={item.ref} standalone type="select" name={item.ref} defaultValue={defaultVal}
                            className="form-control m-b">
                            {opList}
                            </Input>
                        </Col>
                    </div>);
                    break;
                case 'datetime':
                    let defaultVal = '2016-05-17';
                    if (item.viewMode === 'date') {
                        !defaultVal && (defaultVal = '2016-05-17');
                        var props = {
                            viewMode: 'date',
                            format: 'YYYY-MM-DD',
                            inputFormat: 'YYYY-MM-DD'
                        };
                    } else {
                        !defaultVal && (defaultVal = '2016-05-17 00:00:00');
                        var props = {
                            viewMode: 'datetime',
                            format: 'YYYY-MM-DD HH:mm:ss',
                            inputFormat: 'YYYY-MM-DD HH:mm:ss'
                        };
                    }
                    formList.push(<div className="form-group" key={item.ref + dex}>
                        <label className={className}>{item.label}</label>
                        <Col lg={ 10 }>
                            <DateTimeField ref={item.ref} {...props} name={item.ref}
                            defaultText={'请选择时间'} defaultValue={defaultVal}/>
                        </Col></div>);

                    break;
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
    clearFormValues: function () {

    },
    render: function () {
        var strHeader = this.props.config && this.props.config.title ? this.props.config.title : '';
        return (
                <Panel header={strHeader}>
                    <form className="form-horizontal">
                        {this.generateFormUI()}
                    </form>
                </Panel>
        );
    }
});

module.exports = ReactForm;
