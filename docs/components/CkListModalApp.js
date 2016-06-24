/**
 * @file 弹出层带有checkbox列表-例如设置展示字段等
 * **/
import React from 'react';
import ReactDOM from 'react-dom';
import marked from 'marked';
import ReactModal from '../../lib/ReactModal';
import MarkdownElement from '../../lib/MarkdownElement.js';
import PageData from '../mockData/PageData.js';
export default class CkListModalApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: true
        };
    }
    handleModalClick() {
        console.log(this.refs.cklist.getFormValues());
    }
    openModal() {
        this.setState({modal: !this.state.modal});
    }
    render() {
        const mdText = require('text!../mdFile/ckList.md');
        return (
            <div className="umpui-component">
                <h3 className="umpui-layer umpui-title">弹出层带有checkbox</h3>
                <div className="umpui-block">
                    <span className="am-btn am-btn-secondary"
                        onClick={this.openModal.bind(this)}>点我看效果</span>
                </div>
                <ReactModal  ref="cklist" modalCon={PageData.ckListModal.modalCon}
                    close={this.state.modal} item={PageData.ckListModal.item}
                    handleModalClick={this.handleModalClick.bind(this)}/>
                <h3 className="umpui-layer umpui-title">代码演示</h3>
                <div className="umpui-layer umpui-block">
                    <MarkdownElement text={mdText}/>
                </div>
            </div>
        );
    }

}
