/**
 * @file 文件上传组件调用
 * @author wujie08@baidu.com
 * */
import React from 'react';
import ReactDOM from 'react-dom';
import {Row, Col, Panel} from 'react-bootstrap';
import Upload from '../lib/Upload';
import Header from '../lib/Header';

let data = {
        '仪表盘': '?r=newdashboard',
        '运维': '?r=op/task',
        '监控': '?r=op/alert',
        '组态': '?r=configure',
        '资产': '?r=op/resource',
        '人员': '?r=op/personnel/',
        '报表': '?r=op/report/',
        '周报': '?r=op/weekly/',
        '智能散热': '?r=cooling/index'
    };

let menuData = {
    dropdown: {
        icon: 'icon-user',
        name: '伍婕',
        data: {
            '设置': '?r=op/setting',
            '退出': '?r=op/quit'
        }
    }
};
let operationData = {
    'search': 'fa fa-search',
    'alert': 'fa fa-bell-o',
    'list': 'fa fa-list'
};
class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <div>
            <p>菜单栏组件展示</p>
            <Header navData={this.props.navData} menuData={this.props.menuData}
        icon={this.props.icon} operationData={this.props.operationData}/>
            <p>文件批量上传组件展示</p>
            <Upload url="upload_test.php" name="files" />
            </div>;
    }
}
ReactDOM.render(<App navData={data} menuData={menuData} icon='../dist/img/oicon.png' operationData={operationData} />,
        document.getElementById('container'));
