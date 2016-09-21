/**
 * @file 简易表格组件 依赖Immutable和amazeUI
 * @author luyongfang@baidu.com
 * */
/* eslint-disable fecs-camelcase */
import React from 'react';
import ReactDOM from 'react-dom';
import ReactInput from '../ReactInput.js';
import {Router, Route, Link} from 'react-router';
import $ from 'jquery';
import ReactModal from '../ReactModal';
import TrRow from './TrRow';
import ThRow from './ThRow';
import {Tooltip, Spin, Popconfirm, message} from 'antd';
import Pagination from './Pagination.js';
import Export from '../src/Export.js';
import UserMixin from '../mixins/UserMixin.js';
let Immutable = require('immutable');
require('!style!css!sass!../../sass/app/_reactTable.scss');

export default class Table extends React.Component {

    // 以下是函数定义
    constructor(props) {
        super(props);
        this.initTable();
    }
    
    /**
     *  适用于同一个Table可能展示不同的数据
     *  比如服务器-网络 他们的Tags是不同的，但第一次调用constructor后就没有地方更新了
     *  @param Object nextProps 用于tableCfg等发生变化时重新初始化state
     */
    initTable(nextProps) {
        let objProps = nextProps ? nextProps : this.props;
        let tableCfg = objProps.tableCfg;
        let cacheSize = tableCfg.name ? localStorage.getItem(tableCfg.name) : null;
        tableCfg.cfg = tableCfg.cfg || {};
        cacheSize && (tableCfg.cfg.size = cacheSize);
        this.cfg = Object.assign({}, {
            checkBox: false,
            size: cacheSize ? cacheSize : (tableCfg.cfg.size ? tableCfg.cfg.size : 15),
            tableClass: 'table table-striped'
        }, objProps.tableCfg.cfg, true);
        // 存储当前tablet选中的数据,key为id, value为行数据
        this.selectedData = {};
        this.rowState = {};
        // 存储当前编辑的table数据
        this.editData = {};
        // 仅针对props传递content数据时才使用,为了判断再接收到新的props时是否进行更新的判断,url方式不适用
        this.tableDatas = [];
        // 显示哪些字段
        this.showTags = objProps.tableCfg.tags;

        let arrData = [];
        let data = [];
        let content = [];
        if (objProps.tableCfg.url) {
            arrData = Immutable.List();
        } else {
            content = objProps.content ? objProps.content : [];
            this.generateRowId(content);
            data = content.slice(0, this.cfg.size);
            arrData = Immutable.List(content);
        }
        this.tableDatas = Immutable.fromJS(arrData);
        let retract = false;
        let display = objProps.tableCfg.display;
        display && display.retract && (retract = display.retract);
        this.state = {
            // table的基本配置
            tableCfg: tableCfg,
            // 所有请求回来的数据或者传递过来的数据
            content: arrData,
            // 一共多少条数据
            count: arrData.size,
            // 当前页的数据
            currPageData: Immutable.fromJS(data),
            // 导出数据的配置
            exportConfig: this.getExportConfig(arrData.size, tableCfg),
            flag: 0,
            // 当前是否处在filter的状态
            filter: false,
            // 是否选择全部行
            checkAll: false,
            // loading的spin提示及提示信息
            spinning: false,
            spinTip: '',
            // table表头右侧设置按钮的下拉框是否展示
            showTableMenu: false,
            // 是否允许表格编辑
            editTable: false,
            // 全屏展示与否
            fullScreen: false,
            // 是否收起Table
            retract: retract
        };
        return this.state;
    }

