/**
 * @file 简易表格组件 依赖Immutable和amazeUI
 * @author luyongfang@baidu.com
 * */
/* eslint-disable fecs-camelcase */
var React = require('react');
var ReactDOM = require('react-dom');
var Pagination = require('./Pagination.js');
var TrRow = require('./TrRow.js');
var ThRow = require('./ThRow.js');
var Immutable = require('immutable');
var ReactModal = require('../ReactModal.js');
var ReactInput = require('../ReactInput.js');
var UserMixin = require('..//mixins/UserMixin.js').default;
import {Router, Route, Link} from 'react-router';
require("!style!css!sass!../../sass/app/_reactTable.scss");

var Table = React.createClass({
    mixins: [UserMixin],
    selectedData: {},
    trs: null,
    tableDatas: [], // 新的请求的所有的数据，不是当页的数据
    rowState: {},
    cfg: {
        checkBox: false,
        size: 10,
        tableClass: 'table table-striped'
    },
    getInitialState: function () {
        this.cfg = $.extend({}, this.cfg, this.props.tableCfg.cfg, true);
        this.showTags = this.props.tableCfg.tags;
        this.props.tableCfg.cfg = this.cfg;
        // 为什么需要在这清空呢？componentWillUnMount不行呢？
        this.rowState = {};
        // this.initShowTags();
        if (this.props.tableCfg.url) {
            var arrData = Immutable.List();
            var data = [];
        }else {
            var content = this.props.content;
            this.generateRowId(content);
            var data = content.slice(0, this.cfg.size);
            var arrData = Immutable.List(content);
        }
        this.tableDatas = Immutable.fromJS(arrData);
        return {
            content: arrData,
            count: arrData.size,
            currPageData: Immutable.fromJS(data),
            flag: 0,
            filter: false,
            checkAll: false
        };
    },
    initShowTags: function () {
        // 默认的tags，非对象的默认显示即display: true
        var tags = this.props.tableCfg.tags;
        for(var key of Object.keys(tags)) {
            if (Object.prototype.toString.call(tags[key]) === "[object String]"
                    ||(Object.prototype.toString.call(tags[key]) === "[object Object]" && tags.display)) {
                this.showTags[key] = tags[key]
            }
        } 
    },
    setShowTags: function (oriTags, showTags) {
        var typeDef = Object.prototype.toString;
        for (var val of Object.keys(oriTags)) {
            if (showTags[val]) {
                oriTags[val] && (typeDef.call(oriTags[val]) === '[object Object]')
                    && (oriTags[val]['display'] = true);
            }else if (typeDef.call(oriTags[val]) === '[object String]') {
                var title = oriTags[val]
                oriTags[val] = {
                    title: title,
                    display: false 
                };
            }else {
                oriTags[val]['display'] = false;
            }
        }
        this.showTags = oriTags;
        this.setState({switchTags: false});            
    },
    generateRowId: function (arrDatas) {
        var i = 0;
        $.each(arrDatas, function (dex, obj) {
            if (obj['id']) {
                return false;
            }else {
                obj['id'] = i++;
            }
        });
    },
    computePage: function () {
        var tableCfg = this.props.tableCfg;
        if (this.state.count) {
            if (tableCfg && tableCfg.cfg && tableCfg.cfg.size) {
                var totalPage = Math.ceil(this.state.count / tableCfg.cfg.size);
            }else {
                var totalPage = Math.ceil(this.state.count / this.cfg.size);
            }
        }
        return totalPage ? totalPage : 0;
    },
    routerWillLeave: function () {
        return 'are you sure';
    },
    componentWillReceiveProps: function (nextProps) {
        // 在这里应该判断数据是不是一致，如果不一致则去setState
        this.selectedData = {};
        this.rowState = {};
        var currentTableDatas = Immutable.fromJS(nextProps.content);
        if (currentTableDatas && !currentTableDatas.equals(this.tableDatas)) {
            var data = nextProps.content.slice(0, this.cfg.size);
            this.setState({
                content: Immutable.List(nextProps.content),
                currPageData: Immutable.fromJS(data),
                count: nextProps.content.length,
                checkAll: false

            });
            this.tableDatas = Immutable.fromJS(currentTableDatas);
        }
        if (this.props.tableCfg.url) {
            this.getData();
        }
    },
    changeData: function (currentIndex) {
        // 获取分页数据
        // currentIndex 从1开始
        if (this.props.tableCfg.cfg.pageType === 'server') {
            this.getData(currentIndex);
        }else {
            var startPos = (currentIndex - 1) * this.cfg.size;
            var endPos = currentIndex * this.cfg.size;
            // this.state.content是对全量的,如果是过来出来的数据分页怎么办
            if (this.state.filter) {
                var curData = this.state.displayConent.slice(startPos, endPos);
            }else {
                var curData = this.state.content.slice(startPos, endPos);
            }
            var isCheckAll = this.isCheckAll(curData, this.rowState);
            this.setState({currPageData: Immutable.fromJS(curData), checkAll: isCheckAll});
        }
    },
    getData: function (pageNum) {
        var self = this;
        var dataParams = $.extend({}, self.props.tableCfg.params, {
                pageNum: pageNum ? pageNum : 0,
                page: pageNum ? pageNum : 0,
                pageSize: self.cfg.size ? self.cfg.size : 0
            });
        if (this.props.tableCfg.url) {
            $.ajax({
                url: self.props.tableCfg.url,
                data: dataParams,
                dataType: 'JSON',
                type: 'GET',
                success: function (res) {
                    if (res.status * 1 === 0) {
                        self.generateRowId(res.data);
                        var data = res.data.slice(0, self.cfg.size);
                        var temp = {
                            content: Immutable.fromJS(res.data),
                            currPageData: Immutable.fromJS(data),
                            count: res.count,
                            checkAll: false
                        };
                        self.rowState = {};
                        self.setState(temp);
                        self.loadUser();
                    }
                    else if (res.status * 1 === 1) {
                        var modalCon = {
                            type: 'warning',
                            msg: res.msg
                        };
                    }
                }
            });
        }
    },
    componentDidMount: function () {
        this.getData();
    },
    componentWillUnmount: function () {
        this.selectedData = {};
        this.rowState = {};
        $(ReactDOM.findDOMNode(this)).find('tbody tr input[type="checkbox"]').attr('checked', false);
    },
    selectAll: function (event) {
        // 只选择当页的数据, currPageData
        var target = $(event.target);
        var isChecked = target.is(':checked');
        this.trs = this.trs ? this.trs :  $(ReactDOM.findDOMNode(this)).find('tbody tr');
        if (isChecked) {
            var currPageData = this.state.currPageData.toJS();
            var self = this;
            $.each(currPageData, function (key, obj) {
                self.selectedData[obj['id']] = obj;
            });
            // input选择
        }else {
            // 取消选择input
            this.selectedData = [];
        }
        this.setState({flag: ++this.state.flag});
    },
    updateData: function (data, event) {
        // 判断选择还是取消, 应该更新元数据，增加是否选中，是否展开的字样
        var target = $(event.target);
        var isChecked = target.is(':checked');
        var id = data['id'];
        // 通过Immutable获取到改case的数据
        if (isChecked) {
            this.selectedData[id] = data;
        }else {
            delete this.selectedData[id];
        }
        this.props.inputSel && this.props.inputSel(this.selectedData);
        this.setState({flag: ++this.state.flag});
    },
    handleTrDbClick: function (trData, event) {
        event.preventDefault();

        if (this.props.handleTrDbClick) {
            this.props.handleTrDbClick(trData);
        }else {
        }
    },
    getSelectedIds: function () {
        var arrIds = [];
        for (var dex in this.selectedData) {
            arrIds.push(dex);
        }
        return arrIds;
    },
    handleModalClick: function (item, params) {
        var self = this;
        var temp = {};
        for (var dex in item.config) {
            var name = item.config[dex]['name'];
            temp[name] = params[name];
        }
        temp['id'] = params['id'];
        $.ajax({
            url: item.url,
            data: temp,
            dataType: 'JSON',
            type: 'GET',
            success: function (res) {
                if (res.status * 1 === 0) {
                    // 类似成功的提示不需要展示头和尾部
                    self.getData();
                }else {
                    var modalCon = {
                        type: 'warning',
                        msg: res.msg
                    };
                    ReactDOM.render(<ReactModal modalCon={modalCon}/>, document.getElementById('modal'));
                }
            },
            error: function (res) {

            }
        });
    },
    handleEdit: function (data, event) {
        // 需要请求, 这里需要传递进来一个map,哪些需要更改，需要给该的url对应关系
        // urlMap: {title: '/business/modifyTitel','sss': '///'} 需要再更新一般
        var modalCon = {
            type: 'form'
        };
        var name = $(event.target).parent('td').attr('data-key');
        var item = {
            url: '/business/modifyTitle',
            config: [{
                type: 'input',
                label: '标题:',
                name: $(event.target).parent('td').attr('data-key'),
                isEmpty: false,
                validate: 'string',
                defaultVal: $(event.target).parent('td').text()
            }]
        };
        ReactDOM.render(<ReactModal modalCon={modalCon} item={item} data={data}
                handleModalClick={this.handleModalClick}/>, document.getElementById('modal'));
    },
    checkRow: function (id, value, row) {
        this.rowState[id] = value;
        if (value) {
            this.selectedData[id] = row;
        }else {
            delete this.selectedData[id];
        }
        this.props.inputSel && this.props.inputSel(this.selectedData);
        // 判断是否全部选中了， 全部选中需要更新选中按钮，thGenerator也需要单独拿出来
        var len  = 0;
        for (var id in this.selectedData) {
            if (this.selectedData.hasOwnProperty(id)) {
                len++;
            }
        }
        // len === this.state.currPageData.count();
        if (this.isCheckAll(this.state.currPageData, this.rowState)) {
            this.setState({checkAll: true});
            // 当前页数据中的state是否都在rowState中
        }else {
            this.setState({checkAll: false});
        }
    },
    isCheckAll: function (curData, rowState) {
        for (let i = 0, len = curData.size; i < len; i++) {
            if (!rowState.hasOwnProperty(curData['id'])) {
                return false;
            }
        }
        return true;
    },
    checkAll: function (val) {
        // 只能是当前页的数据
        var rowState = [];
        var arrDatas = this.state.currPageData.toJS();
        // 需要更新selectedData;
        if (val) {
            for (var i = 0; i < arrDatas.length; i++) {
                this.selectedData[arrDatas[i]['id']] = arrDatas[i];
            }
        }else {
            // 这里如果获取当前页面的数据呢
            for (var i = 0; i < arrDatas.length; i++) {
                delete this.selectedData[arrDatas[i]['id']];
            }
        }
        for (var i = 0; i < arrDatas.length; i++) {
            this.rowState[arrDatas[i]['id']] = val;
        }
        this.props.checkAllSel && this.props.checkAllSel(this.selectedData);
        this.setState({
            checkAll: val
        });
    },
    trGenerator: function () {
        var self = this;
        var selectedIds = self.getSelectedIds();
        if (this.state.currPageData.count() === 0) {
            return null;
        }
        if (Immutable.List.isList(this.state.currPageData)) {
            var content = this.state.currPageData.toJS();
            var trList = [];
            var self = this;
            var rows = content.map(function (row, index) {
                var TrRows = [];
                var checked = self.state.checkAll || self.rowState[row.id];
                TrRows.push(<TrRow obj={row} index={index} key={row.id} id={row['id']} checked={checked}
                    callback={self.checkRow} tableCfg={self.props.tableCfg} showTags={self.showTags} handleEdit={self.handleEdit}
                    expandExtraInfo={self.expandExtraInfo} linkExtra={self.props.linkExtra}/>);
                if (self.props.tableCfg.display && self.props.tableCfg.display.expand) {
                    var tmpHtml = row['expand']; // data['html']
                    var extraHTML = self.createMarkup(tmpHtml);
                    var tdLen = 12;

                    var up = {
                        display: 'none'
                    };
                    TrRows.push(<tr style={up} key={'trexpand' + row['id']}><td ref={'expandtr' + row['id']} colSpan={tdLen}
                            dangerouslySetInnerHTML={self.createMarkup(tmpHtml)}></td></tr>);
                }
                return TrRows;
            });
            return rows;
        }
        else if (Immutable.Map.isMap(this.state.currPageData)) {
            var tdList = [];
            $.each(this.props.tableCfg.tags, function (key, value) {
                tdList.push(<td key={'td' + key} data-key={key}>{value}</td>);
            });
            if (self.state.cfg.checkBox) {
                tdList.unshift(<td key="checkbox"><input type="checkbox" onClick={self.checkAll()}/></td>);
            }
            return (
                <tr key="maptr">{tdList}</tr>
                );
        }else {
            return null;
        }
    },
    expandExtraInfo: function (event) {
        var target = $(event.target);
        var strClass = target.attr('class');
        var strTmpClass = (strClass === 'fa fa-plus') ? 'fa fa-minus' : 'fa fa-plus';
        var ref = this.refs['expandtr' + $(event.target).attr('data-key')];
        $(target).removeClass(strClass).addClass(strTmpClass);
        if (strTmpClass === 'fa fa-plus') {
            $(ref).parent('tr').slideUp();
        }else {
            $(ref).parent('tr').slideDown();
        }
    },
    createMarkup: function (htmlString) {
        return {
            __html: htmlString
        };
    },
    filterChange: function () {
        var strVal = this.refs.filter.getVal();
        // 过滤当前页
        var tableCfg = this.props.tableCfg;
        var self = this;
        if (strVal) {
            var content = this.state.content.toJS();
            var arrFilterData = [];
            for(var row of content) {
                var data = [];
                for(var val of Object.keys(self.props.tableCfg.tags)) {
                    data.push(row[val]);
                }
                var str = data.join('\n');
                if (str.match(strVal)) {
                    arrFilterData.push(row);
                }
            }
            // this.state.content是对全量的,如果是过来出来的数据分页怎么办
            var curData = arrFilterData.slice(0, this.cfg.size);
            var count = arrFilterData.length;
            this.refs.pagination.setCurrentIndex(1);
            this.setState({
                currPageData: Immutable.List(curData),
                count: count,
                filter: true,
                displayConent: Immutable.List(arrFilterData)});
        }else {
            this.refs.pagination.setCurrentIndex(1);
            var curData = this.state.content.slice(0, this.cfg.size);
            this.setState({currPageData: Immutable.List(curData), count: this.state.content.size, filter: false});
        }
    },
    closeSwitchTags: function (allTags, showTags) {
        this.showTags = showTags;
        this.setState({switchTags: false});            
    },
    switchTags: function (obj) {
        // 多个checkbox的如何获取
        this.setState({switchTags: true});                   
    },
    tableHeadGenerator: function () {
        var title = this.props.tableCfg.title || '';
        var filter = this.props.tableCfg.display ? this.props.tableCfg.display.filter : '';
        var display = this.props.tableCfg.display;
        var divList = [];
        if (title) {
            divList.push(<div key="table-title" className="table-header"><span>{title}</span></div>);
        }
        if (filter){
            var props = {
                name: 'filter',
                placeholder: '要过滤的内容',
                handleChange: this.filterChange
            };
            divList.push(<div className="header-extra" key="header-extra">
                    <i className="fa fa-filter"></i>
                    <ReactInput {...props} handleChange={this.filterChange} ref="filter"/>
            </div>);
        }
        if (display && display.switchTags) {
            divList.push(<div className="header-extra" onClick={this.switchTags}><i className="fa fa-cog"></i></div>);
        }
        return divList;
    },
    render: function () {
        var self = this;
        var totalPage = this.computePage();
        var modalCon = {
            type: 'checkbox'
        };
        return (
            <div className="panel panel-default reactTable">
                {this.state.switchTags && <ReactModal modalCon={modalCon} item={this.showTags} handleModalClick={this.setShowTags}/>}
                <div className="panel-heading">{this.tableHeadGenerator()}</div>
                <div className="panel-body">
                    <table hover={self.props.hover} className={this.cfg.tableClass}>
                        <ThRow tableCfg={this.props.tableCfg} checked={this.state.checkAll} checkAll={this.checkAll}/>
                        <tbody>
                            {self.trGenerator()}
                        </tbody>
                    </table>
                </div>
                <Pagination ref="pagination" pager={this.cfg.pager} changeData={self.changeData}
                totalData={this.state.count}
                totalPage={totalPage} size={this.cfg.size}/>
            </div>
            );
    }
});
 // export default Table;
 module.exports = Table;
/* eslint-enable fecs-camelcase */
