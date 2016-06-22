/**
 * @file 弹出层上可以展示form表单
 * **/
import React from 'react';
import ReactDOM from 'react-dom';
import marked from 'marked';
import ReactModal from '../../lib/ReactModal';
import MarkdownElement from '../../lib/MarkdownElement.js';
import PageData from '../mockData/PageData.js';
export default class FormModalApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: true
        };
    }
    handleModalClick(item, params) {
        let jsonItem = JSON.stringify(item);
        let jsonParams = JSON.stringify(params);
        console.log('传递给modal的参数:' + jsonItem);
        console.log('确定按钮回传的数据:' + jsonParams);
        alert('传递给modal的参数:' + jsonItem);
        alert('确定按钮回传的数据:' + jsonParams);
    }
    openModal() {
        this.setState({modal: !this.state.modal});
    }
    render() {
        const mdText = require('text!../mdFile/formModal.md');
        return (
            <div className="umpui-component">
                <h3 className="umpui-layer umpui-title">弹出层包含表单组件ReactModal</h3>
                <div className="umpui-block">
                    <span className="am-btn am-btn-secondary" onClick={this.openModal.bind(this)}>Form表单弹出层</span>
                </div>
                <ReactModal  modalCon={PageData.formModal.modalCon} item={PageData.formModal.item}
                    close={this.state.modal} handleModalClick={this.handleModalClick.bind(this)}/>
                <h3 className="umpui-layer umpui-title">代码演示</h3>
                <div className="umpui-layer umpui-block">
                    <MarkdownElement text={mdText}/>
                </div>
            </div>
        );
    }

}
