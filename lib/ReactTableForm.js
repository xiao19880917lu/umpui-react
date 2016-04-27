/**
 * @file Table中每行数据可以进行选择
 * @author luyongfang@baidu.com
 * */
var React = require('react');
var ReactDOM = require('react-dom');
var Utils = require('./utils/Utils.js');
import{Table, Panel, Col, Input} from 'react-bootstrap';
require('!style!css!sass!../sass/app/_reactTableForm.scss');
var ReactTableForm = React.createClass({
    getInitialState: function () {
        return {
            tableFormConfig: this.props.tableFormConfig
        };
    },
    generateHead: function (config) {
        var objCfg = this.state.tableFormConfig;
        var config = objCfg.config;
        var tdList = [];
        var preFix = Math.floor(Math.random(10) * 10);
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
    },
    handleSelClick: function (dex, pro) {
        if (pro === 'default') {
            return;
        }
        /*
         * 当点击select的时候，如果select的option对应的key，有对应option的map列表，则讲map列表渲染到defalut值框中(即select列表),defaultValueType=select
         * 否则不会做任何操作，保留原有的type类型，defaultValueType=input
         * */
        // 获取到他的值，如果是select的，则设置defaultValue type=select 否则input
        // 这里只针对一个select选择然后再选择其它的，如果有其它的就不好用了，如何封装,config就不应该只有一个defaultValue，而应该和其它选择相关,而二级的映射放在config中,因为只有一个select-option不会变化
        var val = this.refs[pro + '_' + dex].getValue();
        if (this.state.tableFormConfig[val]) {
            var tmp = {
                type: 'select',
                typeMap: this.state.tableFormConfig[val]
            };
            var defV = $.extend({}, this.state.tableFormConfig.config.default, tmp, true);
            var curParams = this.state.tableFormConfig.defaultParams[dex];
            curParams[pro] = 'select';
            curParams['defaultValueType'] = 'select';
        }else {
            var defV = this.state.tableFormConfig.config.default;
            // 用immutable-set应该挺好用的
            var tmpType = this.props.tableFormConfig.config[pro]['type'];
            this.state.tableFormConfig.defaultParams[dex][pro] = tmpType;
            this.state.tableFormConfig.defaultParams[dex]['defaultValueType'] = 'input';
        }
        var cfg = $.extend({}, this.state.tableFormConfig.config, {'default': defV}, true);
        var objConfig = $.extend({}, this.state.tableFormConfig, {
            config: cfg,
            defaultParams: this.state.tableFormConfig.defaultParams
        }, true);
        this.setState({tableFormConfig: objConfig});
    },
    handleBtnClick: function (dex, key) {
        let defV = this.props.tableFormConfig.defaultParams[0];
        let data = Utils.cloneObj(this.state.tableFormConfig.defaultParams);
        switch (key) {
            case 'add':
                let cloneDefV = $.extend({}, defV, true);
                data.push(cloneDefV);
                break;
            case 'del':
                data.splice(dex, 1);
                break;
        }
        // this.state.tableFormConfig.defaultParams = data;
        let tableCfg = $.extend({}, this.state.tableFormConfig, {defaultParams: data}, true);
        this.setState({tableFormConfig: tableCfg});
    },
    handleInputChange: function (dex, pro, ref) {
        let val = this.refs[ref].getValue();
        let jsonDefParams = JSON.stringify(this.state.tableFormConfig.defaultParams);
        let data = JSON.parse(jsonDefParams);
        data[dex][pro] = val;
        let tableCfg = $.extend({}, this.state.tableFormConfig, {defaultParams: data}, true);
        this.setState({tableFormConfig: tableCfg});
    },
    generateTbody: function () {
        var objCfg = this.state.tableFormConfig;
        var data = objCfg.defaultParams;
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
                        let ref = pro + '_' + dex;
                        tdList.push(<td key={key}><Input ref={ref} standalone type='input'
                                name={pro}  className="form-control" defaultValue={data[dex][pro]}
                                onChange={self.handleInputChange.bind(self, dex, pro, ref)}/></td>);
                        break;
                    case 'select':
                        var opList = [];
                        for (var i in objCfg.config[pro]['typeMap']) {
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
    },
    getFormValues: function () {
        var refs = this.refs;
        var data = [];
        for (var key in refs) {
            if (refs.hasOwnProperty(key)) {
                let arr = key.split('_');
                let val = this.refs[key].getValue();
                if (data[arr[1]]) {
                    data[arr[1]][arr[0]] = val;
                }else {
                    data[arr[1]] = {};
                    data[arr[1]][arr[0]] = val;
                }
            }
        }
        return data;
    },
    render: function () {
        console.log(1234);
        return (
                <Panel header={this.props.title}>
                    <Table responsive bordered className="tableForm">
                        <thead><tr>{this.generateHead()}</tr></thead>
                        <tbody>{this.generateTbody()}</tbody>
                    </Table>
                </Panel>
        );
    }
});

module.exports = ReactTableForm;
