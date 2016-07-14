/**
 * @file Table中每行数据可以进行选择
 * @author luyongfang@baidu.com
 * */
import React from 'react';
import ReactDOM from 'react-dom';
import ReactCheckbox from './ReactCheckbox.js';
import {Table, Panel, Col, Input} from 'react-bootstrap';
let Utils = require('./utils/Utils.js');
require('!style!css!sass!../sass/app/_reactTableForm.scss');
export default class ReactTableForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableFormConfig: this.props.tableFormConfig
        };
    }
    generateHead() {
        let objCfg = this.state.tableFormConfig;
        let config = objCfg.config;
        let tdList = [];
        let preFix = Math.floor(Math.random(10) * 10);
        for (let pro in config) {
            if (pro === 'buttons') {
                tdList.push(<td key={pro + preFix}>
                    <span>操作</span>
                    <span key="add" className="fa fa-plus"
                    onClick={this.handleBtnClick.bind(this, 0, 'add')}></span>
                </td>);
                continue;
            }
            tdList.push(<td key={pro}>{config[pro]['name']}</td>);
        }
        return tdList;
    }
    handleSelClick(dex, pro) {
        if (pro === 'default') {
            return;
        }
        let val = this.refs[pro + '_' + dex].getValue();
        let defV = {};
        if (this.state.tableFormConfig[val]) {
            let tmp = {
                type: 'select',
                typeMap: this.state.tableFormConfig[val]
            };
            defV = Object.assign({}, this.state.tableFormConfig.config.default, tmp, true);
            let curParams = this.state.tableFormConfig.defaultParams[dex];
            curParams[pro] = 'select';
            curParams['defaultValueType'] = 'select';
        } else {
            defV = this.state.tableFormConfig.config.default;
            // 用immutable-set应该挺好用的
            let tmpType = this.props.tableFormConfig.config[pro]['type'];
            this.state.tableFormConfig.defaultParams[dex][pro] = tmpType;
            this.state.tableFormConfig.defaultParams[dex]['defaultValueType'] = 'input';
        }
        let cfg = Object.assign({}, this.state.tableFormConfig.config, {'default': defV}, true);
        let objConfig = Object.assign({}, this.state.tableFormConfig, {
            config: cfg,
            defaultParams: this.state.tableFormConfig.defaultParams
        }, true);
        this.setState({tableFormConfig: objConfig});
    }
    handleBtnClick(dex, key) {
        let defV = this.props.tableFormConfig.defaultParams[0];
        let data = Utils.cloneObj(this.state.tableFormConfig.defaultParams);
        switch (key) {
            case 'add':
                let cloneDefV = Object.assign({}, defV, true);
                data.push(cloneDefV);
                break;
            case 'del':
                data.splice(dex, 1);
                break;
        }
        let tableCfg = Object.assign({}, this.state.tableFormConfig, {defaultParams: data}, true);
        this.setState({tableFormConfig: tableCfg});
    }
    generateTbody() {
        let objCfg = this.state.tableFormConfig;
        let data = objCfg.defaultParams;
        let self = this;
        let trList = [];
        for (let dex = 0, len = data.length; dex < len; dex ++) {
            let tdList = [];
            for (let pro in data[dex]) {
                if (pro === 'defaultValueType') {
                    continue;
                }
                let key = pro + '_' + dex;
                let type = (pro === 'default') ? data[dex]['defaultValueType'] : objCfg.config[pro]['type'];
                switch (type) {
                    case 'input':
                        tdList.push(<td key={key}><Input ref={pro + '_' + dex} standalone type='input'
                                name={pro}  className="form-control" defaultValue={data[dex][pro]}/></td>);
                        break;
                    case 'select':
                        let opList = [];
                        for (let i in objCfg.config[pro]['typeMap']) {
                            if (objCfg.config[pro]['typeMap'].hasOwnProperty(i)) {
                                opList.push(<option key={key + i} value={i}>{objCfg.config[pro]['typeMap'][i]}
                                        </option>);
                            }
                        }
                        tdList.push(<td key={key}><Input ref={pro + '_' + dex} standalone type="select" name={pro}
                                className="form-control m-b" onClick={self.handleSelClick.bind(self, dex, pro)}>
                            {opList}
                            </Input></td>);
                        break;
                    case 'textarea':
                        tdList.push(<td key={key}><Input type="textarea" disabled ref={pro + '_' + dex} name={pro}
                                defaultValue={data[dex][pro]}/></td>);
                        break;
                }
            }
            if (objCfg.config['buttons']) {
                let arBtns = objCfg.config['buttons'];
                let iBtns = [];
                for (let key in arBtns) {
                    if (arBtns.hasOwnProperty(key)) {
                        iBtns.push(<i key={'bt' + key} className={arBtns[key]}
                                onClick={self.handleBtnClick.bind(self, dex, key)}></i>);
                    }
                }
                tdList.push(<td key='bt'>{iBtns}</td>);
            }
            trList.push(<tr key={'tr' + dex}>{tdList}</tr>);
        }
        return trList;
    }
    getFormValues() {
        let refs = this.refs;
        let data = [];
        for (let key in refs) {
            if (refs.hasOwnProperty(key)) {
                let arr = key.split('_');
                let val = this.refs[key].getValue();
                if (data[arr[1]]) {
                    data[arr[1]][arr[0]] = val;
                } else {
                    data[arr[1]] = {};
                    data[arr[1]][arr[0]] = val;
                }
            }
        }
        return data;
    }
    render() {
        return (
            <Panel header={this.props.title}>
                <Table responsive bordered className="tableForm">
                    <thead><tr>{this.generateHead()}</tr></thead>
                    <tbody>{this.generateTbody()}</tbody>
                </Table>
            </Panel>
        );
    }
}
