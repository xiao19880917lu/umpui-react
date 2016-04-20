/**
 * @file 针对Case中的每条记录展开的详情页面
 * @author luyongfang@baidu.com
 * */
var React = require('react');
var ReactDOM = require('react-dom');
var Table = require('../lib/Table/Table.js');
var ReactCheckbox = require('../lib/ReactCheckbox.js').default;
var ReactTableForm = require('../lib/ReactTableForm.js');
var ReactForm = require('../lib/ReactForm.js');
var ReactModal = require('../lib/ReactModal.js');
// 已经有数据展示Table
// require("!style!css!sass!./src/styles/_base.scss");
var props = {
    tableCfg: {
        title: 'table title test',
        tags: {
            id: 'ID',
            username: '用户名',
            passwd: '密码',
            desc: {
                title: '描述',
                display: false
            }
        },
        expand: true,
        sort: true,
        filter: true,
        cfg: {
            pager: true,
            size: 2,
            checkBox: true
        },
        display: {
            switchTags: true         
        } 
    },
content: [{id: 1, username: 'luyongfang', passwd: 'xiaolu', expand: 'sss', desc: 'ABC'},{id: 2, username: 'liuxiaoyu', passwd: 'xiaoyu', expand: '333',desc: 'EFG'},{id: 3, username: 'wangyang21', passwd: 'wangyang21', expand: 'ssdd', desc: 'ERT'},{id: 4,  username: 'zhangchunyu', passwd: 'xiaoyu', expand: 'ddff',desc:'QWE'}]
};
// 通过URL展示数据,访问JSON文件返回
var props1 = {
    tableCfg: {
        title: 'table Title example',
        url: 'http://www.baidu.com/demo/data.json',
        expand: true,
        tags: {
            id: 'ID',
            username: '用户名',
            passwd: '密码'
        },
        cfg: {
            pager: true,
            size: 15 
        } 
    }
};
// checkbox props
// 获取checkbox是否选中 refs['ref'].getVal();
var checkboxProps = {
    checked: true,
    label: 'checkbox-label'
};
// 自动增删填写字段列表
/* defaultParams 为默认提供的参数，该组件不会对数据进行校验，校验的工作交给业务来做
 * defaultValueType 如果提供了默认值(除日期外) 会展示默认值
 * buttons的样式是用font-awesome字体
 * default默认参数值，必须为default
 * 如果config中的对象的type为'select' 则需要提供typeMap字段值(即option列表),[如果typeMap中的key字段还有相应的map字段(noc)，则会渲染到默认参数值字段]
 * 获取form表单的值 getFormValues 返回的是[{key0: v},{key1: v1}]
*/
var tableFormConfig = (function () {
    var config = {
        'label': {
            name: 'label标签名',
            type: 'input'
        },
        'type': {
            name: '参数类型',
            type: 'select',
            typeMap: {
                input: 'input输入框',
                date: '日期输入框',
                noc: 'noc资源',
                textarea: '文本区域输入框'
            }
        },
        'name': {
            name: '参数字段名',
            type: 'input'
        },
        'default': {
            name: '默认参数值',
            type: 'input'
        },
        'buttons': {
            add: 'fa fa-plus',
            del: 'fa fa-minus'
        }
    };
    var defaultParams = [{
        'label': 'TEST_TEST',
        'type': 'input',
        'name': 'username',
        'default': '',
        'defaultValueType': 'input'
    }];
    return {
        config: config,
        defaultParams: defaultParams,
        noc: {
            key1: 'KEY1',
            key2: 'KEY2'
        }
    };
})();
var formConfig = {
    title: '执行工具接口说明',
    formConfig: [
        {
            type: 'select',
            label: '接口类型',
            ref: 'api_type',
            inputType: 'select',
            placeholder: 'tool name',
            fill: true,
            opMap: {
                all: '请选择',
                rmsOpen: '开放平台',
                phpRpc: 'RPC调用方式',
                httpRestful: 'restfull接口',
                hprose: 'Hprose方式'
            }
        }, {
            type: 'input',
            label: '调用方法',
            inputType: 'text',
            ref: 'api_method',
            fill: true,
            placeholder: '工具执行方法或url, 视api类型而定, http形式即为合法url, rms开放平台或rpc即为方法名称(方法名称不需要携带括号)'
        }
    ]
};
/**
 * @desc modal层
 * type: 有如下选项
 * 1. tip/warning: modalCon = {type: 'tip/warning': msg: '要显示的信息'}
 * 2. form： modalCon = {type: 'form': config:[]}
 * */
var modalCon1 = {
    type: 'tip',
    msg: '提示信息'
};
var modalCon2 = {
    type: 'form'
};
var modalData2 = {
    config: [
        {
            type: 'input',
            label: '转交给:',
            name: 'take_person',
            isEmpty: false,
            validate: 'string',
            desc: '请输入邮箱前缀'
        },
        {
            type: 'select',
            label: '转交原因',
            name: 'reason',
            isEmpty: false,
            validate: 'string',
            map: {
                '请选择': '请选择',
                '休假': '休假',
                '非本人值班': '非本人值班',
                '技术困难': '技术困难',
                '专业不匹配': '专业不匹配',
                '职责不匹配': '职责不匹配',
                '临时有事': '临时有事'
            }
        }
    ]
};
var modalCon3 ={
    type: 'checkbox' // 可以为
};
var modalData3 = {
    id: 'ID',
    name: '姓名',
    desc: '描述'
};
// modal end
var App = React.createClass({
    getInitialState: function () {
        return {
            modal1: false,
            modal2: false,
            modal3: false
        }
    },
    handleModalClick: function () {
        console.log('在这里接收参数进行处理,在modal组件中如果父组件传递了handleModalClick 则会调用父组件的这个事件进行请求');
    },
    handleClick: function (data) {
        switch(data) {
            case 1:
                this.setState({
                        modal1: !this.state.modal1,
                        modal2: false,
                        modal3: false
                    });
                break;
            case 2:
                this.setState({
                        modal1: false,
                        modal2: !this.state.modal2,
                        modal3: false
                    });
                break;
            case 3:
                this.setState({
                    modal1: false,
                    modal2: false,
                    modal3: !this.state.modal3
                });
                break;
            default:
                break;
        }
        this.setState({modal: !this.state.modal});
        console.log(1234);
    },    
    render: function () {
        return <div className="main">
                <div><Table {...props} ref="table"/></div>
                <div><ReactCheckbox {...checkboxProps} ref="checkbox"/></div>
                <div><ReactTableForm ref="tableForm" tableFormConfig={tableFormConfig} title="执行工具接口参数配置"/></div>
                <div><ReactForm ref="apiForm" config={formConfig}/></div>
                <div>
                    <button onClick={this.handleClick.bind(this,1)}>toggle modal1</button>
                    {this.state.modal1 && <ReactModal modalCon={modalCon1} handleModalClick={this.handleModalClick}/>}
                </div>
                <div>
                    <button onClick={this.handleClick.bind(this,2)}>toggle modal2</button>
                    {this.state.modal2 && <ReactModal modalCon={modalCon2} item={modalData2} handleModalClick={this.handleModalClick}/>}
                </div>
                <div>
                    <button onClick={this.handleClick.bind(this,3)}>toggle modal3</button>
                    {this.state.modal3 && <ReactModal modalCon={modalCon3} item={modalData3} handleModalClick={this.handleModalClick}/>}
                </div>
            </div>
        }
    });
ReactDOM.render(<App />, document.getElementById('container'));
