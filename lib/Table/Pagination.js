/**
 * @file 分页组件
 * @author luyongfang
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {Nav} from 'react-bootstrap';
require('!style!css!sass!../../sass/app/_pagination.scss');
export default class Pagination extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentIndex: 1,
            totalPage: this.props.totalPage
        };
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.totalPage !== this.state.totalPage) {
            this.setState({totalPage: nextProps.totalPage});
        }
    }
    componentWillMount() {
        // 请求默认的数据,更新tableDatas;
    }
    componentDidMount() {
    }
    changeTable(currentIndex) {
        this.props.changeData && this.props.changeData(currentIndex);
        this.setState({currentIndex: currentIndex});
    }
    setCurrentIndex(index) {
        this.setState({currentIndex: index});
    }
    handleClick(index, event) {
        event.stopPropagation();
        event.preventDefault();
        switch (index) {
            case 'first':
                index = 1;
                break;
            case 'prev':
                index = (this.state.currentIndex === 1) ? 1 : this.state.currentIndex - 1;
                break;
            case 'next':
                index = (this.state.currentIndex === this.state.totalPage)
                    ? this.state.currentIndex : this.state.currentIndex + 1;
                break;
            case 'last':
                index = this.state.totalPage;
                break;
            case 'goto':
                let val = parseInt(ReactDOM.findDOMNode(this.refs.goto).value * 1, 0);
                if (val === 0 || val > this.state.totalPage || val < 1) {
                    return;
                }
                index = val;
                break;
        }
        if (index === this.state.currentIndex) {
            return;
        }
        this.changeTable(index);

    }
    preventClick(event) {
        event.stopPropagation();
        event.preventDefault();
    }
    render() {
        if (this.props.pager !== undefined && !this.props.pager) {
            return null;
        }
        let pager = [];
        let numTotalPage = this.props.totalPage;
        // 显示几个页面，默认显示6个
        let numShowPage = this.props.showPageNum ? this.props.showPageNum : 6;
        let strTotal =  '共' + numTotalPage + '页' + this.props.totalData + '条';
        let num = this.state.currentIndex > numShowPage ? this.state.currentIndex - numShowPage + 1 : 1;
        let endNum = (numTotalPage > numShowPage && this.state.currentIndex > numShowPage)
            ? this.state.currentIndex : (numTotalPage > numShowPage ? numShowPage : numTotalPage);
        for (let i = num; i <= endNum; i++) {
            let className = 'am-pagination-' + i;
            let aClsName = this.state.currentIndex === i ? ' active' : '';
            className += aClsName;
            pager.push(<li key={i} className={className} onClick={this.handleClick.bind(this, i)}>
                    <a>{i}</a></li>);
        }
        let isArrow = this.props.type === 'arrow' ? true : false;
        let isJump = this.props.jump != null ? this.props.jump : true;
        let isShowCount = this.props.showCount != null ? this.props.showCount : false;
        return <Nav>
                <ul className="pagination" onClick={this.preventClick.bind(this)}>
                    <li className="am-pagination-first " onClick={this.handleClick.bind(this, 1)}>
                         <a href="#" className=''>{isArrow ? '<<' : '第一页'}</a>
                    </li>
                    <li className="am-pagination-prev " onClick={this.handleClick.bind(this, 'prev')}>
                         <a href="#" className="">{isArrow ? '<' : '上一页'}</a>
                    </li>
                    {pager}
                    <li className="am-pagination-next " onClick={this.handleClick.bind(this, 'next')}>
                         <a href="#" className="">{isArrow ? '>' : '下一页'}</a>
                    </li>
                    <li className="am-pagination-last " onClick={this.handleClick.bind(this, 'last')}>
                         <a href="#" className=''>{isArrow ? '>>' : '最末页'}</a>
                    </li>
                    {isJump && <li className="am-pagination-goto">
                        <input ref="goto" type="text" className="goto" placeholder="页码"/>
                        <a href="#" onClick={this.handleClick.bind(this, 'goto')}>跳转</a>
                    </li>}
                    {isShowCount && <li className="am-pagination-total"><span>{strTotal}</span></li>}
                </ul>
            </Nav>;
    }
}
