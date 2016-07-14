/**
 * @file List列表 
 * @author luyongfang
 */
import React from 'react';
import ReactDOM from 'react-dom';
require('!style!css!sass!../sass/app/_umplist.scss');
export default class ReactList extends React.Component {
    static propTypes = {
        data: React.PropTypes.object
    }
    static defaultProps = {
        data: {}
    }
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    // this.props tags keys data isMap
    generateList() {
        if (this.props.generateList) {
            return this.props.generateList();
        }
        let liList = [];
        let listData = this.props.data;
        if (this.props.showKeys && this.props.isKeyMap && this.props.tags) {
            // 如果有设置showKeys 且需要映射,一般是中英文对照
            for (let key of this.props.showKeys) {
                let isObj = Object.prototype.toString.call(this.props.tags[key]) === '[object Object]' ? true : false;
                let title = isObj ? this.props.tags[key]['title'] : this.props.tags[key]; 
                let value = isObj && this.props.tags[key]['render']
                    ? this.props.tags[key]['render'](listData[key], listData) : listData[key];
                liList.push(<li key={key}>
                    <div className="umpui-li-title">{title}</div>
                    <div className="umpui-li-value">{value}</div>
                </li>);
            }
        } else if (this.props.showKeys && !this.props.isKeyMap) {
            // 如果有设置showKey 但是不需要映射
            for (let key of this.props.showKeys) {
                liList.push(<li key={key}>
                    <div className="umpui-li-title">{key}</div>
                    <div className="umpui-li-value">{listData[key]}</div>
                </li>);
            }
        } else {
            for (let key in this.props.data) {
                liList.push(<li key={key}>
                    <div className="umpui-li-title">{key}</div>
                    <div className="umpui-li-value">{this.props.data[key]}</div>
                </li>);
            }
        }
        return (<ul className="umpui-list-ul">{liList}</ul>);
    }
    render() {
        return <div className="umpui-list">
            {this.generateList()}
            </div>
    }
}
