/**
 * @file 导出表格数据组件
 * @Liuzechun <liuzechun@baidu.com>
 */
import React from 'react';
import ReactDOM from 'react-dom';
import MarkdownElement from '../../lib/MarkdownElement.js';
import Export from '../../lib/src/Export.js';
export default class ExprotApp extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const mdText = require('text!../mdFile/export.md');
        // 以下均为模拟数据，在实际应用中可根据情况获取
        let config = {
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
            total: 1320,
            // 其他用户自定义传给后台的参数
            otherparms: {}
        };
        return (
            <div className="umpui-component">
                <h3 className="umpui-layer umpui-title">数据导出</h3>
                <Export config={config} />
                <div className="umpui-layer umpui-block">
                    <MarkdownElement text={mdText}/>
                </div>
            </div>
        );
    }
}
