/**
 * @file 导出表格数据组件
 * @Liuzechun <liuzechun@baidu.com>
 * @date 2016-08-08
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {Modal, Button, InputNumber, Alert, Progress, Icon} from 'antd';
require('!style!css!sass!../../sass/app/_export.scss');
const ajax = require('reqwest');

export default class Export extends React.Component {
    constructor(props) {
        super(props);
        // 一些与页面无关的数据
        this.local = {
            // 用于存储导出的数据
            // 为避免合并数据时出错，请求过来的数据没有合并到一个数组
            // 所以data里面的数据是这样的：[[{...},{...},...],[],[]]
            data: [],
            // 用于保存计时器的句柄
            timer: null
        };
        this.state = {
            pageSize: 200,
            visible: false,
            noMessage: true,
            exporting: false,
            finish: false,
            fatchedData: 0,
            usedTime: 0,
            lastTime: 0
        };
        // 判断参数中有没有message传入
        let message = this.props.config.message;
        if (typeof(message) !== 'undefined' && typeof(message['page2']) !== 'undefined') {
            this.state.noMessage = false;
        }
    }
    // 重置数据
    initState() {
        clearInterval(this.local.timer);
        this.local.timer = null;
        delete this.local.data;
        this.local.data = [];
        this.setState({
            pageSize: 200,
            exporting: false,
            finish: false,
            fatchedData: 0,
            usedTime: 0,
            lastTime: 0
        });
    }
    setTimer() {
        clearInterval(this.local.timer);
        let timer = setInterval(()=>{
            this.setState({usedTime: this.state.usedTime + 1});
            if (this.state.lastTime >= 1) {
                this.setState({lastTime: this.state.lastTime - 1});
            }
        }, 1000);
        this.local.timer = timer;
    }
    showModal() {
        this.setState({visible: true});
    }
    handleCancel() {
        this.setState({visible: false});
        this.initState();
    }
    pageSizeChange(value) {
        this.setState({pageSize: value});
    }
    doExport() {
        this.setState({exporting: true});
        this.setTimer();
        this.handleExport(1);
    }
    // 导出进程
    handleExport(page) {
        let config = this.props.config;
        let data = {
            page: page,
            size: this.state.pageSize,
            keys: config.search.keys,
            conditions: config.search.conditions,
            total: config.total
        };
        if (typeof(config.otherparms) !== 'undefined') {
            data.otherparms = config.otherparms;
        }
        this.getData(data, res=>{
            if (this.state.exporting && res.status === 0) {
                this.saveData(res.data);
                let size = this.state.pageSize;
                let total = this.props.config.total;
                // 计算剩余时间
                let fatchedData = this.state.fatchedData;
                let usedTime = this.state.usedTime;
                let lastTime = this.state.lastTime;
                let newLastTime = 0;
                if (usedTime !== 0 && fatchedData !== 0) {
                    newLastTime = usedTime * (total - fatchedData) / fatchedData;
                    newLastTime = Math.ceil(newLastTime);
                }
                // 防止剩余时间一直波动，如果波动区间在5秒之内就用原来的值
                if (Math.abs(newLastTime - lastTime) > 5 || newLastTime < 10) {
                    this.setState({lastTime: newLastTime});
                }
                // 判断是否已经取得全部数据
                if (page * size < total) {
                    this.handleExport(page + 1);
                } else {
                    this.finish();
                }
            }
        });
    }
    // 存储数据
    saveData(data) {
        console.log('save data');
        this.local.data.push(data);
        let fatchedData = this.state.fatchedData + data.length;
        this.setState({fatchedData});
    }
    // 创建下载文件
    createDownload() {
        let data = this.local.data;
        let headers = this.props.config.headers;
        let thead = '';
        for (let key in headers) {
            thead += ('<th>' + headers[key] + '</th>');
        }
        let tbody = '';
        data.forEach(list=>{
            list.forEach(item=>{
                tbody += '<tr>';
                for (let key in headers) {
                    tbody += ('<td>' + item[key] + '</td>');
                }
                tbody += '</tr>';
            });
        });

        // 如果单元格内容长度大于11，则将number类型的数字强制转换成文本
        let format = 'style="vnd.ms-excel.numberformat:@"';
        let table = '<table ' + format + '>' + thead + tbody + '</table>';
        // console.log(table);
        let htmlParts = [table];
        let dataBlob = new Blob(htmlParts, {'type': 'text\/xls'});
        let download = this.refs.download;
        download.href = window.URL.createObjectURL(dataBlob);
        download.download = '导出数据.xls';
    }
    finish() {
        clearInterval(this.local.timer);
        this.setState({finish: true});
        this.createDownload();
    }
    reExport() {
        this.initState();
    }
    getData(data, callback) {
        let url = this.props.config.url;
        ajax({
            url: url,
            method: 'get',
            data: data,
            type: 'json',
            success(res) {
                callback(res);
            }
        });
    }
    render() {
        let pageSize = this.state.pageSize;
        let total = this.props.config.total;
        let requestNum = Math.ceil(total / pageSize);
        let usedTime = this.state.usedTime;
        let fatchedData = this.state.fatchedData;
        let progress = ((fatchedData / total) * 100).toFixed(2);
        return (
            <div className="inline-block">
                <span onClick={this.showModal.bind(this)}>
                    {this.props.children}
                </span>
                <Modal ref = "modal" className="export_modal"
                    maskClosable = {false}
                    visible = { this.state.visible }
                    title = "导出数据"
                    onCancel = { this.handleCancel.bind(this) }
                    footer = {[
                            <Button type = "primary" key='btn1'
                                size = "large"
                                hidden = { this.state.exporting }
                                onClick = { this.doExport.bind(this) }>
                                开始导出
                            </Button>,
                            <Button type = "primary" key='btn2'
                                size = "large"
                                hidden = { !this.state.exporting }
                                onClick = { this.reExport.bind(this) }>
                                重新导出
                            </Button>
                        ]}>
                    {/*导出前的设置界面*/}
                    <section hidden={ this.state.exporting }>
                        <div className="export_info">
                            <p>您即将导出现有的<span className="fw700">全部数据</span>，
                                共计 <span className="fw700">{this.props.config.total}</span> 条
                            </p>
                            <p>每次服务器请求的大小为 <InputNumber
                                        size="small" min={15} max={1000} step={100}
                                        defaultValue={pageSize} onChange={this.pageSizeChange.bind(this)} /> 条，
                                本次导出共需 {requestNum} 次服务器请求
                            </p>
                        </div>
                        {this.renderMessage(1)}
                    </section>
                    {/*正在导出的界面*/}
                    <section hidden={ !this.state.exporting }>
                        <div className="export_progress" hidden={ !this.state.noMessage && this.state.finish }>
                            <span className="ex_percent">
                                <span hidden={this.state.finish}><Icon type="loading" />正在导出，</span>
                                已完成 {progress}%...
                            </span>
                            <span className="ex_time">已用时 {usedTime} 秒，预计剩余 { this.state.lastTime } 秒</span>
                            <Progress percent={Math.floor(progress)}
                                    status={ this.state.finish ? 'success' : 'active'}
                                    showInfo={false} />
                            <p>每次服务器请求数据 {pageSize} 条，已导出数据 {fatchedData} of {total}</p>
                        </div>
                        {this.renderMessage(2)}
                        <div hidden={ !this.state.finish }>
                            <Button type="primary"><a ref="download">下载文件</a></Button>
                            <p className="mt8"><Icon type="check-circle" />
                                数据导出完毕，合计{fatchedData}条数据，用时{usedTime}秒
                            </p>
                        </div>
                    </section>
                </Modal>
            </div>
        );
    }
    // 渲染提示信息模块
    renderMessage(pageNum) {
        let message = this.props.config.message;
        if (typeof(message) === 'undefined') {
            return '';
        } else if (typeof(message['page' + pageNum]) === 'undefined') {
            return '';
        } else {
            let msg = message['page' + pageNum];
            return (
                <div>
                    {msg.map(item=> {
                        return (<Alert description={item} key={item}
                                    type="warning"
                                    showIcon />
                        );
                    })}
                </div>
            );
        }
    }
}
