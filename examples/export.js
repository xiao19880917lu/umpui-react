/**
 * @file 文件上传组件调用
 * @author wujie08@baidu.com
 * */
import React from 'react';
import ReactDOM from 'react-dom';
import ExportExcel from '../lib/ExportExcel';


const tagsData = {
    id: 'ID',
    username: 'OMS账号',
    display_name: '姓名',
};
const excelData = [
    {id: 1, username: '苹果', display_name: 'hahah'},
];
class App extends React.Component {
    getExportData() {
        let arrRet = [];
        arrRet['tags'] = tagsData;
        arrRet['data'] = excelData;
        return arrRet;
    }
    render() {
        return (
          <ExportExcel url='./action/excel.php' title='人员信息' getData={this.getExportData} />
        )
    }
}
ReactDOM.render(<App  />,
        document.getElementById('container'));
