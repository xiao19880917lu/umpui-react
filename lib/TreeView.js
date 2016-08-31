/**
 * @file 树状侧边栏组件(新)
 * @author huzaibin@baidu.com
 * @date 2016-05-03
 */

import React from 'react';
import {Link} from 'react-router';
import {Spin} from 'antd';
require('!style!css!sass!../sass/app/_treeview.css');
let PubSub = require('pubsub-js');

export default class TreeView extends React.Component {
    static propTypes = {
        levels: React.PropTypes.number,
        expandIcon: React.PropTypes.string,
        collapseIcon: React.PropTypes.string,
        emptyIcon: React.PropTypes.string,
        nodeIcon: React.PropTypes.string,
        color: React.PropTypes.string,
        backColor: React.PropTypes.string,
        borderColor: React.PropTypes.string,
        onhoverColor: React.PropTypes.string,
        selectedColor: React.PropTypes.string,
        selectedBackColor: React.PropTypes.string,
        enableLinks: React.PropTypes.bool,
        highlightSelected: React.PropTypes.bool,
        showBorder: React.PropTypes.bool,
        showTags: React.PropTypes.bool,
        treeData: React.PropTypes.arrayOf(React.PropTypes.object),
        getNodeData: React.PropTypes.func
    };

    static defaultProps = {
        levels: 10,
        expandIcon: 'mif-expand-more',
        collapseIcon: 'mif-expand-less',
        emptyIcon: 'mif-file-empty',
        nodeIcon: 'glyphicon glyphicon-stop',
        color: '#666666',
        backColor: undefined,
        borderColor: undefined,
        onhoverColor: '#F5F5F5', // TODO Not implemented yet, investigate radium.js 'A toolchain for React component styling'
        selectedColor: '#5d9cec',
        selectedBackColor: '#FFFFFF',
        enableLinks: true,
        highlightSelected: true,
        showBorder: true,
        showTags: false,
        treeData: []
    };

    constructor(props) {
        super(props);
    }

    setNodeId(node) {
        if (node.nodes === undefined || node.nodes.length === 0) {
            return;
        }
        node.nodes.map(function checkStates(node, i) {
            node.nodeId = i;
            this.setNodeId(node);
        }.bind(this));
    }

    render() {
        this.setNodeId({nodes: this.props.treeData});
        let data = this.props.treeData;
        let children = data.map(function (node, i) {
            node.pHref = '/';
            return (<TreeNode node={node} key={i}
                level={1}
                visible={true}
                options={this.props}
                />);
        }.bind(this));

        return (
            <div id='treeview' className='treeview animated fade in'>
                <ul className='list-group list-root'>
                {children}
                </ul>
            </div>
        );
    }
    // 收缩侧边栏
    // <a className="unfold js-left-panel-collapse-btn" id="left-click-open"
    // onClick={this.handleHorizontalCollapse} ></a>
}


class TreeNode extends React.Component {
    constructor(props) {
        super(props);
        this.ajax = null;
        this.pubsubToken = null;
        let node = this.props.node;
        this.state = {
            expanded: (node.state && node.state.hasOwnProperty('expanded'))
            ? node.state.expanded
            : false,
            // : (this.props.level < this.props.options.levels)
            // ? true : false,
            selected: (node.state && node.state.hasOwnProperty('selected'))
            ? node.state.selected : false,
            nodes: null,
            loading: false
        };
    }

    toggleExpanded(node, event) {
        this.onLoadData();
    }

    toggleSelected(id, event) {
        PubSub.publish('changeState', this.pubsubToken);
        this.setState({selected: true});
        event.stopPropagation();
    }

    componentDidMount() {
        this.pubsubToken = PubSub.subscribe('changeState', function (topic, togglePubsubToken) {
            if (this.pubsubToken  !== togglePubsubToken) {
                this.setState({selected: false});
            }
        }.bind(this));
        this.setTreeNodeData();
    }

    componentWillUnmount() {
        this.ajax && this.ajax.abort();
        PubSub.unsubscribe(this.pubsubToken);
    }

