/**
 * @file example
 * @author luyongfang@baidu.com
 * @desc use ES6 not ES5
 * */
import React from 'react';
import ReactDOM from 'react-dom';
import Table from '../lib/Table/Table.js';
const props = {
    tableCfg: {
        title: 'table title test',
        tags: {
            id: 'ID',
            username: '用户名',
            passwd: {
                title: '密码',
                render(v, row) {
                    let style = {
                        color: 'red'
                    };
                    return <span style={style}>{v}</span>;
                }
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
                    link(d, data) {
                        let toLink = '/CaseDetail/' + data['id'];
                        return {
                            basicLink: toLink
                        };
                    },
                    beforeLink(d, data) {
                        window.currentDetail = data;
                        localStorage.setItem('currentDetail', JSON.stringify(window.currentDetail));
                    }
                }],
                render(d, data) {
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
            'tips': true
        }
    },
    content: [
        {id: 1, username: 'luyongfang', passwd: 'xiaolu', expand: 'sss', desc: 'ABC', json: {a: 1,b: 2}},
        {id: 2, username: 'liuxiaoyu', passwd: 'xiaoyu', expand: '333', desc: 'EFG',tips: '真的不能选择', disabled: true},
        {id: 3, username: 'wangyang21', passwd: 'wangyang21', expand: 'ssdd', desc: 'ERT'},
        {id: 4, username: 'zhangchunyu', passwd: 'xiaoyu', expand: 'ddff', desc: 'QWE'},
        {id: 5, disabled:true, username: 'wangyang21', passwd: 'wangyang21', expand: 'ssdd', desc: 'ERT'},
        {id: 6, username: 'wangyang21XXX', passwd: 'wangyang21', expand: 'ssdd', desc: 'ERT'},
        {id: 7, username: 'wangyang21YYY', passwd: 'wangyang21', expand: 'ssdd', desc: 'ERT'},
        {id: 8, username: 'wangyang21QQQ', passwd: 'wangyang21', expand: 'ssdd', desc: 'ERT'},
        {id: 9, username: 'wangyang21RRR', passwd: 'wangyang21', expand: 'ssdd', desc: 'ERT'},
        {id: 10, username: 'wangyang21TTT', passwd: 'wangyang21', expand: 'ssdd', desc: 'ERT'},
        {id: 11, username: 'wangyang21YYY', passwd: 'wangyang21', expand: 'ssdd', desc: 'ERT'},
    ]
};
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // state init
        };
        // propery init after super, you can get this object
        this.classProperty = {};
    }
    componentWillReceiveProps(nextProps) {
        // 第一次页面渲染不调用,一般第二次+根据某些props判断是否需要更新
    }
    componentDidMount() {
        // 只调用一次，第一次
    }
    componentWillUnmount() {
    }
    componentDidUpdate() {
    }
    render() {
        return (<div className="main">
            <Table {...props} ref="table"/>
            </div>);
    }
}

// render app in container element
ReactDOM.render(<App />, document.getElementById('container'));
