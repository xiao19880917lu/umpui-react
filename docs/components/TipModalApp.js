/**
 * @file tips弹出框
 * **/
import React from 'react';
import ReactDOM from 'react-dom';
import marked from 'marked';
import ReactModal from '../../lib/ReactModal';
import MarkdownElement from '../../lib/MarkdownElement.js';
import PageData from '../mockData/PageData.js';
export default class TipModalApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: true
        };
    }
    openModal() {
        this.setState({modal: !this.state.modal});
    }
    render() {
        const mdText = require('text!../mdFile/tipModal.md');
        return (
            <div className="umpui-component">
                <h3 className="umpui-layer umpui-title">Tips弹出框</h3>
                <div className="umpui-block">
                    <span className="btn btn-info" onClick={this.openModal.bind(this)}>提示框点我点我</span>
                </div>
                <ReactModal  modalCon={PageData.tipsModal.modalCon}
                    close={this.state.modal} handleModalClick={this.handleModalClick}/>
                <div className="umpui-layer umpui-block">
                    <MarkdownElement text={mdText}/>
                </div>
            </div>
        );
    }
}
