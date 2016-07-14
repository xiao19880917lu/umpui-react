### 使用演示  

    本页面上方导航

### 源代码展示  
```
import React from 'react';
import ReactDOM from 'react-dom';
import Header from 'umpui-react';

let header = {
    navData: {
        '仪表盘': '?r=newdashboard',
        '运维': '?r=op/task',
        '监控': '?r=op/alert',
    },
    menuData: {
        dropdown: {
            icon: 'icon-user',
            name: '陆永芳',
            data: {
                '设置': '?r=op/setting',
                '退出': '?r=op/quit'
            }
        }
    },
    operationData: {
        'search': 'fa fa-search',
        'alert': 'fa fa-bell-o',
        'list': 'fa fa-list'
    }
};
var App = React.createClass({
        render: function () {
            return <div>
                <Header navData={this.props.navData} menuData={this.props.menuData} 
                icon={this.props.icon} operationData={this.props.operationData} />
            </div>;
        }
    });
ReactDOM.render(<App navData={header.navData} menuData={header.menuData}
icon='../dist/img/oicon.png' operationData={header.operationData} />,
        document.getElementById('container'));
```