    componentWillReceiveProps(nextProps) {
        // 就算props没有改变，当父组件重新渲染时，也会进这里，所以需要在这里判断是否需要重新渲染组件
        // 针对传数据进来的方式
        let currentTableDatas = Immutable.fromJS(nextProps.content);
        // 如果table的tableCfg是动态的则需要重新设置tableCfg和showTags
        let bTableCfg = Immutable.is(Immutable.fromJS(this.props.tableCfg), Immutable.fromJS(nextProps.tableCfg));
        if (!bTableCfg) {
            let objOriState = this.initTable(nextProps);
            this.setState(objOriState);
        }
        if (currentTableDatas && !currentTableDatas.equals(this.tableDatas)) {
            let data = nextProps.content.slice(0, this.cfg.size);
            this.setState({
                content: Immutable.List(nextProps.content),
                currPageData: Immutable.fromJS(data),
                count: nextProps.content.length,
                checkAll: false

            });
            this.tableDatas = Immutable.fromJS(currentTableDatas);
            this.clearSelectedData();
            this.clearRowSelectState();
        }
        // 针对通过url向后台请求数据时，当params变化时才会刷新
        if (this.props.tableCfg.url) {
            // 调用这个函数的时候，props已经传入，this.props和nextProps永远是一样的
            let bProps = Immutable.is(Immutable.Map(this.props.params), Immutable.Map(nextProps.params));
            if (!bProps){
                this.getData(null, null, nextProps);
                this.clearSelectedData();
                this.clearRowSelectState();
            }
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        // a. 传递的props.params变化了
        // b. 本身更新了state
        /*if (this.props.tableCfg.url) {
            let bProps = Immutable.is(Immutable.Map(this.props.params), Immutable.Map(nextProps.params));
            let bState = Immutable.is(Immutable.Map(this.state), Immutable.Map(nextState)) return !bProps || !bState;
        }*/
        return true;
    }
    componentDidMount() {
        if (this.props.tableCfg.url) {
            // this.getData();
            this.getData(null, this.props.params);
        }
    }
    componentWillUnmount() {
        this.clearSelectedData();
        this.clearRowSelectState();
        $(ReactDOM.findDOMNode(this)).find('tbody tr input[type="checkbox"]').attr('checked', false);
    }
    /**
     *  获取要下载导出数据的配置
     *  @param {number} count 当前所有数据的条数
     *  @param {Object} tableCfg 表格的配置
     *  @return {Object}
     */
    getExportConfig(count, tableCfg) {

        let objTags = this.props.tableCfg.tags;
        let objHeaders = {};
        let arrKeys = [];
        let typeDef = Object.prototype.toString;
        for (let key in objTags) {
            if (key === 'cusOperation' || key === 'operation') {
                continue;
            }
            arrKeys.push(key);
            objHeaders[key] = (typeDef.call(objTags[key]) === '[object Object]') ? objTags[key]['title'] : objTags[key];
        }
        /**
         * 1. 没有url就是直接传递了content的数据
         * 2. 有url但是是client分页-Export需要传递data,默认是client分页
         * 3. 有url但是是server端分页-Export需要传递url配置
         */
        if (!tableCfg.url || tableCfg.cfg.pageType !== 'server') {
            return {
                headers: objHeaders,
                data: this.state && this.state.content ? this.state.content : (this.props.content || []),
                total: count
            };
        }
        return {
            url: this.props.tableCfg.url,
            search: {
                keys: arrKeys,
                conditions: this.props.params ? this.props.params : null
            },
            headers: objHeaders,
            total: this.state && this.state.count ? this.state.count : count
        };
    }
    changeColumnOrder(srcField, dstField) {
        let arrKeys = Object.keys(this.state.tableCfg.tags);
        let srcIndex = arrKeys.indexOf(srcField);
        let dstIndex = arrKeys.indexOf(dstField);
        let arrNewKeys = [];
        let len = arrKeys.length;
        if (srcIndex < dstIndex) {
            arrNewKeys = arrKeys.slice(0, srcIndex).concat(arrKeys.slice(srcIndex + 1, dstIndex + 1)).concat(arrKeys[srcIndex]).concat(arrKeys.slice(dstIndex + 1, len));
        } else {
            arrNewKeys = arrKeys.slice(0, dstIndex).concat(arrKeys[srcIndex]).concat(arrKeys.slice(dstIndex, srcIndex)).concat(arrKeys.slice(srcIndex + 1, len));
        }
        // 根据最新的字段顺序进行调整
        let newTags = {};
        for (let v of arrNewKeys) {
            newTags[v] = this.state.tableCfg.tags[v];
        }
        let tmpTableCfg = this.state.tableCfg;
        tmpTableCfg['tags'] = newTags;
        this.showTags = newTags;
        this.setState({
            tableCfg: tmpTableCfg
        });
    }

    /**
     *  设置显示字段
     *  @param {Object}  oriTags 初始的tags配置
     *  @param {Object} showTags 要展示的tags，回传的参数
     */
    setShowTags(oriTags, showTags) {
        let typeDef = Object.prototype.toString;
        for (let val of Object.keys(oriTags)) {
            if (showTags[val]) {
                oriTags[val] && (typeDef.call(oriTags[val]) === '[object Object]')
                    && (oriTags[val]['display'] = true);
            } else if (typeDef.call(oriTags[val]) === '[object String]') {
                let title = oriTags[val];
                oriTags[val]['title'] = title;
                oriTags[val]['display'] = false;
            } else {
                oriTags[val]['display'] = false;
            }
        }
        this.showTags = oriTags;
        this.refs.switchmodal.setState({close: true});
        this.setState({switchTags: false});
    }

    /**
     *  对于后端数据中没有id的生成随机的id用于存储选择了哪些数据
     *  @param {Array} arrDatas 如果返回的行数据中没有id，自动给加上唯一的ID，用于设置选择了哪些数据
     */
    generateRowId(arrDatas) {
        let i = 0;
        for (let obj of arrDatas) {
            if (obj['id'] || obj['id'] === 0) {
                return false;
            } else {
                obj['id'] = i++;
            }
        }
    }

    /**
     *  计算页数,tableCfg要取自state中，size会变化
     *  @return {number}
     */
    computePage() {
        let tableCfg = this.state.tableCfg;
        let totalPage = 0;
        if (this.state.count) {
            if (tableCfg && tableCfg.cfg && tableCfg.cfg.size) {
                totalPage = Math.ceil(this.state.count / tableCfg.cfg.size);
            } else {
                totalPage = Math.ceil(this.state.count / this.cfg.size);
            }
        }
        return totalPage ? totalPage : 0;
    }
    // 页码变化
    handlePageChange(currentPage) {
        this.changeData(currentPage);
    }
    // 切换分页时，获取分页数据
    changeData(currentPage) {
        // currentPage 从1开始
        if (this.props.tableCfg.cfg.pageType === 'server') {
            this.getData(currentPage);
        } else {
            let startPos = (currentPage - 1) * this.cfg.size;
            let endPos = currentPage * this.cfg.size;
            let curData = [];
            // this.state.content是对全量的,如果是过来出来的数据分页怎么办
            if (this.state.filter) {
                curData = this.state.displayConent.slice(startPos, endPos);
            } else {
                curData = this.state.content.slice(startPos, endPos);
            }
            let isCheckAll = this.isCheckAll(curData, this.rowState);
            this.setState({currPageData: Immutable.fromJS(curData), checkAll: isCheckAll});
        }
    }

    /**
     * 异步获取数据
     * 方式请求接口的方法
     * @param {number} pageNum 请求第几页非必须
     * @param {Object} params 对象非必须
     * @param {Object} nextProps 非必须
     */
    getData(pageNum, params, nextProps) {
        // 第一次render 没有nextProps
        let self = this;
        let dataParams = {};
        // let requestParams = params ? params : (nextProps ? nextProps.params : null);
        let requestParams = params ? params : (nextProps ? nextProps.params : this.props.params);
        this.clearSelectedData();
        this.refs.pagination.setCurrentIndex(1);
        if (this.props.tableCfg.cfg.pageType === 'server') {
            dataParams = $.extend({}, requestParams, {
                    pageNum: pageNum ? pageNum : 1,
                    page: pageNum ? pageNum : 1,
                    pageSize: self.cfg.size ? self.cfg.size : 0,
                    pageType: 'server'
                });
        } else {
            dataParams = $.extend({}, requestParams, {
                pageType: 'client'
            });
        }
        if (this.props.tableCfg.url) {
            self.setState({spinning: true, spinTip: '正在请求数据~请稍等~', size: 'large'});
            $.ajax({
                url: self.props.tableCfg.url,
                data: dataParams,
                dataType: 'JSON',
                type: 'GET',
                success(res) {
                    if (res.status * 1 === 0) {
                        self.generateRowId(res.data);
                        let data = res.data.slice(0, self.cfg.size);
                        let tempExConfig = {};
                        let tableCfg = self.state.tableCfg;
                        let cfg = tableCfg.cfg;
                        if (!cfg.pageType || cfg.pageType !== 'server') {
                            tempExConfig = {
                                total: res.count,
                                data: res.data,
                                headers: self.state.exportConfig.headers
                            };
                        } else {
                            tempExConfig = {
                                search: {
                                    conditions: dataParams
                                },
                                total: res.count
                            };
                        }
                        let exportConfig = Object.assign(self.state.exportConfig, tempExConfig);
                        // 如果有select下拉框可以编辑，且后端返回下拉框数据，则要修改配置里的下拉框的option
                        for (let v in tableCfg.tags) {
                            let tag = tableCfg.tags[v];
                            if (res[v] && tag.editCfg && tag.editCfg.elemType
                                && tag.editCfg.elemType === 'select' && tag.editCfg.edit === true) {
                                tag.editCfg['options'] = res[v];
                            }
                        }
                        let temp = {
                            content: Immutable.fromJS(res.data),
                            currPageData: Immutable.fromJS(data),
                            exportConfig: exportConfig,
                            tableCfg: tableCfg,
                            count: res.count,
                            checkAll: false,
                            spinning: false,
                            spinTip: ''
                        };
                        self.clearRowSelectState();
                        self.setState(temp);
                    }
                    else if (res.status * 1 === 1) {
                        let modalCon = {
                            type: 'warning',
                            msg: res.msg
                        };
                        self.setState({spinning: false, spinTip: ''});
                        self.createModalCon();
                        let divCon = document.getElementById('modalDiv');
                        ReactDOM.render(<ReactModal modalCon={modalCon}
                                handleModalClick={self.clearModalCon.bind(self)}
                                handleCancel={self.clearModalCon.bind(self)}/>, divCon);
                    }
                },
                error(jqXHR, textStatus, errorThrown) {
                    let modalCon = {
                        type: 'warning',
                        msg: '请求出错-返回状态码' + textStatus + 'error: ' + errorThrown
                    };
                    self.setState({spinning: false, spinTip: ''});
                    self.createModalCon();
                    let divCon = document.getElementById('modalDiv');
                    ReactDOM.render(<ReactModal modalCon={modalCon}
                            handleModalClick={self.clearModalCon.bind(self)}
                            handleCancel={self.clearModalCon.bind(self)}/>, divCon);
                }
            });
        }
    }
    selectAll(event) {
        // 只选择当页的数据, currPageData
        let target = $(event.target);
        let isChecked = target.is(':checked');
        if (isChecked) {
            let currPageData = this.state.currPageData.toJS();
            let self = this;
            for (let obj of currPageData) {
                self.selectedData[obj['id']] = obj;
            }
            // input选择
        } else {
            // 取消选择input
            this.clearSelectedData();
        }
        this.setState({flag: ++this.state.flag});
    }
    clearSelectedData() {
        this.selectedData = {};
    }
    getSelectedData() {
        let tmpArr = [];
        for (let key in this.selectedData) {
            tmpArr.push(this.selectedData[key]);
        }
        return tmpArr;
    }
    clearRowSelectState() {
        this.rowState = {};
    }
    updateData(data, event) {
        // 判断选择还是取消, 应该更新元数据，增加是否选中，是否展开的字样
        let target = $(event.target);
        let isChecked = target.is(':checked');
        let id = data['id'];
        // 通过Immutable获取到改case的数据
        if (isChecked) {
            this.selectedData[id] = data;
        } else {
            delete this.selectedData[id];
        }
        this.props.inputSel && this.props.inputSel(this.selectedData);
        this.setState({flag: ++this.state.flag});
    }
    handleTrDbClick(trData, event) {
        event.preventDefault();
        // console.log(event);
        if (this.props.handleTrDbClick) {
            this.props.handleTrDbClick(trData);
        } else {
        }
    }
    getSelectedIds() {
        let arrIds = [];
        for (let dex in this.selectedData) {
            if (this.selectedData.hasOwnProperty(dex)) {
                arrIds.push(dex);
            }
        }
        return arrIds;
    }
    handleModalClick(item, params) {
        let self = this;
        let temp = {};
        for (let dex in item.config) {
            if (item.config.hasOwnProperty(dex)) {
                let name = item.config[dex]['name'];
                temp[name] = params[name];
            }
        }
        temp['id'] = params['id'];
        $('#modalDiv').length > 0 && $('#modalDiv').remove();
        $.ajax({
            url: item.url,
            data: temp,
            dataType: 'JSON',
            type: 'GET',
            success(res) {
                if (res.status * 1 === 0) {
                    // 类似成功的提示不需要展示头和尾部
                    // self.getData();
                    self.refreshTable();
                } else {
                    let modalCon = {
                        type: 'warning',
                        msg: res.msg
                    };
                    self.createModalCon();
                    ReactDOM.render(<ReactModal modalCon={modalCon}
                            handleModalClick={self.clearModalCon.bind(self)}
                            handleCancel={self.clearModalCon.bind(self)}/>,
                            document.getElementById('modalDiv'));
                }
            },
            error(res) {
                let modalCon = {
                    type: 'warning',
                    msg: '后台错误请检查请求'
                };
                self.createModalCon();
                ReactDOM.render(<ReactModal modalCon={modalCon}
                        handleModalClick={self.clearModalCon.bind(self)}
                        handleCancel={self.clearModalCon.bind(self)}/>,
                        document.getElementById('modalDiv'));
            }
        });
    }
    createModalCon() {
        if ($('#modalDiv').length === 0) {
            $('body').append('<div id="modalDiv"></div>');
        }
    }
    clearModalCon() {
        $('#modalDiv').length > 0 && $('#modalDiv').remove();
    }
    handleEdit(data, event) {
        // 单个字段的编辑用Input，多个select时序提供map或者url
        let modalCon = {
            type: 'form'
        };
        let tdElem = $(event.target).parent('td');
        let name = tdElem.attr('data-key');
        let editCfg = this.props.tableCfg.detailCfg.editCfg;
        let config = editCfg.filed[name];
        config['type'] = 'input';
        config['name'] = tdElem.attr('data-key');
        config['defaultVal'] = tdElem.text();
        let item = {
            url: editCfg.url,
            config: [config]
        };
        this.createModalCon();
        ReactDOM.render(<ReactModal modalCon={modalCon} item={item} data={data}
                handleModalClick={this.handleModalClick.bind(this)}
                handleCancel={this.clearModalCon.bind(this)}/>,
                document.getElementById('modalDiv'));
    }
    checkRow(id, value, row) {
        this.rowState[id] = value;
        if (value) {
            this.selectedData[id] = row;
        } else {
            delete this.selectedData[id];
        }
        this.props.inputSel && this.props.inputSel(this.selectedData);
        // 判断是否全部选中了， 全部选中需要更新选中按钮，thGenerator也需要单独拿出来
        let len  = 0;
        for (let id in this.selectedData) {
            if (this.selectedData.hasOwnProperty(id)) {
                len++;
            }
        }
        // len === this.state.currPageData.count();
        if (this.isCheckAll(this.state.currPageData, this.rowState)) {
            this.setState({checkAll: true});
            // 当前页数据中的state是否都在rowState中
        } else {
            this.setState({checkAll: false});
        }
    }
    isCheckAll(curData, rowState) {
        for (let i = 0, len = curData.size; i < len; i++) {
            if (!rowState.hasOwnProperty(curData['id'])) {
                return false;
            }
        }
        return true;
    }
    checkAll(val) {
        // 只能是当前页的数据
        let rowState = [];
        let arrDatas = this.state.currPageData.toJS();
        // 如果当前页中有一行数据是disabled的，则不能全选
        for (let i = 0, len = arrDatas.length; i < len; i++) {
            if (arrDatas[i]['disabled']) {
                return;
            }
        }
        // 需要更新selectedData;
        if (val) {
            for (let i = 0; i < arrDatas.length; i++) {
                this.selectedData[arrDatas[i]['id']] = arrDatas[i];
            }
        } else {
            // 这里如果获取当前页面的数据呢
            for (let i = 0; i < arrDatas.length; i++) {
                delete this.selectedData[arrDatas[i]['id']];
            }
        }
        for (let i = 0; i < arrDatas.length; i++) {
            this.rowState[arrDatas[i]['id']] = val;
        }
        this.props.checkAllSel && this.props.checkAllSel(this.selectedData);
        this.setState({
            checkAll: val
        });
    }

    /**
     *  编辑之后存一份数据未editData,当取消编辑之后editData要清空
     *  @param {number} trDataId 没一行唯一的一个ID
     *  @param {Object} trNewData 编辑之后的行数据
     */
    setEditTableData(trDataId, trNewData) {
        this.editData[trNewData['id']] = trNewData;
    }

    /**
     * 取消编辑
     * 暂时只包含全部取消
     * 当前行的取消先不做，当前行需要还原原来的数据，而重新渲染table其他行的时候需要综合数据渲染太麻烦of course可以做
     * @param {number} trDataId 当前行的id
     */
    cancelEdit(trDataId) {
        if (trDataId) {
            delete this.editData[trDataId];
        } else {
            this.editData = {};
            this.setState({editTable: false});
        }
    }

    /**
     *  表头保存按钮的动作
     *  0. 比较的是editData中的数据
     *  1. 需要比较前后的数据是否发生了变化，如果没有则需要提示
     *  2. 如果发生了变化则需要弹出提示框，点击确定后进行提交
     *  获取到编辑之后的数据，回传到上层进行处理
     *  处理保存数据
     *  当有数据变化的时候才去confirm提交数据
     */
    confirmSaveEdit() {
        let isDataChanged = JSON.stringify(this.editData);
        if (isDataChanged === '{}') {
            message.warning('编辑的数据没有发生任何变化');
        } else {
            this.setState({editTable: false});
            this.props.saveEdit && this.props.saveEdit(this.editData);
            console.log('editData');
            console.log(this.editData);
        }
    }
    trDoubleClick(row, index) {
        // 去掉上一次双击的行的active状态
        this.activeTr && this.activeTr.removeActiveStatus();
        this.activeTr = this.refs['tr' + index];
        this.props.trDoubleClick && this.props.trDoubleClick(row, index);
    }
    trGenerator() {
        let self = this;
        let selectedIds = self.getSelectedIds();
        if (this.state.currPageData.count() === 0) {
            return null;
        }
        if (Immutable.List.isList(this.state.currPageData)) {
            let content = this.state.currPageData.toJS();
            let trList = [];
            let self = this;
            let rows = content.map(function (row, index) {
                let TrRows = [];
                let checked = self.state.checkAll || self.rowState[row.id];
                TrRows.push(<TrRow obj={row} index={index} key={row.id} id={row['id']} checked={checked}
                    ref={'tr' + index}
                    callback={self.checkRow.bind(self)} tableCfg={self.state.tableCfg}
                    expandAll={self.state.expandAll}  lineEdit={self.state.editTable}
                    showTags={self.showTags} handleEdit={self.handleEdit.bind(self)}
                    setEditTableData={self.setEditTableData.bind(self)}
                    trDoubleClick={self.trDoubleClick.bind(self, row, index)}
                    expandExtraInfo={self.expandExtraInfo.bind(self)}/>);
                if (self.state.tableCfg.display && self.state.tableCfg.display.expand) {
                    let tmpHtml = row['expand']; // data['html']
                    let extraHTML = self.createMarkup(tmpHtml);
                    let tdLen = 12;
                    !row['ump-expand'] && (row['ump-expand'] = false);
                    let up = self.state.expandAll || row['ump-expand'] ? {} : {display: 'none'};
                    TrRows.push(<tr style={up} key={'trexpand' + row['id']} ref={'expandtr' + row['id']}>
                        <td colSpan={tdLen}
                            dangerouslySetInnerHTML={self.createMarkup(tmpHtml)}></td></tr>);
                }
                return TrRows;
            });
            return rows;
        }
        else if (Immutable.Map.isMap(this.state.currPageData)) {
            let tdList = [];
            let objTags = this.props.tableCfg.tags;
            for (let key in objTags) {
                tdList.push(<td key={'td' + key} data-key={key}>{objTags[key]}</td>);
            }
            /*$.each(this.props.tableCfg.tags, function (key, value) {
                tdList.push(<td key={'td' + key} data-key={key}>{value}</td>);
            });*/
            if (self.state.cfg.checkBox) {
                tdList.unshift(<td key="checkbox"><input type="checkbox" onClick={self.checkAll.bind(self)}/></td>);
            }
            return (
                <tr key="maptr">{tdList}</tr>
                );
        } else {
            return null;
        }
    }
    expandExtraInfo(refK, isDown) {
        if (isDown) {
            this.refs[refK].style.display = '';
        } else {
            this.refs[refK].style.display = 'none';
        }
    }
    expandAllExtra() {
        this.setState({expandAll: !this.state.expandAll});
    }
    createMarkup(htmlString) {
        return {
            __html: htmlString
        };
    }
    filterChange(iVal) {
        // 在配置的table字段中过滤，不是所有请求回来的字段,全字段需要在content中
        let strVal = iVal.toLowerCase();
        // 过滤当前页
        let tableCfg = this.props.tableCfg;
        let content = this.state.content.toJS();
        // start过滤前保存未过滤时的数据,因为过滤时会更新当前的count和分页的当前页数据
        this.filterCurIndex = this.refs.pagination.state.currentIndex !== 1
            ? this.refs.pagination.state.currentIndex : 1;
        this.filterCount = this.filterCount ? this.filterCount : this.state.count;
        // end
        let self = this;
        if (strVal) {
            let arrFilterData = [];
            for (let row of content) {
                let data = [];
                for (let val in row) {
                    data.push(row[val]);
                }

                let str = data.join('\n').toLowerCase();
                if (str.match(strVal)) {
                    arrFilterData.push(row);
                }
            }
            // this.state.content是对全量的,如果是过来出来的数据分页怎么办
            let curData = arrFilterData.slice(0, this.cfg.size);
            let count = arrFilterData.length;
            this.refs.pagination.setCurrentIndex(1);
            this.setState({
                currPageData: Immutable.List(curData),
                count: count,
                filter: true,
                displayConent: Immutable.List(arrFilterData)});
        } else if (this.cfg.pageType === 'server') {
            // 服务器端分页的content都是当前页的数据
            this.refs.pagination.setCurrentIndex(this.filterCurIndex);
            this.setState({currPageData: Immutable.List(this.state.content), count: this.filterCount, filter: false});
        } else {
            // 前端分页, content是返回的所有数据，当前页的数据需要截取
            this.refs.pagination.setCurrentIndex(this.filterCurIndex);
            let start = (this.filterCurIndex - 1) * this.cfg.size;
            let curData = this.state.content.slice(start, start + this.cfg.size);
            this.setState({currPageData: Immutable.List(curData), count: this.filterCount, filter: false});
        }
    }
    switchTags(obj) {
        // 多个checkbox的如何获取
        // this.setState({switchTags: true});
        this.refs.switchmodal.setState({close: false});
    }
    refreshTable() {
        if (this.props.tableCfg.url) {
            this.getData();
        } else {
            this.props.refresh && this.props.refresh();
        }
        this.refs.pagination.setCurrentIndex(1);
    }
    setPageSize(itemParams, NULL, item) {
        let size = itemParams.size;
        if (!isNaN(size * 1) && size) {
            let tmpCfg = Object.assign({}, this.state.tableCfg.cfg);
            tmpCfg.size = size;
            this.cfg.size = size;
            this.setState({
                tableCfg: Object.assign({}, this.state.tableCfg, {cfg: tmpCfg})
            });
            let name = this.state.tableCfg.name;
            name && (localStorage.setItem(name, size));
        }
        if (this.props.tableCfg.url) {
            // this.getData();
            this.refreshTable();
        } else {
            let data = this.state.content.slice(0, this.cfg.size);
            this.setState({
                currPageData: Immutable.fromJS(data)
            });
        }
    }
    showSetPageSize() {
        let self = this;
        let modalCon = {
            type: 'form'
        };
        let item = {
            config: [
                {
                    type: 'input',
                    label: '列表展示数目',
                    name: 'size'
                }
            ]
        };
        self.createModalCon();
        let divCon = document.getElementById('modalDiv');
        ReactDOM.render(<ReactModal modalCon={modalCon} item={item}
                handleModalClick={self.setPageSize.bind(self)}
                handleCancel={self.clearModalCon.bind(self)}/>, divCon);
    }

    /**
     * 点击编辑按钮需要重新渲染表格且需要讲之前编辑的数据清除
     */
    editTable() {
        this.editData = {};
        this.setState({editTable: !this.state.editTable});
    }
    switchMenuList() {
        /**
         * 由于li单击时有冒泡的原理，ul上捕获之后会再出发，因为li上不需要再加入事件设置显示与否
         */
        this.setState({showTableMenu: !this.state.showTableMenu});
    }
    toggleFullScreen() {
        this.setState({fullScreen: !this.state.fullScreen});
    }
    /*收起table列表，只展示表头*/
    toggleRetract() {
        this.setState({retract: !this.state.retract});
    }
    tableHeadGenerator() {
        let title = this.props.tableCfg.title || '';
        let display = this.props.tableCfg.display;
        let result = [];
        /* 表头标题 */
        if (title) {
            let icon = 'fa fa-caret-' + (this.state.retract === false ? 'down' : 'right');
            result.push(
                <div key="table-title" className="table-header" onClick={this.toggleRetract.bind(this)}>
                    <i className={icon}></i>
                    <span>{title}</span>
                </div>);
        }
        /**
         * 以下为一些控件的生成，全部保存在divList里
         */
        let divList = [];
        // extraWidghts为用户自定义的控件，children可能为一个数组，也可能为单个对象，所以这里要转换一下
        let extraWidghts = this.props.children;
        if (extraWidghts) {
            extraWidghts = Array.isArray(extraWidghts) ? extraWidghts : [extraWidghts];
        }
        /**
         * display.basic里面的控件视为基本操作控件
         */
        let arrBasic = display && display.basic;
        // 为了美观，如果有自定义的控件，把控件放到过滤框之后，其他控件之前
        if (arrBasic && arrBasic.indexOf('filter') !== -1) {
            let props = {
                name: 'filter',
                placeholder: '要过滤的内容',
                handleChange: this.filterChange.bind(this)
            };
            divList.push(<div className="umpui-header-extra filter" key="umpui-header-extra">
                    <i className="fa fa-filter"></i>
                    <ReactInput {...props} ref="filter"/>
            </div>);
        }
        // 为了美观，如果有自定义的控件，把控件放到过滤框之后，其他控件之前
        if (extraWidghts) {
            for (let v of extraWidghts) {
                // 除了pos值为menu的，其他都视为基础控件
                if (!v.props.pos || v.props.pos !== 'menu') {
                    divList.push(v);
                }
            }
        }
        if (arrBasic) {
            if (arrBasic.indexOf('editTable') !== -1) {
                let arrList = [];
                if (this.state.editTable) {
                    arrList.push(<ul className="umpui-edit-cs">
                        <li onClick={this.cancelEdit.bind(this, null)} key={'cancelEdit'}>
                            <i className="fa fa-undo"></i>
                            <span className="umpui-span-left">取消</span>
                        </li>
                        <li key="'saveEdit'">
                            <Popconfirm title="确定修改吗?"
                                onConfirm={this.confirmSaveEdit.bind(this)}
                                onCancel={this.cancelEdit.bind(this)}>
                                <span>
                                    <i className="fa fa-floppy-o"></i>
                                    <span className="umpui-span-left">保存</span>
                                </span>
                            </Popconfirm>
                        </li>
                    </ul>);
                } else {
                    arrList.push(<div className="umpui-edit" onClick={this.editTable.bind(this)} key={'editTable'}>
                            <i className="fa fa-pencil-square-o"></i>
                            <span>编辑</span></div>);
                }
                divList.push(<div className="umpui-header-extra" key="umpui-table-edit">{arrList}</div>);
            }
            if (arrBasic.indexOf('refresh') !== -1) {
                divList.push(<div className="umpui-header-extra" key="refresh"
                        onClick={this.refreshTable.bind(this)}>
                    <i className="fa fa-refresh" title="刷新"></i>
                    <span>刷新</span></div>);
            }
            if (arrBasic.indexOf('fullScreen') !== -1) {
                if (!this.state.fullScreen) {
                    divList.push(<div className="umpui-header-extra" key="fullscreen"
                            onClick={this.toggleFullScreen.bind(this)}>
                            <i className="fa fa-arrows-alt"></i>
                            <span>全屏</span></div>);
                }
            }
            if (arrBasic.indexOf('fullScreen') !== -1) {
                if (this.state.fullScreen) {
                    divList.push(<div className="umpui-header-extra" key="exitfullscreen"
                            onClick={this.toggleFullScreen.bind(this)}>
                            <i className="fa fa-compress"></i>
                            <span>退出全屏</span></div>);
                }
            }
            if (arrBasic.indexOf('export') !== -1) {
                    divList.push(<div className="umpui-header-extra" key="export">
                        <Export config={this.state.exportConfig}>
                            <i className="fa fa-download"></i>
                            <span className="umpui-span-left">导出</span>
                        </Export></div>);
            }
            if (arrBasic.indexOf('switchTags') !== -1) {
                divList.push(<div className="umpui-header-extra" key="switchTags"
                        onClick={this.switchTags.bind(this)}>
                    <i className="fa fa-cogs" title="显示列"></i>
                    <span>展示列</span></div>);
            }
        }
        /**
         * display.menus视为不常用的一些控件
         * 为了节省空间，把这些不常用的控件，放在一个下拉列表里
         */
        let gearsList = [];
        let arrMenus = display && display.menus;
        if (arrMenus) {
            if (arrMenus.indexOf('fullScreen') !== -1) {
                gearsList.push(<li key="fullScreen1" onClick={this.toggleFullScreen.bind(this)}>
                    <i className="fa fa-arrows-alt"></i>
                    <span className="umpui-span-left">全屏显示</span></li>);
            }
            if (arrMenus.indexOf('switchTags') !== -1) {
                gearsList.push(<li key="switchTags1" onClick={this.switchTags.bind(this)}>
                    <i className="fa fa-cog"></i>
                    <span className="umpui-span-left">展示字段</span></li>);
            }
            if (arrMenus.indexOf('export') !== -1) {
                gearsList.push(<li key="export1">
                    <Export config={this.state.exportConfig}>
                        <i className="fa fa-download"></i>
                        <span className="umpui-span-left">导出数据</span>
                    </Export>
                    </li>);
            }
            if (arrMenus.indexOf('setPageSize') !== -1) {
                gearsList.push(<li key="setPageSize1" onClick={this.showSetPageSize.bind(this)}>
                    <i className="fa fa-cogs"></i>
                    <span className="umpui-span-left">页面设置</span></li>);
            }
            if (arrMenus.indexOf('refresh') !== -1) {
                gearsList.push(<li key="refresh1" onClick={this.refreshTable.bind(this)}>
                    <i className="fa fa-refresh"></i>
                    <span className="umpui-span-left">刷新表格</span></li>);
            }
        }
        if (extraWidghts) {
            for (let v of extraWidghts) {
                // pos值为menu的视为不常用控件，放到下拉列表里
                if (v.props.pos && v.props.pos === 'menu') {
                    gearsList.push(v);
                }
            }
        }
        if (gearsList.length > 0) {
            let listClass = 'hidden';
            if (this.state.showTableMenu) {
                listClass = 'show';
            }
            divList.push(<div className="umpui-header-extra" key="umpui-table-menu"
                    onClick={this.switchMenuList.bind(this)}>
                        <i className="fa fa-list"></i>
                        <span>菜单</span>
                        <ul className={listClass}>{gearsList}</ul>
                    </div>);
        }
        result.push(<div className="umpui-header-extra-con">{divList}</div>);
        return result;
    }
    sortColumn(sortType, field) {
        let column = this.props.tableCfg.tags[field];
        // 默认排序是大小  this.state.content immutableJS 排序
        if (column['sort'] === true) {
            let allData = this.state.content.sort(function (lineOne, lineTwo) {
                let asc = lineOne[field] < lineTwo[field] ? -1 : (lineOne[field] > lineTwo[field] ? 1 : 0);
                return sortType ? asc : -asc;
            });
            let currPageData = allData.slice(0, this.cfg.size);
            this.setState({
                content: allData,
                currPageData: currPageData,
                flag: ++this.state.flag
            });
        } else if (typeof(column['sort']) === 'function') {
            let allData = this.state.content.sort(function (lineOne, lineTwo) {
                let sortVal = column['sort'](lineOne, lineTwo);
                return sortType ? sortVal : -sortVal;
            });
            let currPageData = allData.slice(0, this.cfg.size);
            this.setState({
                content: allData,
                currPageData: currPageData,
                flag: ++this.state.flag
            });
        }
    }

    render() {
        let self = this;
        let totalPage = this.computePage();
        let modalCon = {
            type: 'checkbox'
        };
        let props = {
            show: false,
            val: 0
        };
        let tableClass = 'panel panel-default umpui-table';
        if (this.state.fullScreen) {
            tableClass += ' umpui-fullscreen';
        }
        if (this.state.retract) {
            tableClass += ' retract';
        }
        let pagerCfg = this.cfg.pagerCfg ? this.cfg.pagerCfg : {};
        return (
            <div className={tableClass}>
                <ReactModal ref="switchmodal" modalCon={modalCon} close={true}
                    item={this.showTags} handleModalClick={this.setShowTags.bind(self)}/>
                <div className="panel-heading">
                    {this.tableHeadGenerator()}
                </div>
                <div className="panel-body">
                    <Spin spinning={this.state.spinning} tip={this.state.spinTip}>
                        <div className="table-responsive">
                            <table hover={self.props.hover} className={this.cfg.tableClass}>
                                <ThRow tableCfg={this.state.tableCfg} checked={this.state.checkAll}
                                showTags={self.showTags} checkAll={this.checkAll.bind(this)}
                                expandAll={this.state.expandAll}
                                expandAllExtra={this.expandAllExtra.bind(this)}
                                sortColumn={this.sortColumn.bind(this)}
                                changeColumnOrder={this.changeColumnOrder.bind(this)}/>
                                <tbody>
                                    {self.trGenerator()}
                                </tbody>
                            </table>
                        </div>
                    </Spin>
                    <Pagination ref="pagination" pager={this.cfg.pager} {...pagerCfg}
                        onPageChange={self.handlePageChange.bind(self)}
                        totalData={this.state.count}
                        totalPage={totalPage} size={this.cfg.size}/>
                </div>
            </div>
            );
    }
}
