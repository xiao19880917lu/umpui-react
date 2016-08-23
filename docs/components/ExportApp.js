/**
 * @file 导出表格数据组件
 * @Liuzechun <liuzechun@baidu.com>
 */
import React from 'react';
import ReactDOM from 'react-dom';
import MarkdownElement from '../../lib/MarkdownElement.js';
import Export from '../../lib/src/Export.js';
import {Button} from 'antd';
export default class ExprotApp extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const mdText = require('text!../mdFile/export.md');
        // 以下均为模拟数据，在实际应用中可根据情况获取
        let config1 = {
            // 导出数据接口的url（一般可直接使用分页接口）
            url: 'php/download.php',
            search: {
                // 需要后端返回的字段
                keys: 'id,hostname,sn,status,model_id,rack,container_id,rms_product_id',
                // 其他的各种搜索条件
                conditions: {
                    'container_id': 484,
                    'zone': 'china',
                    'type': 'server'
                }
            },
            // 表格中要显示的字段，以及字段对应的表头
            headers: {'id': 'ID', 'hostname': '主机名', 'sn': 'SN', 'status': '状态', 'model_id': '型号', 'rack': '机架位'},
            // 当前表格所有数据的总条数
            total: 720
        };
        let config2 = {
            url: 'php/download.php',
            search: {
                keys: 'id,hostname,sn,status,model_id,rack,container_id,rms_product_id',
                conditions: {
                    'container_id': 484,
                    'type': 'server'
                }
            },
            headers: {'id': 'ID', 'hostname': '主机名', 'sn': 'SN', 'status': '状态', 'model_id': '型号', 'rack': '机架位'},
            total: 720,
            otherparms: {},
            message: {
                page1: ['请注意，程序会自动根据分页大小依次向服务端请求数据，全部请求完毕后生成Excel下载。不要将分页大小设置的过大，以免服务器端查询数据超时。'],
                page2: ['如果下载的文件用Excel打开提示文件格式与扩展名不一致，请选择“是”，直接用Excel打开即可。', '为防止常规单元格式下excel的自动转化，所有字段均转化为文本！']
            }
        };
        let data = {
            data: [{'id': '1924', 'hostname': 'tc-click-log1-off.tc', 'sn': '686N32X',
                    'status': '14', 'model_id': '15', 'rack': 'TC706-03-11-4',
                    'container_id': '488', 'rms_product_id': '174'}
                ],
            headers: {'id': 'ID', 'hostname': '主机名', 'sn': 'SN', 'status': '状态', 'model_id': '型号', 'rack': '机架位'}
        };
        return (
            <div className="umpui-component">
                <h3 className="umpui-layer umpui-title">数据导出</h3>
                <Export config={config1}>
                    <Button key='1' type = "primary">默认导出</Button>
                </Export>
                &nbsp;&nbsp;&nbsp;
                <Export config={config2}>
                    <Button key='2' type = "primary">提示导出</Button>
                </Export>
                &nbsp;&nbsp;&nbsp;
                <Export data={data}>
                    <Button key='3' type = "primary">同步导出</Button>
                </Export>
                <div className="umpui-layer umpui-block">
                    <MarkdownElement text={mdText}/>
                </div>
            </div>
        );
    }
}
