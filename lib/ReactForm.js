/**
 * @file NOC顶部
 * @author luyongfang@baidu.com
 * */
var React = require('react');
var ReactDOM = require('react-dom');
import{Panel, Col, Input} from 'react-bootstrap';
require('!style!css!sass!../sass/app/_reactForm.scss');
var ReactForm = React.createClass({
    getInitialState: function () {
        return {
            refresh: 0
        };
    },
    componentWillMount: function () {
    },
    componentDidMount: function () {
    },
    componentWillUnmount: function () {
    },
    generateFormUI: function () {
        var formList = [];
        var formConfig = this.props.config.formConfig;
        formConfig.map(function (item, dex) {
            var className = item.fill ? 'col-lg-2 control-label fill' : 'col-lg-2 control-label';
            switch (item.type) {
                case 'input':

                    formList.push(<div key={dex} className="form-group">
                        <label className={className}>{item.label}</label>
                        <Col lg={ 10 }>
                            <Input ref={item.ref} standalone type={item.inputType} name={item.ref}
                                placeholder={item.placeholder} className="form-control" />
                        </Col>
                    </div>);
                    break;
                case 'select':
                    var opList = [];
                    for (var i in item.opMap) {
                        if (item.opMap.hasOwnProperty(i)) {
                            opList.push(<option key={'option' + i} value={i}>{item.opMap[i]}</option>);
                        }
                    }
                    formList.push(<div className="form-group">
                        <label className={className}>{item.label}</label>
                        <Col lg={ 10 }>
                            <Input ref={item.ref} standalone type="select" name={item.ref} className="form-control m-b">
                            {opList}
                            </Input>
                        </Col>
                    </div>);
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
        console.log(1234);
        return (
                <Panel header={this.props.config.title}>
                    <form className="form-horizontal">
                        {this.generateFormUI()}
                    </form>
                </Panel>
        );
    }
});

module.exports = ReactForm;
