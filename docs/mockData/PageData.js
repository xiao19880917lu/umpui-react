/**
 * @file 文档页面的配置数据
 * */
import React from 'react';
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
    ListData: {
        '姓名': 'lyf',
        '性别': 'girl',
        '工作': 'IT engineer',
        '爱好': 'dance'
    },
    ListData2: {
        tags: {
            id: 'ID',
            hostname: '主机名',
            sn: 'SN',
            status: {
                title: '状态',
                render(d, ds) {
                    if (d * 1 === 1) {
                        return <span style={{'color': 'green'}}><a>{'正常运行'}</a></span>;
                    } else if (d * 1 === 14) {
                        return <span style={{'color': 'red'}}><a>{'流程处理中'}</a></span>;
                    }
                }
            },
            rack: '机架位'
        },
        showKeys: ['id', 'hostname', 'sn', 'status'],
        data: {
            id: 12345,
            hostname: 'cq01-iknow-doc59.cq01',
            sn: '06RAW53',
            status: 14,
            rack: 'YQ01-RTYU'
        },
        isKeyMap: true
    },
    NavData: [
        {
            text: '操作中心',
            frontIcon: 'fa fa-wrench',
            link: 'baidu',
            children: [
                {
                    text: '我的case',
                    frontIcon: 'fa fa-user'
                },
                {
                    text: '全部case',
                    frontIcon: 'fa fa-sun-o'
                },
                {
                    text: '历史case',
                    frontIcon: 'fa fa-history'
                },
                {
                    text: '关注case',
                    frontIcon: 'fa fa-eye'
                }
            ]
        },
        {
            text: '百度首页',
            frontIcon: 'fa fa-gear',
            url: 'http://www.baidu.com'
        },
        {
            text: 'RMS平台',
            frontIcon: 'fa fa-line-chart',
            url: 'http://rms.baidu.com'
        }
    ],
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
    tabData: {
        tabMap: ['tab1-name', 'tab2-name', 'tab3-name'],
        tabcMap: ['tab1-con', 'tab2-con', 'tab3-con'],
        iconList: ['fa fa-list', 'fa fa-arrows', 'fa fa-anchor'],
        isCusOperation: true,
        className: 'fa fa-flag',
        activeId: 1
    },
    ckListModal: {
        modalCon: {
            type: 'checkbox',
            direction: 'horizontal'
        },
        item: {
            id: 'ID',
            name: {
                title: '姓名',
                display: false
            },
            desc: '描述',
            test1: 'TEST1',
            test2: {
                title: 'TEST2',
                display: false
            }
        }
    },
    sliderConfig: {
        preBtn: true,
        sliderStepsConfig: [{
            removeIcon: true,
            removebtn: false,
            title: 'My Dashboards',
            btnText: [{
                    text: 'New Dashboards',
                    nextFormId: 'newDashboard'
                }, {
                    text: 'Add Widgets',
                    nextFormId: 'addWidget'
                }
            ],
            formId: 'dashboards',
            formConfig: [{
                type: 'list',
                inputType: 'text',
                ref: 'dashboards',
                placeholder: 'Dashboard Name',
                list: [
                    {
                        name: 'dashboard1',
                        id: 1
                    }, {
                        name: 'dashboard2',
                        id: 2
                    }, {
                        name: 'dashboard3',
                        id: 3
                    }
                ],
                trashIcon: true,
                validate: {
                    // preg: '^s',
                    errMsg: '以s开头'
                }
            }]
        }, {
            removeIcon: true,
            removebtn: false,
            title: 'New Dashboard',
            formId: 'newDashboard',
            formConfig: [{
                type: 'input',
                label: 'Dashboard名字',
                inputType: 'text',
                ref: 'dashboard_name',
                fill: true,
                placeholder: 'Dashboard Name',
                validate: {
            //        preg: '^s',
                    errMsg: '以s开头'
                }
            }, {
                type: 'input',
                label: 'Dashboard描述',
                inputType: 'text',
                ref: 'dashboard_description',
                fill: true,
                placeholder: 'Dashboard Description'
            }, {
                type: 'checkbox',
                label: 'Dashboard默认显示',
                ref: 'dashboard_selected',
                checked: false
            }]
        }, {
            title: 'Add Widgets',
            url: 'www.baidu.com',
            removeIcon: true,
            removebtn: false,
            formId: 'addWidget',
            isFinal: true,
            formConfig: [{
                type: 'input',
                label: 'Widget名字',
                inputType: 'text',
                ref: 'widget_name',
                fill: true,
                placeholder: 'Widget Name',
                validate: {
            //        preg: '^s',
                    errMsg: '以s开头'
                }
            }, {
                type: 'multiSelect',
                label: '类型',
                inputType: 'select',
                ref: 'widget_type',
                fill: true,
                isMulti: true,
                FirstMap: {
                    125: '业务/网络视图',
                    126: '告警和事件'
                },
                SecondMap: {
                    125: {
                        127: '业务视图',
                        128: '网络视图'
                    },
                    126: {
                        130: '消息中心'
                    }
                }
            }
            // {
            //     type: 'select',
            //     label: 'Widget类型',
            //     inputType: 'select',
            //     ref: 'widget_type',
            //     fill: true,
            //     placeholder: 'Widget Type',
            //     opMap: {
            //         all: '请选择',
            //         rmsOpen: '开放平台',
            //         phpRpc: 'RPC调用方式',
            //         httpRestful: 'restfull接口',
            //         hprose: 'Hprose方式'
            //     },
            //     defaultValue: 'hprose'
            // }
            ]
        }]
    },
