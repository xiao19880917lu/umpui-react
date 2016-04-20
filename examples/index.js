/**
 * @file 文件上传组件调用
 * @author wujie08@baidu.com
 * */
import React from 'react';
import ReactDOM from 'react-dom';
var Upload = require('../lib/Upload.jsx');

var App = React.createClass({
        render: function () {
            return <div>
                <Upload url="upload_test.php" name="files" />
            </div>;
        }
    });
ReactDOM.render(<App />, document.getElementById('container'));
/** 
 * <Upload url="upload_test.php" name="files" />
 * url: 文件上传地址
 * name: 文件传输后端的文件名, php后台可通过$_FILES['files']获取所有上传文件
 *
 */      