    setTreeNodeData() {
        let node = this.props.node;

        let nodes = null;
        if (node.nodes) {
            nodes = node.nodes.map(function (n, i) {
                if (node.pHref === '/') {
                    n.pHref = node.pHref + node.key;
                } else {
                    n.pHref = node.pHref + '/' + node.key;
                }
                return (<TreeNode key={i} node={n}
                    level={this.props.level + 1}
                    options={this.props.options} />);
            }.bind(this));
        }
        this.setState({
            nodes: nodes
        });
    }

    render() {
        let node = this.props.node;
        let options = this.props.options;

        let style;
        if (options.highlightSelected && this.state.selected) {
            style = {
                color: options.selectedColor,
                backgroundColor: options.selectedBackColor
            };
        } else {
            style = {
                color: node.color || options.color,
                backgroundColor: node.backColor || options.backColor
            };
        }
        if (!options.showBorder) {
            style.border = 'none';
        } else if (options.borderColor) {
            style.border = '1px solid ' + options.borderColor;
        }

        let indents = [];
        for (let i = 0; i < this.props.level - 1; i++) {
            indents.push(<span className='indent' key={i}></span>);
        }

        let expandCollapseIcon;
        if (!node.isLeaf) {
            if (!this.state.expanded) {
                let expandClass = options.expandIcon + ' expandIcon';
                expandCollapseIcon = (
                    <span className={expandClass}
                    onClick={this.toggleExpanded.bind(this, node)}>
                    </span>
                );
            } else {
                let expandClass = options.collapseIcon + ' expandIcon';
                expandCollapseIcon = (
                    <span className={expandClass}
                        onClick={this.toggleExpanded.bind(this, node)}>
                    </span>
                );
            }
        } else {
            expandCollapseIcon = (
                <span className={options.emptyIcon}></span>
            );
        }

        let nodeIcon = (
            <span className='icon'>
                <span className={node.icon || options.nodeIcon}></span>
            </span>
        );

        let nodeText;
        if (options.enableLinks) {
            let toLink = '';
            if (node.pHref === '/') {
                toLink = node.pHref +  encodeURIComponent(node.key);
            } else {
                toLink = node.pHref + '/' + encodeURIComponent(node.key);
            }
            nodeText = (
                <Link to={{pathname: toLink, query: {nodeType: node.href, nodeId: encodeURIComponent(node.key)}
                    }} title={node.text} style={style}>
                    {node.text}
                </Link>
            );
        } else {
            nodeText = (
                <span>{node.text}</span>
            );
        }
        let badges;
        if (options.showTags && node.tags) {
            badges = node.tags.map(function (tag, i) {
                return (
                    <span key={i} className='badge'>{tag}</span>
                );
            });
        }

        return (
            <Spin size="small" spinning={this.state.loading} tip="正在读取数据..."><li className='list-group-item'
                style={style}
                onClick={this.toggleSelected.bind(this, node.nodeId)}
                key={node.nodeId}>
                <div className="nodeInfo">
                    {indents}
                    {expandCollapseIcon}
                    {nodeIcon}
                    {nodeText}
                    {badges}
                </div>
                <ul className='list-group' style={this.state.expanded ? {display: 'block'}
                    : {display: 'none'}}>{this.state.nodes}</ul>
            </li></Spin>
        );
    }

    // 异步请求当前节点的数据
    onLoadData() {
        let nodeInfo = this.props.node;
        if (this.state.expanded) {
            this.setState({
                expanded: !this.state.expanded
            });
            return;
        } else if (!this.state.expanded && this.state.nodes) {
            this.setState({
                expanded: !this.state.expanded
            });
            return;
        }

        let key = nodeInfo.key;
        let identify = nodeInfo.href;

        this.setState({
            loading: true
        });

        let nodes = this.props.options.getNodeData({'identify': identify, 'key': key});
        if (nodes == null || !(nodes instanceof Array)) {
            this.setState({
                loading: false
            });
            console.log('此节点没有子节点');
        } else {
            let childData = nodes.map(function (d, i) {
                if (nodeInfo.pHref === '/') {
                    d.pHref = nodeInfo.pHref + encodeURIComponent(nodeInfo.key);
                } else {
                    d.pHref = nodeInfo.pHref + '/' + encodeURIComponent(nodeInfo.key);
                }
                return (<TreeNode key={i} node={d} level={this.props.level + 1}
                options={this.props.options} />);
            }.bind(this));
            this.setState({
                nodes: childData,
                expanded: !this.state.expanded,
                loading: false
            });
        }
    }
}

