/**
 * @file form表单-分步骤完成
 * @author luyongfang
 * **/
import React from 'react';
import ReactDOM from 'react-dom';
import ReactForm from './ReactForm.js';
require('!style!css!sass!../sass/app/_reactSliderForm.scss');
export default class FormSlider extends React.Component {
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
            let curFormData = this.refs.formSlider.getFormValues();
            this.state.storeData[this.state.step] = curFormData;
            this.setState({step: this.state.step - 1});
        }
    }
    handleNextClick(event) {
        // 确定每个步骤中不能有相同的ref 配置
        let sliderStepsConfig = this.state.sliderConfig.sliderStepsConfig;
        let len = sliderStepsConfig ? sliderStepsConfig.length : 0;
        let curFormData = this.refs.formSlider.getFormValues();
        let errMsg = this.validateParams(curFormData);
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
        let sliderStepsConfig = this.state.sliderConfig.sliderStepsConfig;
        let curStepCfg = sliderStepsConfig[this.state.step];
        let len = curStepCfg['formConfig'] ? curStepCfg['formConfig'].length : 0;
        let errMsg = [];
        for (let i = 0; i < len; i++) {
            // 如有有配置valid，则需要校验
            let str = '';
            let curStep = curStepCfg['formConfig'][i];
            if (curStep['validate'] && curStep['validate']['preg']) {
                let objPreg = new RegExp(curStep['validate']['preg']);
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
        let sliderStepsConfig = this.state.sliderConfig.sliderStepsConfig;
        let len = sliderStepsConfig.length;
        this.setState({step: len});
    }
    preBtnGenerator() {
        if (this.state.step !== 0) {
            return (
                <div className="btnCon"><span className="btn btn-info"
                onClick={this.handlePreClick.bind(this)}>上一步</span></div>
            );
        }
    }
    nextBtnGenerator(totalSteps) {
        let strText = '';
        if (this.state.step === totalSteps - 1) {
            strText = '提交';
        } else {
            strText = '下一步';
        }
        return (
            <div className="btnCon"><span className="btn btn-info"
            onClick={this.handleNextClick.bind(this)}>{strText}</span>
            <span className="btn btn-warning" onClick={this.cancel.bind(this)}>取消</span>
            </div>
        );
    }
    btnGenerator(totalSteps) {
        let spanList = [];
        let strText = '';
        if (this.state.step !== 0 && this.props.formConfig.preBtn !== false) {
            spanList.push(<span className="btn btn-info"  key={'prestep'}
                    onClick={this.handlePreClick.bind(this)}>上一步</span>);
        }
        if (this.state.step === totalSteps - 1) {
            strText = '提交';
        } else {
            strText = '下一步';
        }
        spanList.push(<span className="btn btn-info"  key={'nextstep'}
                onClick={this.handleNextClick.bind(this)}>{strText}</span>);
        spanList.push(<span className="btn btn-warning"  key={'cancelstep'}
                onClick={this.cancel.bind(this)}>取消</span>);
        return (
            <div className="btnContainer"><div className="wrap">{spanList}</div></div>
        );
    }
    render() {
        let sliderStepsConfig = this.state.sliderConfig.sliderStepsConfig;
        let formConfig = sliderStepsConfig[this.state.step];
        let formData = this.state.storeData[this.state.step];
        let len = sliderStepsConfig.length;
        let strText = this.state.step === len - 1 ? '确定' : 'NEXT';
        let style = {
            display: 'block'
        };
        if (!sliderStepsConfig || this.state.step === len) {
            style = {
                display: 'none'
            };
        }
        let errMsgStyle = this.state.errMsg ? {display: 'block'} : {display: 'none'};
        return (<div className="sliderForm" style={style}>
            <div className="errMsg" style={errMsgStyle}>{this.state.errMsg}</div>
            <ReactForm ref="formSlider" config={formConfig} formData={formData} />
            {this.btnGenerator(len)}
        </div>);
    }

}
