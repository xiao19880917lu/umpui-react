/**
 * @file 文档页面的配置数据
 * */
import React from 'react';
import Edit from '../components/Edit.js';
import Del from '../components/Del.js';
const operaClick = {
    editClick(d, data) {
        console.log('edit');
        console.log(data);
    },
    delClick(d, data) {
        console.log('del');
        console.log(data);
        // 提供默认的配置吗?还是全部都是用户自己定义
    }
};
const PageData = {
    tipsModal: {
        modalCon: {
            type: 'tip',
            msg: '提示信息'
        }
    },
    formModal: {
        modalCon: {
            type: 'form'
        },
        item: {
            config: [ // 配置要展示的form列表
                {
                    type: 'input',
                    label: '转交给:',
                    name: 'take_person', // 必须,用来获取表单值上传给父组件的值
                    isEmpty: false,
                    validate: 'string',
                    desc: '请输入邮箱前缀'
                }, {
                    type: 'select',
                    label: '转交原因',
                    name: 'reason',
                    isEmpty: false,
                    validate: 'string',
                    map: [{label: '请选择', value: '请选择'}, {label: '休假', value: '休假'},
                        {label: '非本人值班', value: '非本人值班'},
                        {label: '技术困难', value: '技术困难'},
                        {label: '专业不匹配', value: '专业不匹配'},
                        {label: '职责不匹配', value: '职责不匹配'},
                        {label: '临时有事', value: '临时有事'}]
                }, {
                    type: 'datetime',
                    label: '到',
                    name: 'endTime',
                    viewMode: 'datetime'
                }
            ]
        }
    },
    ckListModal: {
        modalCon: {
            type: 'checkbox'
        },
        item: {
            id: 'ID',
            name: {
                title: '姓名',
                display: false
            },
            desc: '描述'
        }
    },
    sliderConfig: {
        title: '执行工具接口说明',
        preBtn: true,
        // lineNum: 5,
        // search: true,
        sliderStepsConfig: [{
            formConfig: [{
                type: 'input',
                label: 'widget名字',
                inputType: 'text',
                ref: 'widget_name',
                fill: true,
                placeholder: 'widget_name的方法',
                validate: {
                    preg: '^s',
                    errMsg: '以s开头'
                }
            }, {
                type: 'input',
                label: 'widget接入的url',
                inputType: 'text',
                ref: 'widget_url',
                fill: true,
                placeholder: 'widget-url'
            }]
        }, {
            formConfig: [{
                type: 'select',
                label: '接口类型',
                ref: 'widget_base1',
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
                ref: 'widget_base2',
                fill: true,
                placeholder: '工具执行方法或url'
            }, {
                type: 'datetime',
                label: '开始时间',
                ref: 'startTime',
                fill: true,
                viewMode: 'datetime'
            }]
        }]
    },
    table: {
        tableCfg: {
            title: 'Table前端分页表格测试',
            name: 'testtable',
            tags: {
                id: 'ID',
                username: '用户名',
                passwd: {
                    title: '密码',
                    render: function render(v, row) {
                        let style = {
                            color: 'red'
                        };
                        return React.createElement(
                            'span',
                            {style: style},
                            v
                        );
                    }
                },
                html: {
                    title: '展示html',
                    type: 'html'
                },
                desc: {
                    title: '描述',
                    display: false,
                    type: 'edit'
                },
                json: {
                    type: 'JSON',
                    title: 'json test'
                },
                operation: {
                    title: '查看详情',
                    links: [{
                        // 链接的方式
                        title: '查看详情AAAA',
                        link: function link(d, data) {
                            let toLink = '/CaseDetail/' + data['id'];
                            return {
                                basicLink: toLink
                            };
                        },
                        beforeLink: function beforeLink(d, data) {
                            window.currentDetail = data;
                            localStorage.setItem('currentDetail', JSON.stringify(window.currentDetail));
                        }
                    }],
                    render: function render(d, data) {}
                },
                cusOperation: {
                    title: '自定义操作',
                    actions: [
                        {
                            title: '编辑',
                            color: '',
                            onClick: operaClick.editClick,
                            component: Edit
                        },
                        {
                            title: '删除',
                            color: '',
                            onClick: operaClick.delClick,
                            component: Edit
                        }
                    ]
                }
            },
            detailCfg: {
                editCfg: {
                    url: '/business/modifyTitle',
                    filed: {
                        desc: {
                            label: '描述',
                            isEmpty: false,
                            validate: 'string'
                        }
                    }
                }
            },
            cfg: {
                pager: true,
                size: 2,
                checkBox: true
            },
            display: {
                //  'expand': true,
                'sort': true,
                'filter': true,
                'export': true,
                'switchTags': true,
                'tips': true,
                'expand': true,
                'setPageSize': true,
                'refresh': true
            }
        },
content:[{html: "<a href='http://www.baidu.com' target='_blank'>点击链接<a/>", username: 'luyongfang', passwd: 'xiaolu', expand: '<strong>任意的html片段</strong>', desc: 'ABC', tips: '不能选择!', json: {a: 1, b: 2}},{username: 'luyongfang123'}, {disabled: true, id: 1, html: "<a href='http://www.baidu.com' target='_blank'>点击链接<a/>", username: 'luyongfang', passwd: 'xiaolu', expand: '<strong>任意的html片段</strong>', desc: 'ABC', tips: '不能选择!', json: {a: 1, b: 2}}, {id: 2, username: 'wangyang21', passwd: 'wangyang21', expand: '<button>BUTTON</button>', desc: 'ERT'}, {id: 3, tips: '真的不能选择', disabled: true, username: 'liuxiaoyu', passwd: 'xiaoyu', expand: '333', desc: 'EFG'}, {id: 4, username: 'zhangchunyu', passwd: 'xiaoyu', expand: 'ddff', desc: 'QWE'}, {id: 5, username: 'wangyang21', passwd: 'wangyang21', expand: 'ssdd', desc: 'ERT'}, {id: 6, username: 'wangyang21XXX', passwd: 'wangyang21', expand: 'ssdd', desc: 'ERT'}, {id: 7, username: 'wangyang21YYY', passwd: 'wangyang21', expand: 'ssdd', desc: 'ERT'}, {id: 8, username: 'wangyang21QQQ', passwd: 'wangyang21', expand: 'ssdd', desc: 'ERT'}, {id: 9, username: 'wangyang21RRR', passwd: 'wangyang21', expand: 'ssdd', desc: 'ERT'}, {id: 10, username: 'wangyang21TTT', passwd: 'wangyang21', expand: 'ssdd', desc: 'ERT'}, {id: 11, username: 'wangyang21YYY', passwd: 'wangyang21', expand: 'ssdd', desc: 'ERT'}, {disabled: true, tips: '流程中不能选择', id: 12, username: 'luyongfang', passwd: 'xiaolu', expand: 'sss', desc: 'ABC'}, {id: 13, username: 'luyongfang', passwd: 'xiaolu', expand: 'sss', desc: 'ABC'}, {id: 14, username: 'luyongfang', passwd: 'xiaolu', expand: 'sss', desc: 'ABC'}]
    },
    form: {
        formConfig: [{
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
            },
            defaultValue: 'rmsOpen'
        }, {
            type: 'input',
            label: '调用方法',
            inputType: 'text',
            ref: 'api_method',
            fill: true,
            defaultValue: 'xiaolu',
            placeholder: '工具执行方法或url, 视api类型而定, http形式即为合法url, rms开放平台或rpc即为方法名称(方法名称不需要携带括号)'
        }, {
            type: 'select',
            label: '接口类型',
            ref: 'api_type1',
            inputType: 'select',
            placeholder: 'tool name',
            fill: true,
            opMap: {
                all: '请选择',
                rmsOpen: '开放平台',
                phpRpc: 'RPC调用方式',
                httpRestful: 'restfull接口',
                hprose: 'Hprose方式'
            },
            defaultValue: 'hprose'
        }, {
            type: 'input',
            label: '调用方法Test',
            inputType: 'text',
            ref: 'api_method_test',
            fill: true,
            defaultValue: 'method 2',
            placeholder: '工具执行方法或url, 视api类型而定, http形式即为合法url, rms开放平台或rpc即为方法名称(方法名称不需要携带括号)'
        }, {
            type: 'datetime',
            label: '开始时间',
            ref: 'startTime',
            fill: true
        }]
    },
    tableForm: {
        config: {
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
        },
        defaultParams: [{
            'label': 'TEST_TEST',
            'type': 'input',
            'name': 'username',
            'default': '',
            'defaultValueType': 'input'
        }],
        noc: {
            key1: 'KEY1',
            key2: 'KEY2'
        }
    },
    ckbox: {
        checked: true,
        label: 'checkbox-label'
    }
};

export default PageData;
