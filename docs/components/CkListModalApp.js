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
            modal: true,
            item: PageData.ckListModal.item
        };
    }
    handleModalClick(item, params) {
        console.log(this.refs.cklist.getFormValues());
        console.log('99999999999999999999999');
        for(let k in item) {
            item[k]['display'] = false;
        }
        this.setState({item: item, modal: !this.state.modal});
        alert(JSON.stringify(params));
        console.log(this.refs.cklist.getFormValues());
        console.log('222222222222222222');
        console.log(this.item);
    }
    openModal() {
        this.setState({modal: !this.state.modal});
    }
    render() {
        console.log('11111111111111111111111111111111111111');
        console.log(this.item);
        const mdText = require('text!../mdFile/ckList.md');
        return (
            <div className="umpui-component">
                <h3 className="umpui-layer umpui-title">弹出层带有checkbox </h3>
                <div className="umpui-block">
                    <span className="btn btn-info"
                        onClick={this.openModal.bind(this)}>点我看效果啦啦</span>
                </div>
                <ReactModal  ref="cklist" modalCon={PageData.ckListModal.modalCon}
                    close={this.state.modal} item={this.state.item}
                    handleModalClick={this.handleModalClick.bind(this)}/>
                <div className="umpui-layer umpui-block">
                    <MarkdownElement text={mdText}/>
                </div>
            </div>
        );
    }

}
