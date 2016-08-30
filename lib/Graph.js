/**
 * @file Widget组件
 * @author renxintao@baidu.com
 * @date 2016-06-22
 */
import {Row, Col} from 'react-bootstrap';
const React = require('react');
const ReactDOM = require('react-dom');
const d3 = require('d3');
require('!style!css!sass!../sass/app/_force.scss');

// let force = d3.forceSimulation()
//   .force('charge', d3.forceManyBody());
let cellHeight = 100;
let width = 960;
let height = 600;

let force = d3.layout.force()
    .charge(- cellHeight * 25)
    .size([width, height]);
export default class Graph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() {
    }
    shouldComponentUpdate(nextProps) {
        let myThis = this;
        let svg;
        let zoom = function () {
            if (d3.event.defaultPrevented) {
                return;
            }
            svg.attr('transform', 'translate(' + d3.event.translate + ')scale(' + d3.event.scale + ')');
        };
        let dragstart = function () {
            if (d3.event.defaultPrevented) {
                return;
            }
            let myThis = this;
            let containerId = myThis.parentNode.id;
            myThis.setAttribute('width', nextProps.width);
            myThis.setAttribute('height', nextProps.height);
        };
        ReactDOM.findDOMNode(this.refs.svg).innerHTML = '';
        svg = d3.select(ReactDOM.findDOMNode(this.refs.svg))
            .call(d3.behavior.zoom().scaleExtent([0.7, 2]).on('zoom', zoom))
            .call(d3.behavior.drag().on('dragstart', dragstart))
            .attr('width', nextProps.width)
            .attr('height', nextProps.height)
            .append('g');
        // 增加连线
        let links = svg.selectAll('.link')
            .data(nextProps.links)
            .enter()
            .append('line')
            .attr('class', 'link')
            .attr('data-from', function (d) { return d.from; })
            .attr('data-to', function (d) { return d.to; })
            .attr('id', function (d) {
                return myThis.getNodeId(d.from) + myThis.getNodeId(d.to);
            });
        // 增加节点容器
        let nodes = svg.selectAll('.node')
            .data(nextProps.nodes)
            .enter()
            .append('g')
            .attr('id', function (d) {
                return myThis.getNodeId(d.name);
            })
            .attr('data-type', function (d) { return d.type; });
        // 增加节点方框
        nodes.append('rect')
            .attr('width', function (d) {
                return myThis.getNodeAttribute(d, 'width');
            })
            .attr('height', function (d) {
                return myThis.getNodeAttribute(d, 'height');
            })
            .attr('class', function (d) {
                return 'node node-' + d.health;
            })
            .attr('health', function (d) { return d.health; })
            .attr('transform', function (d) {
                return 'translate(-' + myThis.getNodeAttribute(d, 'width') / 2
                + ',-' + myThis.getNodeAttribute(d, 'textY')
                    + ')';
            });
        // 增加节点左圆
        nodes.append('ellipse')
            .attr('cx', 0)
            .attr('cy', function (d) {
                return myThis.getNodeAttribute(d, 'radius');
            })
            .attr('rx', function (d) {
                return myThis.getNodeAttribute(d, 'radius');
            })
            .attr('ry', function (d) {
                return myThis.getNodeAttribute(d, 'radius');
            })
            .attr('class', function (d) {
                return 'node node-' + d.health;
            })
            .attr('transform', function (d) {
                return 'translate(-' + myThis.getNodeAttribute(d, 'width') / 2 + ',-'
                + myThis.getNodeAttribute(d, 'textY') + ')';
            });
        // 增加节点右圆
        nodes.append('ellipse')
            .attr('cx', function (d) {
                return myThis.getNodeAttribute(d, 'width');
            })
            .attr('cy', function (d) {
                return myThis.getNodeAttribute(d, 'radius');
            })
            .attr('rx', function (d) {
                return myThis.getNodeAttribute(d, 'radius');
            })
            .attr('ry', function (d) {
                return myThis.getNodeAttribute(d, 'radius');
            })
            .attr('class', function (d) {
                return 'node node-' + d.health;
            })
            .attr('transform', function (d) {
                return 'translate(-' + myThis.getNodeAttribute(d, 'width') / 2 + ',-'
                + myThis.getNodeAttribute(d, 'textY') + ')';
            });
        // 增加节点text 说明
        nodes.append('text')
            .attr('x', function (d) {
                return myThis.getNodeAttribute(d, 'textX');
            })
            .attr('y', function (d) {
                return myThis.getNodeAttribute(d, 'textY');
            })
            .attr('font-size', function (d) {
                return myThis.getNodeAttribute(d, 'fontSize');
            })
            .attr('fill', '#fff')
            .attr('class', 'node-text')
            .text(function (d) { return d.name; })
            .attr('transform', function (d) {
                return 'translate(-' + myThis.getNodeAttribute(d, 'width') / 2 + ',-'
                + myThis.getNodeAttribute(d, 'textY')
                    + ')';
            });
        // todo:增加node 事件
        nodes.on('click', function (d) {
            // myThis.addNodeEvent(this);
        });
        let tick = function () {
            links.attr('x1', function (d) {
                // return d.source.x + (nextProps.width - 70) / 2;
                return d.source.x ;
            })
                .attr('y1', function (d) { return d.source.y; })
                // .attr('x2', function (d) { return d.target.x + (nextProps.width - 70) / 2; })
                .attr('x2', function (d) { return d.target.x })
                .attr('y2', function (d) { return d.target.y; });
            nodes.attr('transform', function (d) {
                // let x = (nextProps.width - 70) / 2 + d.x;
                return 'translate(' + d.x + ',' + d.y + ')';
            });
        };
        force.on('tick', tick);
        force.nodes(nextProps.nodes).links(nextProps.links);
        force.start();
        return false;
    }
    getNodeId(name) {
        return 'node' + name.replace(/\./g, '-');
    }
    getNodeAttribute(d, attrName) {
        let nameLength = d.name.length;
        let nodeAttrMap = {
            zone: {
                width: nameLength * 15,
                height: 32,
                radius: 16,
                textY: 21,
                textX: nameLength * 5 / 2,
                fontSize: '14'
            },
            idc: {
                width: nameLength * 12,
                height: 20,
                radius: 10,
                textY: 15,
                textX: nameLength * 3.5 / 2,
                fontSize: '13'
            },
            net: {
                width: nameLength * 10,
                height: 16,
                radius: 8,
                textY: 13,
                textX: nameLength * 3 / 2,
                fontSize: '12'
            },
            ip: {
                width: nameLength * 9,
                height: 14,
                radius: 7,
                textY: 11,
                textX: nameLength * 2.5 / 2,
                fontSize: '11'
            }
        };
        return nodeAttrMap[d.type][attrName];
    }
    render() {
        // use React to draw all the nodes, d3 calculates the x and y
        return (
            <svg width={this.props.width} height={this.props.height} ref='svg'>
            </svg>
        );
    }
}
