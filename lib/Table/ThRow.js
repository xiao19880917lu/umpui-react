
/**
 * @file 简易表格组件 依赖Immutable和amazeUI
 * @author luyongfang@baidu.com
 * */
/* eslint-disable fecs-camelcase */
import React from 'react';
import ReactDOM from 'react-dom';
// import CheckBox from 'material-ui/lib/checkbox';
import {Router, Route, Link} from 'react-router';

const styles = {
    block: {
        maxWidth: 250
    },
    checkbox: {
        marginBottom: 16
    }
};
var ThRow = React.createClass({
    getInitialState: function () {
        return {
            checked: this.props.checked
        };
    },
    checkAll: function () {
        this.props.checkAll(!this.props.checked);
        this.setState({checked: !this.state.checked});
        return;
    },
    generatorRow: function () {
        var thList = [];
        $.each(this.props.showTags, function (key, value) {
            if (key === 'operation' && (value.display || value.display == undefined)) {
                thList.push(<th key={key}>操作</th>);
            }else if (typeof(value) === 'object' && (value.display || value.display === undefined)) {
                thList.push(<th key={key}>{value['title']}</th>);
            }else if (typeof(value) === 'string'){
                thList.push(<th key={key}>{value}</th>);
            }
        });
        var operationArr = [];
        if (this.props.tableCfg.cfg && this.props.tableCfg.cfg.checkBox) {
            operationArr.push(<span key="thcheckbox"><input type="checkbox"
                    checked={this.props.checked} onClick={this.checkAll}/></span>);
        }
        if (this.props.tableCfg.display && this.props.tableCfg.display.expand) {
            operationArr.push(<span key="thexpand"></span>);
        }
        if (operationArr.length > 0) {
            thList.unshift(<th key="operations">{operationArr}</th>);
        }
        return thList;
    },
    render: function () {
        var thList = this.generatorRow();
        return (<thead><tr>{thList}</tr></thead>);
    }
});
module.exports = ThRow;
