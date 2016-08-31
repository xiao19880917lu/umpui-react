### 功能
    在Widget中存放业务视图组件
### 配置参数: 即props
    id: 必须，唯一标识该Widget
    headConf: 必须，配置WidgetHead
        widgetName: 必须，配置Widget名称
        operationConf: 必须，配置Widget操作按钮，刷新、放大、编辑、删除操作可配置；
    bodyConf: 必须，配置WidgetBody
        bodyId: 必须，配置Widget存放实体id
        bodyType: 必须，配置Widget存放实体类型，有'text'、'chart'、'stock'、'business'三种类型
        bodyContent: 必须，配置Widget存放实体内容，实体类型为'text',直接填写内容;实体类型为'chart'或'stock'时，存放图表配置;实体类型为'business', 存放业务组件配置;
            defaultUrl: '123'，业务视图组件默认显示拓扑数据
            searchUrl: '234'，业务视图组件查询显示拓扑数据
### 源代码

```
import React from 'react';
import ReactDOM from 'react-dom';
import Business from 'umpui-react';
// 业务视图类型配置
let business = [
    {
        id: 'objWidgetConf1',
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
            bodyId: 'bodyConf1',
            bodyType: 'business',
            bodyContent: {
                defaultUrl: '',  // defaultUrl为业务视图组件默认显示拓扑数据
                searchUrl: ''  // searchUrl为业务视图组件查询显示拓扑数据
            }
        }]
    }
]
// Business通过defaultUrl请求数据得到的数据格式为
let defaultData =  {
    'status': 0,
    'message': '',
    'data': {
        'links': [
            {
                from: 'HB',
                to: 'BB'
            },
            {
                from: 'HB',
                to: 'BJYZ'
            },
            {
                from: 'HD',
                to: 'HB'
            },
            {
                from: 'HD',
                to: 'HN'
            },
            {
                from: 'HN',
                to: 'GZHXY'
            },
            {
                from: 'HN',
                to: 'GZNS'
            }
        ],
        'nodes': [
            {
                name: 'BB',
                type: 'idc',
                history: [
                    {
                        timestamp: '1471496452',
                        health: {
                            reason: 'This dimension is normal',
                            code: '00',
                            result: 'normal'
                        }
                    }
                ]
            },
            {
                name: 'BJYZ',
                type: 'idc',
                history: [
                    {
                        timestamp: '1471496452',
                        health: {
                            reason: 'This dimension is normal',
                            code: '00',
                            result: 'normal'
                        }
                    }
                ]
            },
            {
                name: 'HB',
                type: 'zone',
                history: [
                    {
                        timestamp: '1471496452',
                        health: {
                            reason: 'This dimension is normal',
                            code: '00',
                            result: 'normal'
                        }
                    }
                ]
            },
            {
                name: 'HD',
                type: 'zone',
                history: [
                    {
                        timestamp: '1471496452',
                        health: {
                            reason: 'This dimension is normal',
                            code: '00',
                            result: 'normal'
                        }
                    }
                ]
            },
            {
                name: 'HN',
                type: 'zone',
                history: [
                    {
                        timestamp: '1471496452',
                        health: {
                            reason: 'This dimension is normal',
                            code: '00',
                            result: 'normal'
                        }
                    }
                ]
            },
            {
                name: 'GZHXY',
                type: 'idc',
                history: [
                    {
                        timestamp: '1471496452',
                        health: {
                            reason: 'This dimension is normal',
                            code: '00',
                            result: 'normal'
                        }
                    }
                ]
            },
            {
                name: 'GZNS',
                type: 'idc',
                history: [
                    {
                        timestamp: '1471496452',
                        health: {
                            reason: 'This dimension is normal',
                            code: '00',
                            result: 'normal'
                        }
                    }
                ]
            }
        ]
    }
}
// Business通过searchUrl请求数据得到的数据格式为
let searchDatas = [{
    'status': 0,
    'message': '',
    'data': [
        {
            detail: [
                {
                    timestamp: '1472351760',
                    health: {
                        reason: 'This dimension is normal',
                        code: '00',
                        result: 'normal'
                    },
                    dimension: {
                        value: '10.32.15.39',
                        key: 'ip'
                    },
                    history: [
                        {
                            timestamp: '1472351760',
                            health: {
                                reason: 'This dimension is normal',
                                code: '00',
                                result: 'normal'
                            }
                        }
                    ]
                },
                {
                    timestamp: '1472351760',
                    health: {
                        reason: 'This dimension is normal',
                        code: '00',
                        result: 'normal'
                    },
                    dimension: {
                        value: '10.32.15',
                        key: 'net'
                    },
                    history: [
                        {
                            timestamp: '1472351760',
                            health: {
                                reason: 'This dimension is normal',
                                code: '00',
                                result: 'normal'
                            }
                        }
                    ]
                },
                {
                    timestamp: '1472351760',
                    health: {
                        reason: 'This dimension is normal',
                        code: '00',
                        result: 'normal'
                    },
                    dimension: {
                        value: 'BB',
                        key: 'idc'
                    },
                    history: [
                        {
                            timestamp: '1472351760',
                            health: {
                                reason: 'This dimension is normal',
                                code: '00',
                                result: 'normal'
                            }
                        }
                    ]
                },
                {
                    timestamp: '1472351760',
                    health: {
                        reason: 'This dimension is normal',
                        code: '00',
                        result: 'normal'
                    },
                    dimension: {
                        value: 'HB',
                        key: 'zone'
                    },
                    history: [
                        {
                            timestamp: '1472351760',
                            health: {
                                reason: 'This dimension is normal',
                                code: '00',
                                result: 'normal'
                            }
                        }
                    ]
                }
            ],
            timestamp: '1472351760',
            dimension: {
                value: '10.32.15.39',
                key: 'ip'
            },
            health: {
                reason: 'This dimension is normal',
                code: '00',
                result: 'normal'
            },
            history: [
                {
                    timestamp: '1472351760',
                    health: {
                        reason: 'This dimension is normal',
                        code: '00',
                        result: 'normal'
                    }
                }
            ]
        }
    ]
}];
<Business defaultUrl={defaultUrl} searchUrl={searchUrl} />
```
### Graph组件使用

```
// 将defaultData 经过转化, 转化为d3格式的数据
// 数据格式详见console中的d3Data
// 参数：
   nodes: d3Data.nodes,存放结点信息
   links: d3Data.links,存放链路信息
   height: 拓扑图的高度
   width: 拓扑图的宽度
 <Graph nodes={nodes} links={links} height={height} width={width}/>
```