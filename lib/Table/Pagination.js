/**
 * @file 分页组件
 * @author luyongfang
 */
var React = require('react');
var ReactDom = require('react-dom');
import {Nav} from 'react-bootstrap';
require('!style!css!sass!../../sass/app/_pagination.scss');
var Pagination = React.createClass({
        getInitialState: function () {
            return {
                currentIndex: 1,
                totalPage: this.props.totalPage
            };
        },
        componentWillReceiveProps: function (nextProps) {
            if (nextProps.totalPage !== this.state.totalPage) {
                this.setState({totalPage: nextProps.totalPage});
            }
        },
        componentWillMount: function () {
            // 请求默认的数据,更新tableDatas;
        },
        componentDidMount: function () {
        },
        changeTable: function (currentIndex) {
            this.props.changeData(currentIndex);
            this.setState({currentIndex: currentIndex});
        },
        setCurrentIndex: function (index) {
            this.setState({currentIndex: index});
        },
        handleClick: function (event) {
            event.preventDefault();
            var index = this.state.currentIndex;
            var target = $(event.target);
            var strIndex = target.parent('li').attr('class').split('-')[2];
            if (!isNaN(parseInt(strIndex, 0))) {
                index = strIndex * 1;
            }else {
                switch ($.trim(strIndex)) {
                    case 'first':
                        index = 1;
                        break;
                    case 'prev':
                        index = (index === 1) ? 1 : index - 1;
                        break;
                    case 'next':
                        index = (this.state.totalPage === index) ? index : index + 1;
                        break;
                    case 'last':
                        index = this.state.totalPage;
                        break;
                }
            }
            if (index === this.state.currentIndex) {
                return ;
            }
            this.changeTable(index);

        },
        render: function () {
            if (this.props.pager !== undefined && !this.props.pager) {
                return null;
            }
            var pager = [];
            var strTotal = '共' + this.props.totalPage + '页' + this.props.totalData + '条数据';
            var num = this.state.currentIndex > 6 ? this.state.currentIndex - 6 + 1 : 1;
            var endNum = (this.props.totalPage > 6 && this.state.currentIndex > 6)
                ? this.state.currentIndex : (this.props.totalPage > 6 ? 6 : this.props.totalPage);
            for (var i = num; i <= endNum; i++) {
                var className = 'am-pagination-' + i;
                var aClsName = this.state.currentIndex === i ? ' active' : '';
                className += aClsName;
                pager.push(<li key={i} className={className}><a href="#">{i}</a></li>);
            }

            return <Nav>
                    <ul className="pagination" onClick={this.handleClick}>
                        <li className="am-pagination-first ">
                             <a href="#" className=''>第一页</a>
                        </li>
                        <li className="am-pagination-prev ">
                             <a href="#" className="">上一页</a>
                        </li>
                        {pager}
                        <li className="am-pagination-next ">
                             <a href="#" className="">下一页</a>
                        </li>
                        <li className="am-pagination-last ">
                             <a href="#" className=''>最末页</a>
                        </li>
                        <li className="am-pagination-total"><span>{strTotal}</span></li>
                    </ul>

                </Nav>;
        }
    });

module.exports = Pagination;
