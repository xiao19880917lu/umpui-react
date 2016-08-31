/**
 * @file Business业务视图组件
 * @author renxintao@baidu.com
 * @date 2016-08-23
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {Row, Col} from 'react-bootstrap';
import {DatePicker} from 'antd';

import BusinessForm from './BusinessForm';
import Graph from '../Graph';
const _ = require('underscore');
const $ = require('jquery');

export default class Business extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nodes: [],
            links: [],
            width: this.props.width,
            height: 600,
            initialData: {}
        };
    }
    componentDidMount() {
        let domWidth = ReactDOM.findDOMNode(this.refs.businessForm).clientWidth;
        this.setState({width: domWidth});
        let datas;
        if (this.props.defaultUrl !== '' && this.props.defaultUrl !== undefined) {
            $.ajax({
                url: this.props.defaultUrl,
                type: 'POST',
                success(data) {
                    if (data.status === 0) {
                        datas = data;
                    }
                }
            });
        } else {
            datas =  {
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
                            from: 'HB',
                            to: 'CP01'
                        },
                        {
                            from: 'HB',
                            to: 'CQ01'
                        },
                        {
                            from: 'HB',
                            to: 'CQ02'
                        },
                        {
                            from: 'HB',
                            to: 'DB'
                        },
                        {
                            from: 'HB',
                            to: 'HN'
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
                            from: 'HD',
                            to: 'HZ01'
                        },
                        {
                            from: 'HD',
                            to: 'NB01'
                        },
                        {
                            from: 'HD',
                            to: 'NJ01'
                        },
                        {
                            from: 'HD',
                            to: 'NJ02'
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
                            name: 'CP01',
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
                            name: 'CQ01',
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
                            name: 'CQ02',
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
                            name: 'DB',
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
                            name: 'HZ01',
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
                            name: 'NB01',
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
                            name: 'NJ01',
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
                            name: 'NJ02',
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
            };
        }
        let d3Data = this.handlerData(datas.data, domWidth);
        this.setState({initialData: d3Data});
        console.log(datas);
        console.log('d3Data=');
        console.log(d3Data);
        this.setState({nodes: d3Data.nodes, links: d3Data.links});
    }
    handlerData(baseGraphData, domWidth) {
        let myThis = this;
        // 将已有格式数据转化为d3格式数据
        // 计算zone节点位置
        let cellWidth = domWidth / (_.keys(baseGraphData.nodes).length * 2 + 1);

        let nodesList = baseGraphData.nodes;
        let linksList = baseGraphData.links;
        // 获取每个zone 关联的机房数， 取最大值
        // 获取zone 列表
        let nodesIndex = [];
        let zoneList = [];
        $.each(nodesList, function (i) {
            if (nodesList[i].type === 'zone') {
                zoneList.push(nodesList[i].name);
            }
            nodesIndex.push(nodesList[i].name);
            // 处理节点health
            nodesList[i].health = myThis.getNodeHealth(nodesList[i].history);
        });
        // 获取每个zone关联的机房数
        let zoneIdcMap = {};
        $.each(zoneList, function (i) {
            let zone = zoneList[i];
            zoneIdcMap[zone] = [];
        });
        $.each(linksList, function (i) {
            let link = linksList[i];
            if ((zoneList.indexOf(link.from) > -1)
            && (zoneList.indexOf(link.to) === -1)) {
                zoneIdcMap[link.from].push(link.to);
            } else if ((zoneList.indexOf(link.to) > -1)
            && (zoneList.indexOf(link.from) === -1)) {
                zoneIdcMap[link.to].push(link.from);
            }
            // 判断是否节点存在
            if ((nodesIndex.indexOf(link.from) === -1)
            || (nodesIndex.indexOf(link.to) === -1)) {
                console.error('找不到节点：起始节点：', link.from,
                    '结束节点：', link.to);
            }
            link['source'] = nodesIndex.indexOf(link.from);
            link['target'] = nodesIndex.indexOf(link.to);
            linksList[i] = link;
        });
        let maxIdcCnt = 0;
        let totalIdcCnt = 0;
        $.each(zoneIdcMap, function (zone) {
            if (maxIdcCnt < zoneIdcMap[zone].length) {
                maxIdcCnt = zoneIdcMap[zone].length;
            }
            totalIdcCnt += zoneIdcMap[zone].length;
        });
        // 获得屏幕最佳高度
        // this.height = (maxIdcCnt + 4) * this.cellHeight;
        this.height = 600;

        let radius = 100;
        let center = {x: domWidth / 2, y: myThis.height / 2};
        // 确定 zone 圆型布局的位置
        let zonePositionMap = {};
        let zoneNum = zoneList.length;
        let zoneStartAngle = - Math.PI * 1.2;
        let angleBaseParam = 0;
        let CntBase = totalIdcCnt + zoneNum * angleBaseParam;
        for (let i = 0; i < zoneNum; i++) {
            let zoneIdcCnt = zoneIdcMap[zoneList[i]].length;
            let proportion = (zoneIdcCnt + angleBaseParam) / CntBase;
            let zoneGapAngle = Math.PI * 2 * proportion;
            zonePositionMap[zoneList[i]] = {
                x: center.x + radius * Math.cos(zoneStartAngle + zoneGapAngle / 2),
                y: center.y + radius * Math.sin(zoneStartAngle + zoneGapAngle / 2)
            };
            zoneStartAngle += zoneGapAngle;
        }
        // 确定 idc 圆行布局位置
        let idcPositionMap = {};
        let idcStartAngle = - Math.PI * 1.2;
        let idcGapAngle = Math.PI * 2 / CntBase;
        $.each(zoneList, function (i) {
            let zoneName = zoneList[i];
            let idcList = zoneIdcMap[zoneName];
            let idcNum = idcList.length;
            let proportion = (idcNum + angleBaseParam) / CntBase;
            let zoneGapAngle = Math.PI * 2 * proportion;
            $.each(idcList, function (j) {
                let idcName = idcList[j];
                console.log(zoneName, idcName, (idcStartAngle + j * idcGapAngle) / Math.PI);
                idcPositionMap[idcName] = {
                    x: center.x + radius * 4 * Math.cos(idcStartAngle + j * idcGapAngle),
                    y: center.y + radius * 2 * Math.sin(idcStartAngle + j * idcGapAngle)
                };
            });
            idcStartAngle += zoneGapAngle;
        });
        // 组装节点信息，返回装填好的数据
        $.each(nodesList, function (i) {
            let node = nodesList[i];
            if (node.type === 'zone') {
                node['x'] = zonePositionMap[node.name].x;
                node['y'] = zonePositionMap[node.name].y;
                node['fixed'] = 'true';
            } else if (node.type === 'idc') {
                node['x'] = idcPositionMap[node.name].x;
                node['y'] = idcPositionMap[node.name].y;
                node['fixed'] = 'true';
            }
            nodesList[i] = node;
        });

        return {
            nodes: nodesList,
            links: linksList
        };
    }
    getNodeHealth(history) {
        let healthStatus = 'normal';
        let lastHealthStatus = 0;
        $.each(history, function (i) {
            let healthCode = parseInt(history[i].health.code, 10);
            if (lastHealthStatus < healthCode) {
                healthStatus = history[i].health.result;
                lastHealthStatus = healthCode;
            }
        });
        return healthStatus;
    }
    updateData() {
        let nodes = [
            {
                'id': 'Alice',
                'x': 240,
                'y': 330,
                'key': 1,
                'size': 1
            },
            {
                'id': 'Bob',
                'x': 30,
                'y': 211,
                'key': 2,
                'size': 1
            },
            {
                'id': 'Carol',
                'x': 409,
                'y': 222,
                'key': 3,
                'size': 1
            }
        ];

        let links = [
            {'source': {'x': 240, 'y': 330}, 'target': {'x': 30, 'y': 211}, 'key': 1, 'size': 1}, // Alice → Bob
            {'source': {'x': 30, 'y': 211}, 'target': {'x': 409, 'y': 222}, 'key': 2, 'size': 1} // Bob → Carol
        ];
        this.setState({nodes: nodes, links: links});
    }
    onSearch(value) {
        console.log('onSearch!');
        console.log(value);
        let datas;
        if (this.props.searchUrl !== '' && this.props.searchUrl !== undefined) {
            $.ajax({
                url: this.props.searchUrl,
                type: 'POST',
                success(data) {
                    if (data.status === 0) {
                        datas = data;
                    }
                }
            });
        } else {
            datas = [{
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
        }
        let initialData = this.state.initialData;
        let resultData = this.handlerResultData(initialData, datas[0].data);
        console.log('initialData=');
        console.log(initialData);
        let d3ResultData = this.handlerData(resultData);
        console.log('d3ResultData=');
        console.log(d3ResultData);
        this.setState({nodes: d3ResultData.nodes, links: d3ResultData.links});
    }
    handlerResultData(initGraphData, resultDatas) {
        // 处理查询结果数据
        let myThis = this;
        // 处理后端数据
        let result = {};
        $.each(resultDatas, function (i) {
            let resultData = resultDatas[i];
            // 单维度
            if (_.has(resultData.dimension, 'key')) {
                result = myThis.updateSingleDimensionGraph(resultData);
            } else if ((_.has(resultData.dimension, 'from'))
                && (_.has(resultData.dimension, 'to'))) {
                result = myThis.updateTwoDimensionGraph(resultData);
            } else {
                console.error('无法判定是单维度还是多维度');
            }
        });
        return result;
    }
    updateSingleDimensionGraph(data) {
        // 处理单维度数据
        let eleList = this.handlerSingleDimensionData(data);
        return this.mergetEleListAndBaseGraph(eleList);
    }
    handlerSingleDimensionData(data) {
        // 从结果数据获取新节点
        let myThis = this;
        let detail = data['detail'];
        let result = {nodes: [], links: []};

        let idcName = '';
        $.each(detail, function (i) {
            let levelData = detail[i];
            if (levelData.dimension.key === 'idc') {
                idcName = levelData.dimension.value;
            }
        });
        myThis.resultLink = detail;
        let netName = myThis.getNetName(detail);
        if (data.dimension.key === 'net') {
            // 增加net 节点
            myThis.addNode(result, netName, 'net', data.detail[0]);
            myThis.addLink(result, idcName, netName);
        }
        if (data.dimension.key === 'ip') {
            // 增加net 节点
            myThis.addNode(result, netName, 'net', data.detail[1]);
            myThis.addLink(result, idcName, netName);
            // 增加ip 节点
            myThis.addNode(result, data.dimension.value, 'ip', data.detail[0]);
            myThis.addLink(result, netName, data.dimension.value);
        }
        return result;
    }
    addNode(result, name, type, data) {
        result['nodes'].push({
            name: name,
            type: type,
            health: data.health.result,
            history: data.history
        });
    }
    addLink(result, source, target) {
        result['links'].push({
            from: source,
            to: target
        });
    }
    getNetName(detail) {
        // 获取网段名称
        let netName = '';
        $.each(detail, function (i) {
            if (detail[i].dimension.key === 'net') {
                netName = detail[i].dimension.value;
                return false;
            }
        });
        return netName;
    }
    mergetEleListAndBaseGraph(data) {
        // 混合新节点数据与基础图数据
        let nodesList = $.merge([], this.state.initialData.nodes);
        $.each(data.nodes, function (i) {
            nodesList.push(data.nodes[i]);
        });
        let linksList = $.merge([], this.state.initialData.links);
        $.each(data.links, function (i) {
            linksList.push(data.links[i]);
        });
        // 更新idc 及zone 节点的health 及history 信息
        let detail = this.resultLink;
        $.each(detail, function (i) {
            let levelData = detail[i];
            let name = levelData.dimension.value;
            let type = levelData.dimension.key;
            if ((type === 'idc')
                || (type === 'zone')) {
                $.each(nodesList, function (j) {
                    if (nodesList[j].name === name) {
                        nodesList[j].health = levelData.health.result;
                        nodesList[j].history = levelData.history;
                    }
                });
            }
        });
        return {
            nodes: nodesList,
            links: linksList
        };
    }
    updateTwoDimensionGraph(data) {
        // 处理多维度数据
        // 如果源 目的为同网段ip，采用单维度网段查询获取网段的,避免出现无主节点
        let eleList = this.handlerMultiDimensionData(data);
        return this.mergetEleListAndBaseGraph(eleList);
    }
    handlerMultiDimensionData(data) {
        // 从结果数据获取新节点
        let myThis = this;
        let detail = data['detail'];
        let result = {nodes: [], links: []};

        let beforeNodeName = '';
        let beforeNodeType = '';
        $.each(detail, function (i) {
            let levelData = detail[i];
            // 存储现在读的数据
            let currNodeName = levelData.dimension.value;
            let currNodeType = levelData.dimension.key;
            if ((currNodeType === 'ip')
            || (currNodeType === 'net')) {
                // 新增节点
                myThis.addNode(result, currNodeName, currNodeType, levelData);
                if ((beforeNodeName === '')
                || (beforeNodeType === '')) {
                    console.log('前一个节点类型无法识别');
                    beforeNodeName = currNodeName;
                    beforeNodeType = currNodeType;
                    return true;
                }
            }
            // 新增链路
            if ((beforeNodeType === 'ip')
                || (currNodeType === 'net')
                || (beforeNodeType === 'net')
                || (currNodeType === 'ip')) {
                // ip 与net 之间、net 与idc 之间需要新增链路
                myThis.addLink(result, beforeNodeName, currNodeName);
            }
            beforeNodeName = currNodeName;
            beforeNodeType = currNodeType;
        });

        myThis.resultLink = detail;
        return result;
    }
    render() {
        return (
            <div>
                <BusinessForm onSearch={this.onSearch.bind(this)} ref='businessForm'/>
                <Graph nodes={this.state.nodes} links={this.state.links}
                height={this.state.height} width={this.state.width}/>
            </div>
        );
    }
}