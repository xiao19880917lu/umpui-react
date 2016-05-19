/**
 * @file form表单-分步骤完成
 * @author luyongfang
 * **/
var React = require('react');
var ReactDOM = require('react-dom');
var ReactForm = require('./ReactForm.js');
require('!style!css!sass!../sass/app/_reactSliderForm.scss');
class FormSlider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 0,
            valid: 0,
            errMsg: '',
            storeData: this.props.data ? this.props.data : [],
            sliderConfig: this.props.formConfig ? this.props.formConfig : {}
        };
    }
    getVal() {
        return this.state.storeData;
    }
    handlePreClick(event) {
        if (this.state.step > 0) {
            var curFormData = this.refs.formSlider.getFormValues();
            this.state.storeData[this.state.step] = curFormData;
            this.setState({step: this.state.step - 1});
        }
    }
    handleNextClick(event) {
        // 确定每个步骤中不能有相同的ref 配置
        var sliderStepsConfig = this.state.sliderConfig.sliderStepsConfig;
        var len = sliderStepsConfig ? sliderStepsConfig.length : 0;
        var curFormData = this.refs.formSlider.getFormValues();
        var errMsg = this.validateParams(curFormData);
        if (errMsg.length === 0) {
            this.state.storeData[this.state.step] = curFormData;
            if (this.state.step !== (len - 1)) {
                this.setState({step: this.state.step + 1, storeData: this.state.storeData, errMsg: ''});
            } else if (this.state.step === (len - 1)) {
                // 最后一步提交按钮
                this.props.submit && this.props.submit(this.state.storeData);
                this.setState({step: this.state.step + 1, errMsg: ''});
            }
        } else {
            this.setState({valid: this.state.valid + 1, errMsg: errMsg.join(',')});
        }
    }
    validateParams(curFormData) {
        var sliderStepsConfig = this.state.sliderConfig.sliderStepsConfig;
        var curStepCfg = sliderStepsConfig[this.state.step];
        var len = curStepCfg['formConfig'] ? curStepCfg['formConfig'].length : 0;
        var errMsg = [];
        for (var i = 0; i < len; i++) {
            // 如有有配置valid，则需要校验
            var str = '';
            var curStep = curStepCfg['formConfig'][i];
            if (curStep['validate'] && curStep['validate']['preg']) {
                var objPreg = new RegExp(curStep['validate']['preg']);
                if (!objPreg.test(curFormData[curStep['ref']])) {
                    str += curStep['label'] + curStep['validate']['errMsg'];
                }

            } else if (curStep['fill'] && !curFormData[curStep['ref']]) {
                str += curStep['label'] + '不能为空';
            }
            str && errMsg.push(str);
        }
        return errMsg;
    }
    cancel() {
        var sliderStepsConfig = this.state.sliderConfig.sliderStepsConfig;
        var len = sliderStepsConfig.length;
        this.setState({step: len});
    }
    preBtnGenerator() {
        if (this.state.step !== 0) {
            return (
                <div className="btnCon"><span className="am-btn am-btn-secondary"
                onClick={this.handlePreClick.bind(this)}>上一步</span></div>
            );
        }
    }
    nextBtnGenerator(totalSteps) {
        if (this.state.step === totalSteps - 1) {
            var strText = '提交';
        } else {
            var strText = '下一步';
        }
        return (
            <div className="btnCon"><span className="am-btn am-btn-secondary"
            onClick={this.handleNextClick.bind(this)}>{strText}</span>
            <span className="am-btn am-btn-warning" onClick={this.cancel.bind(this)}>取消</span>
            </div>
        );
    }
    btnGenerator(totalSteps) {
        var spanList = [];
        if (this.state.step !== 0 && this.props.formConfig.preBtn !== false) {
            spanList.push(<span className="am-btn am-btn-secondary"  key={'prestep'}
                    onClick={this.handlePreClick.bind(this)}>上一步</span>);
        }
        if (this.state.step === totalSteps - 1) {
            var strText = '提交';
        } else {
            var strText = '下一步';
        }
        spanList.push(<span className="am-btn am-btn-secondary"  key={'nextstep'}
                onClick={this.handleNextClick.bind(this)}>{strText}</span>);
        spanList.push(<span className="am-btn am-btn-warning"  key={'cancelstep'}
                onClick={this.cancel.bind(this)}>取消</span>);
        return (
            <div className="btnContainer"><div className="wrap">{spanList}</div></div>
        );
    }
    render() {
        var sliderStepsConfig = this.state.sliderConfig.sliderStepsConfig;
        var formConfig = sliderStepsConfig[this.state.step];
        var formData = this.state.storeData[this.state.step];
        var len = sliderStepsConfig.length;
        var strText = this.state.step === len - 1 ? '确定' : 'NEXT';
        var style = {
            display: 'block'
        };
        if (!sliderStepsConfig || this.state.step === len) {
            var style = {
                display: 'none'
            };
        }
        return (<div className="sliderForm" style={style}>
            <div className="errMsg">{this.state.errMsg}</div>
            <ReactForm ref="formSlider" config={formConfig} formData={formData} />
            {this.btnGenerator(len)}
        </div>);
    }

};
export default FormSlider;
