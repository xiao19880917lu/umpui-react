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
            storeData: this.props.formData ? this.props.formData : [],
            sliderConfig: this.props.formConfig ? this.props.formConfig : {},
            style: {display: 'block'},
            stepLen: 0
        };
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            sliderConfig: nextProps.formConfig,
            step: 0,
            storeData: nextProps && nextProps.formData ? nextProps.formData : []
        });
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
    handleNextClick(nextFormId) {
        console.log(nextFormId);
        // 确定每个步骤中不能有相同的ref 配置
        let sliderStepsConfig = this.state.sliderConfig.sliderStepsConfig;
        let len = sliderStepsConfig ? sliderStepsConfig.length : 0;
        let curFormData = this.refs.formSlider.getFormValues();
        let errMsg = this.validateParams(curFormData);
        let flag = 0;
        if (errMsg.length === 0) {
            this.state.storeData[this.state.step] = curFormData;
            this.state.stepLen++;
            if (sliderStepsConfig[this.state.step].isFinal) {
                this.props.submit && this.props.submit(this.state.storeData,
                 sliderStepsConfig[this.state.step], this.state.stepLen);
                this.setState({errMsg: '', step: 0, storeData: [], stepLen: 0});
            } else {
                if (nextFormId) {
                    for (let i in sliderStepsConfig) {
                        if (sliderStepsConfig.hasOwnProperty(i)) {
                            flag++;
                            if (sliderStepsConfig[i].formId === nextFormId) {
                                this.setState({step: flag - 1, storeData: this.state.storeData, errMsg: ''});
                            }
                        }
                    }
                } else {
                    this.setState({step: this.state.step + 1, storeData: this.state.storeData, errMsg: ''});
                }
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
        this.props.cancel();
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
        let sliderStepsConfig = this.state.sliderConfig.sliderStepsConfig;
        let strText = '';
        if (this.state.step === totalSteps - 1) {
            strText = '提交';
        } else {
            strText = sliderStepsConfig[this.state.step].btnText ? sliderStepsConfig[this.state.step].btnText : '下一步';
        }
        return (
            <div className="btnCon"><span className="btn btn-info"
            onClick={this.handleNextClick.bind(this)}>{strText}</span>
            <span className="btn btn-warning" onClick={this.cancel.bind(this)}>取消</span>
            </div>
        );
    }
    btnGenerator(totalSteps) {
        let sliderStepsConfig = this.state.sliderConfig.sliderStepsConfig;
        let formConfig = sliderStepsConfig[this.state.step];
        let spanList = [];
        let strText = '';
        let nextFormId = '';
        if (this.state.step !== 0 && this.props.formConfig.preBtn)
        {
            spanList.push(<span className="btn btn-info"  key={'prestep'}
                    onClick={this.handlePreClick.bind(this)}>上一步</span>);
        }
        if (formConfig.isFinal || sliderStepsConfig.length === 1) {
            strText = formConfig.btnText && formConfig.btnText[0].text ? formConfig.btnText[0].text : '提交';
            spanList.push(<span className="btn btn-info"  key={strText + 'nextstep'}
                onClick={this.handleNextClick.bind(this)}>{strText}</span>);
        } else {
            if (formConfig && formConfig.btnText) {
                for (let i in formConfig.btnText) {
                    strText = formConfig.btnText[i] && formConfig.btnText[i].text ? formConfig.btnText[i].text  : '下一步';
                    nextFormId = formConfig.btnText[i] && formConfig.btnText[i].nextFormId
                    ? formConfig.btnText[i].nextFormId : '';
                    spanList.push(<span className="btn btn-info"  key={strText + 'nextstep'}
                     onClick={this.handleNextClick.bind(this, nextFormId)}>{strText}</span>);
                }
            } else {
                strText = '下一步',
                spanList.push(<span className="btn btn-info"  key={strText + 'nextstep'}
                 onClick={this.handleNextClick.bind(this, nextFormId)}>{strText}</span>);
            }
        }
        if (formConfig && formConfig.removebtn) {
            spanList.push(<span className='btn btn-warning' key={'cancelstep'}
             onClick={this.cancel.bind(this)}>取消</span>);
        }
        return (
            <div className="btnContainer"><div className="wrap">{spanList}</div></div>
        );
    }
    render() {
        let sliderStepsConfig = this.state.sliderConfig.sliderStepsConfig;
        let formConfig = sliderStepsConfig[this.state.step];
        let formData = this.state.storeData && this.state.storeData[this.state.step]
        ? this.state.storeData[this.state.step] : [];
        let len = sliderStepsConfig.length;
        let strText = this.state.step === len - 1 ? '确定' : 'NEXT';
        let errMsgStyle = this.state.errMsg ? {display: 'block'} : {display: 'none'};
        return (<div className="sliderForm" style={this.state.style}>
            <div className="errMsg" style={errMsgStyle}>{this.state.errMsg}</div>
            <ReactForm ref="formSlider" config={formConfig} formData={formData}
             onCancel={this.props.cancel} onDelete={this.props.onDeleted}/>
            {this.btnGenerator(len)}
        </div>);
    }

}
