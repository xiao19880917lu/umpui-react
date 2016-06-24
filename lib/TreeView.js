/**
 * @file 树状侧边栏组件(新)
 * @author huzaibin@baidu.com
 * @date 2016-05-03
 */
import React from 'react';
import {Link} from 'react-router';
require('!style!css!sass!../sass/treeview.scss');
require('pubsub-js');

var TreeView = React.createClass({
    propTypes: {
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
        nodes: React.PropTypes.arrayOf(React.PropTypes.object)
    },
    getDefaultProps: function () {
        return {
            levels: 2,
            expandIcon: 'mif-expand-more',
            collapseIcon: 'mif-expand-less',
            emptyIcon: 'mif-file-empty',
            nodeIcon: 'glyphicon glyphicon-stop',
            color: undefined,
            backColor: undefined,
            borderColor: undefined,
            onhoverColor: '#F5F5F5', // TODO Not implemented yet, investigate radium.js 'A toolchain for React component styling'
            selectedColor: '#5d9cec',
            selectedBackColor: '#FFFFFF',
            enableLinks: true,
            highlightSelected: true,
            showBorder: true,
            showTags: false,
            nodes: []
        };
    },

    setNodeId: function (node) {
        if (!node.nodes) {
            return;
        }
        var thisObj = this;
        node.nodes.forEach(
            function checkStates(node) {
                node.nodeId = thisObj.props.nodes.length;
                thisObj.props.nodes.push(node);
                thisObj.setNodeId(node);
            }
        );
    },

    render: function () {
        var data = this.props.data;

        this.setNodeId({nodes: data});

        var children = [];
        if (data) {
            var thisObj = this;
            data.forEach(function (node, i) {
                node.pHref = '/';
                children.push(<TreeNode node={node} key={i}
                    level={1}
                    visible={true}
                    options={thisObj.props} />);
            });
        }
        return (
            <div id='treeview' className='treeview animated fade in'>
                <ul className='list-group'>
                {children}
                </ul>
            </div>
        );
    }
});


var TreeNode = React.createClass({
    getInitialState: function () {
        var node = this.props.node;
        return {
            expanded: (node.state && node.state.hasOwnProperty('expanded'))
            ? node.state.expanded
            : (this.props.level < this.props.options.levels)
            ? true : false,
            selected: (node.state && node.state.hasOwnProperty('selected'))
            ? node.state.selected : false
        };
    },

    toggleExpanded: function (id, event) {
        this.setState({expanded: !this.state.expanded});
        event.stopPropagation();
    },

    toggleSelected: function (id, event) {
        PubSub.publish('changeState', this.pubsub_token);
        this.setState({selected: !this.state.selected});
        event.stopPropagation();
    },

    componentDidMount: function () {
        this.pubsub_token = PubSub.subscribe('changeState', function (topic, togglePubsubToken) {
            if (this.pubsub_token  !== togglePubsubToken) {
                this.setState({selected: false});
            }
        }.bind(this));
    },

    componentWillUnmount: function () {
        PubSub.unsubscribe(this.pubsub_token);
    },

    render: function () {
        var node = this.props.node;
        var options = this.props.options;

        var style;
        if (!this.props.visible) {
            style = {
                display: 'none'
            };
        } else {
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
        }

        var indents = [];
        for (var i = 0; i < this.props.level - 1; i++) {
            indents.push(<span className='indent' key={i}></span>);
        }

        var expandCollapseIcon;
        if (node.nodes) {
            if (!this.state.expanded) {
                expandCollapseIcon = (
                    <i className={options.expandIcon}
                    onClick={this.toggleExpanded.bind(this, node.nodeId)}>
                    </i>
                );
            } else {
                expandCollapseIcon = (
                    <i className={options.collapseIcon}
                        onClick={this.toggleExpanded.bind(this, node.nodeId)}>
                    </i>
                );
            }
        } else {
            expandCollapseIcon = (
                <i className={options.emptyIcon}></i>
            );
        }

        var nodeIcon = (
            <span className='icon'>
                <i className={node.icon || options.nodeIcon}></i>
            </span>
        );

                /*<a href={node.href} >
                {node.text}
                </a>*/
        var nodeText;
        if (options.enableLinks) {
            if (node.pHref === '/') {
                var toLink = node.pHref + node.href + '/' + node.id;
            } else {
                var toLink = node.pHref + '/' + node.href + '/' + node.id;
            }
            nodeText = (
                <Link to={toLink} title={node.text} style={style}>
                    {node.text}
                </Link>
            );
        } else {
            nodeText = (
                <span>{node.text}</span>
            );
        }
        var badges;
        if (options.showTags && node.tags) {
            badges = node.tags.map(function (tag, i) {
                return (
                    <span key={i} className='badge'>{tag}</span>
                );
            });
        }

        var children = [];
        if (node.nodes) {
            var thisObj = this;
            node.nodes.forEach(function (n, i) {
                if (node.pHref === '/') {
                    n.pHref = node.pHref + node.href;
                } else {
                    n.pHref = node.pHref + '/' + node.href;
                }
                children.push(<TreeNode key={i} node={n}
                    level={thisObj.props.level + 1}
                    visible={thisObj.state.expanded && thisObj.props.visible}
                    options={options} />);
            });
        }

        return (
            <li className='list-group-item'
                style={style}
                onClick={this.toggleSelected.bind(this, node.nodeId)}
                key={node.nodeId}>
                {indents}
                {expandCollapseIcon}
                {nodeIcon}
                {nodeText}
                {badges}
                {children}
            </li>
        );
    }
});

module.exports = TreeView;