//    sliderConfig: {
//        title: '执行工具接口说明',
//        preBtn: true,
//        // lineNum: 5,
//        // search: true,
//        sliderStepsConfig: [{
//            removeIcon: true,
//            removebtn: false,
//            title: 'My Dashboards',
//            btnText: [{
//                text: 'New Dashboards',
//                nextFormId: 'newDashboard'
//                }, {
//                text: 'Add Widgets',
//                nextFormId:'addWidget'
//            }],
//            formId: 'dashboards',
//            formConfig: [{
//                type: 'input',
//                label: 'widget名字',
//                inputType: 'text',
//                ref: 'widget',
//                fill: true,
//                placeholder: 'widget_name的方法',
//                validate: {
//            //      preg: '^s',
//                    errMsg: '以s开头'
//                }
//            }, {
//                type: 'input',
//                label: 'widget接入的url',
//                inputType: 'text',
//                ref: 'widget_url',
//                fill: true,
//                placeholder: 'widget-url'
//            }]
//        }, {
//            removeIcon: true,
//            removebtn: false,
//            title: 'New Dashboard',
//            formId:'newDashboard',
//            isFinal: true,
//            formConfig: [{
//                type: 'select',
//                label: '接口类型',
//                ref: 'widget_base1',
//                inputType: 'select',
//                placeholder: 'tool name',
//                fill: true,
//                opMap: {
//                    all: '请选择',
//                    rmsOpen: '开放平台',
//                    phpRpc: 'RPC调用方式',
//                    httpRestful: 'restfull接口',
//                    hprose: 'Hprose方式'
//                }
//            }, {
//                type: 'input',
//                label: '调用方法',
//                inputType: 'text',
//                ref: 'widget_base2',
//                fill: true,
//                placeholder: '工具执行方法或url'
//            }, {
//                type: 'datetime',
//                label: '开始时间',
//                ref: 'startTime',
//                fill: true,
//                viewMode: 'datetime'
//            }]
//        }, {
//            title: 'Add Widgets',
//            url:'www.baidu.com',
//            removeIcon: true,
//            removebtn: false,
//            formId: 'addWidget',
//            isFinal: true,
//            formConfig: [{
//                type: 'input',
//                label: 'Widget名字',
//                inputType: 'text',
//                ref: 'widget_name',
//                fill: true,
//                placeholder: 'Widget Name',
//                validate: {
//            //        preg: '^s',
//                    errMsg: '以s开头'
//                }
//            }, {
//                type: 'select',
//                label: 'Widget类型',
//                inputType: 'select',
//                ref: 'widget_type',
//                fill: true,
//                placeholder: 'Widget Type',
//                opMap: {
//                    all: '请选择',
//                    rmsOpen: '开放平台',
//                    phpRpc: 'RPC调用方式',
//                    httpRestful: 'restfull接口',
//                    hprose: 'Hprose方式'
//                },
//                defaultValue: 'hprose'
//            }]
//        }]
//    },
    table: {
        tableCfg: {
            title: 'Table前端分页表格测试',
            name: 'testtable',
            tags: {
                id: 'ID',
                username: {
                    title: '用户名',
                    sort: true,
                    editCfg: {
                        edit: true,
                        elemType: 'text'
                    }
                },
                passwd: {
                    title: '密码',
                    sort(row1, row2) {
                        if (row1['passwd'] < row2['passwd']) {
                            return 1;
                        } else if (row1['passwd'] > row2['passwd']) {
                            return -1;
                        } else {
                            return 0;
                        }
                    },
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
                sex: {
                    title: '性别',
                    editCfg: {
                        edit: true,
                        elemType: 'radioGroup',
                        options: [
                            {label: '女', value: 'femal'},
                            {label: '男', value: 'male'}
                        ]
                    }
                },
                like: {
                    title: '爱好',
                    editCfg: {
                        edit: true,
                        elemType: 'checkbox',
                        options: [
                            {label: '苹果', value: 'apple'},
                            {label: '香蕉', value: 'banana'},
                            {label: '梨子', value: 'pear'}
                        ]
                    }
                },
                marry: {
                    title: '是否结婚',
                    editCfg: {
                        edit: true,
                        elemType: 'radio'
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
                    title: 'json test',
                    display: false
                },
                cusOperation: {
                    title: '自定义操作',
                    actions: [
                        {
                            title: '编辑',
                            color: '',
                            onClick: operaClick.editClick
                        },
                        {
                            title: '删除',
                            color: '',
                            onClick: operaClick.delClick
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
                pagerCfg: {
                    jump: true,
                    showPageNum: 2,
                    showFirstLast: true,
                    type: 'text',
                    showCount: true
                },
                size: 1,
                checkBox: true
            },
            display: {
                'filter': true,
                'export': true,
                'switchTags': true,
                'tips': true,
                'expand': true,
                'setPageSize': true,
                'refresh': true,
                'editTable': true,
                'fullScreen': true
            }
        },
        content: [
            {
                id: 0,
                html: '<a href="http://www.baidu.com" target="_blank">百度<a/>',
                sex: 'femal',
                like: 'apple,banana,pear',
                marry: '否',
                username: 'luyongfang',
                passwd: 'xiaolu',
                expand: '<strong>任意的html片段</strong>',
                desc: 'ABC',
                tips: '不能选择!',
                json: {a: 1, b: 2}
            }, {
                id: 1,
                html: '<a href="http://www.baidu.com" target="_blank">百度<a/>',
                sex: 'male',
                like: 'apple,pear',
                marry: '是',
                username: 'zhuyu02',
                passwd: 'zhuyu02',
                expand: '<strong>任意的html片段</strong>',
                desc: '幽默大师',
                tips: '说个笑话!',
                json: {a: 1, b: 2}
            }, {
                id: 2,
                html: '<a href="http://www.baidu.com" target="_blank">百度<a/>',
                sex: 'male',
                marry: '是',
                like: 'pear',
                username: 'zhuyu02',
                disabled: true,
                passwd: 'zhuyu02',
                expand: '<strong>任意的html片段</strong>',
                desc: '幽默大师',
                tips: '说个笑话!',
                json: {a: 1, b: 2}
            }, {
                id: 3,
                html: '<a href="http://www.baidu.com" target="_blank">百度<a/>',
                sex: 'male',
                marry: '是',
                like: 'banana,pear',
                username: 'wangyang21',
                passwd: 'wangyang21',
                expand: '<strong>任意的html片段</strong>',
                desc: '自称咸鱼',
                tips: '爱豪说为啥不是死鱼!',
                json: {a: 1, b: 2}
            }]
    },
    pagination: {
        pager: true,
        totalPage: 20,
        totalData: 40,
        jump: true,
        showPageNum: 3,
        showFirstLast: true,
        type: 'text',
        showCount: true
    },
    form: {
        title: 'ReactForm',
        removeIcon: true,
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
        }, {
            type: 'checkbox',
            label: '勾选框',
            checked: true,
            ref: 'isSelCheckbox'
        }, {
            type: 'multiSelect',
            label: '类型',
            inputType: 'select',
            ref: 'widget_type',
            fill: true,
            isMulti: true,
            FirstMap: {
                125: '业务/网络视图',
                126: '告警和事件'
            },
            SecondMap: {
                125: {
                    127: '业务视图',
                    128: '网络视图'
                },
                126: {
                    130: '消息中心'
                }
            }
        }, {
            type: 'multiSelect',
            label: '类型',
            inputType: 'select',
            ref: 'edit_widget_type',
            fill: true,
            isMulti: false,
            FirstMap: {
                125: '业务/网络视图',
                126: '告警和事件'
            },
            SecondMap: {
                125: {
                    127: '业务视图',
                    128: '网络视图'
                },
                126: {
                    130: '消息中心'
                }
            }
        }, {
            type: 'list',
            ref: 'dashboards',
            list: [
                {
                    name: 'dashboard1',
                    id: 1
                }, {
                    name: 'dashboard2',
                    id: 2
                }, {
                    name: 'dashboard3',
                    id: 3
                }
            ],
            trashIcon: true
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
                    textarea: '文本区域输入框',
                    checkbox: '勾选框'
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
    },
    widget: [{
        id: 'objWidgetConf1',
        headConf: {
            widgetName: 'Flow Viewi1',
            operationConf: {
                'refresh': 'fa fa-refresh',
                'expand': 'fa fa-expand',
                'edit': 'fa fa-pencil-square-o',
                'delete': 'fa fa-trash'
            }
        },
        bodyConf: [{
            bodyId: 'bodyConf1_1',
            bodyType: 'text',
            bodyContent: '12345'
        }, {
            bodyId: 'bodyConf1_2',
            bodyType: 'text',
            bodyContent: '23456'
        }]
    }, {
        id: 'objWidgetConf2',
        headConf: {
            widgetName: 'Flow View2',
            operationConf: {
                'refresh': 'fa fa-refresh',
                'expand': 'fa fa-expand',
                'edit': 'fa fa-pencil-square-o',
                'delete': 'fa fa-trash'
            }
        },
        bodyConf: [{
            bodyId: 'bodyConf2_1',
            bodyType: 'text',
            bodyContent: 'abcdefg'
        }, {
            bodyId: 'bodyConf1_2',
            bodyType: 'text',
            bodyContent: 'efghigk'
        }]
    }],
    newWidget: [{
        id: 'objWidgetConf4',
        headConf: {
            widgetName: 'Flow View4',
            operationConf: {
                'refresh': 'fa fa-refresh',
                'expand': 'fa fa-expand',
                'edit': 'fa fa-pencil-square-o',
                'delete': 'fa fa-trash'
            }
        },
        bodyConf: [{
            bodyId: 'bodyConf4',
            bodyType: 'text',
            bodyContent: 'fghij'
        }]
    }],
    editWidget: [{
        id: 'objWidgetConf4',
        headConf: {
            widgetName: 'Flow View10',
            operationConf: {
                'refresh': 'fa fa-refresh',
                'expand': 'fa fa-expand',
                'edit': 'fa fa-pencil-square-o',
                'delete': 'fa fa-trash'
            }
        },
        bodyConf: [{
            bodyId: 'bodyConf4_5',
            bodyType: 'text',
            bodyContent: 'zxcvbbnb'
        }]
    }],
    reactHighcharts: {
        xAxis: {
            categories: ['Jan', 'Fed', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        plotOptions: {
            series: {
                point: {
                    events: {
                        mouseOver() {
                        }
                    }
                }
            }
        },
        tooltip: {
            shared: true,
            crosshairs: {
                width: 1,
                color: 'gray',
                dashStyle: 'Solid'
            }
        },
        series: [{
                name: 'Tokyo',
                data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
            }, {
                name: 'New York',
                data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
            }, {
                name: 'Berlin',
                data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
            }, {
                name: 'London',
                data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
            }
        ]
    },
    reactHighstock: {
        rangeSelector: {
            selected: 1
        },
        title: {
            text: 'AAPL Stock Price'
        },
        legend: {
            enabled: true,
            align: 'right',
            backgroundColor: '#FCFFC5',
            borderColor: 'black',
            borderWidth: 2,
            layout: 'vertical',
            verticalAlign: 'top',
            y: 100,
            shadow: true
        },
        plotOptions: {
            series: {
                point: {
                    events: {
                        mouseOver() {
                        }
                    }
                }
            }
        },
        series: [{
            name: 'AAPL',
            data: [
                [1220832000000, 22.56], [1220918400000, 21.67], [1221004800000, 21.66],
                [1221091200000, 21.81], [1221177600000, 21.28], [1221436800000, 20.05],
                [1221523200000, 19.98], [1221609600000, 18.26], [1221696000000, 19.16],
                [1221782400000, 20.13], [1222041600000, 18.72], [1222128000000, 18.12],
                [1222214400000, 18.39], [1222300800000, 18.85], [1222387200000, 18.32],
                [1222646400000, 15.04], [1222732800000, 16.24], [1222819200000, 15.59],
                [1222905600000, 14.3], [1222992000000, 13.87], [1223251200000, 14.02],
                [1223337600000, 12.74], [1223424000000, 12.83], [1223510400000, 12.68],
                [1223596800000, 13.8], [1223856000000, 15.75], [1223942400000, 14.87],
                [1224028800000, 13.99], [1224115200000, 14.56], [1224201600000, 13.91],
                [1224460800000, 14.06], [1224547200000, 13.07], [1224633600000, 13.84],
                [1224720000000, 14.03], [1224806400000, 13.77], [1225065600000, 13.16],
                [1225152000000, 14.27], [1225238400000, 14.94], [1225324800000, 15.86],
                [1225411200000, 15.37], [1225670400000, 15.28], [1225756800000, 15.86],
                [1225843200000, 14.76], [1225929600000, 14.16], [1226016000000, 14.03],
                [1226275200000, 13.7], [1226361600000, 13.54], [1226448000000, 12.87],
                [1226534400000, 13.78], [1226620800000, 12.89], [1226880000000, 12.59],
                [1226966400000, 12.84], [1227052800000, 12.33], [1227139200000, 11.5],
                [1227225600000, 11.8], [1227484800000, 13.28], [1227571200000, 12.97],
                [1227657600000, 13.57], [1227830400000, 13.24], [1228089600000, 12.7],
                [1228176000000, 13.21], [1228262400000, 13.7], [1228348800000, 13.06],
                [1228435200000, 13.43], [1228694400000, 14.25], [1228780800000, 14.29],
                [1228867200000, 14.03], [1228953600000, 13.57], [1229040000000, 14.04],
                [1229299200000, 13.54]
                ],
            tooltip: {
                valueDecimals: 2
            }
        },
        {
            name: 'RXTGHF',
            data: [
                [1220832000000, 2.56], [1220918400000, 21.67], [1221004800000, 21.66],
                [1221091200000, 2.81], [1221177600000, 21.28], [1221436800000, 20.05],
                [1221523200000, 1.98], [1221609600000, 8.26], [1221696000000, 9.16],
                [1221782400000, 2.13], [1222041600000, 18.72], [1222128000000, 8.12],
                [1222214400000, 1.39], [1222300800000, 18.85], [1222387200000, 18.32],
                [1222646400000, 5.04], [1222732800000, 6.24], [1222819200000, 5.59],
                [1222905600000, 4.3], [1222992000000, 13.87], [1223251200000, 14.02],
                [1223337600000, 2.74], [1223424000000, 2.83], [1223510400000, 2.68],
                [1223596800000, 3.8], [1223856000000, 15.75], [1223942400000, 14.87],
                [1224028800000, 3.99], [1224115200000, 4.56], [1224201600000, 3.91],
                [1224460800000, 4.06], [1224547200000, 13.07], [1224633600000, 13.84],
                [1224720000000, 4.03], [1224806400000, 13.77], [1225065600000, 13.16],
                [1225152000000, 4.27], [1225238400000, 14.94], [1225324800000, 5.86],
                [1225411200000, 5.37], [1225670400000, 15.28], [1225756800000, 15.86],
                [1225843200000, 4.76], [1225929600000, 14.16], [1226016000000, 4.03],
                [1226275200000, 3.7], [1226361600000, 13.54], [1226448000000, 12.87],
                [1226534400000, 3.78], [1226620800000, 2.89], [1226880000000, 12.59],
                [1226966400000, 2.84], [1227052800000, 12.33], [1227139200000, 1.5],
                [1227225600000, 1.8], [1227484800000, 13.28], [1227571200000, 2.97],
                [1227657600000, 3.57], [1227830400000, 13.24], [1228089600000, 2.7],
                [1228176000000, 3.21], [1228262400000, 3.7], [1228348800000, 13.06],
                [1228435200000, 3.43], [1228694400000, 14.25], [1228780800000, 4.29],
                [1228867200000, 4.03], [1228953600000, 13.57], [1229040000000, 14.04],
                [1229299200000, 3.54]
                ],
            tooltip: {
                valueDecimals: 2
            }
        }]
    },
    business: [
        {
            id: 'objWidgetConf22',
            headConf: {
                widgetName: '业务视图',
                operationConf: {
                    'refresh': 'fa fa-refresh',
                    'expand': 'fa fa-expand',
                    'edit': 'fa fa-pencil-square-o',
                    'delete': 'fa fa-trash'
                }
            },
            bodyConf: [{
                bodyId: 'bodyConf22_1',
                bodyType: 'business',
                bodyContent: {
                    defaultUrl: '',
                    searchUrl: ''
                }
            }]
        }
    ]
};
export default PageData;
