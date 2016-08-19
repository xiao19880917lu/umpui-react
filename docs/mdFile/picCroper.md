### 使用演示  

引入UPictureCroper组件，需要传入两个props
1、imgIdentify 这个字符串唯一标识编辑图片的名称
2、handleCropperUpload 这是一个函数，带有两个参数，一是图片名，二是图片数据
    可以在这个函数中通过FormData模拟表单文件提交，将图片提交到后台
    

### 源代码展示 

```
import React from 'react';
import ReactDOM from 'react-dom';
import {message} from 'antd';
import 'antd/dist/antd.css';
import UPictureCroper from '../lib/UPictureCroper';
/**
 * 引入crop的css样式
 */
require('!style!css!sass!../node_modules/react-cropper/node_modules/cropperjs/dist/cropper.css');

message.config({
    top: 100
});

/**
 * 入口类，点击展示Modal的功能
 */
class Demo extends React.Component {
    /**
     * 上传文件回调函数
     */
    handleCropperUpload(blob, imgName) {
        let formData = new FormData();
        formData.append('imgBlob', blob);
        formData.append('imgName', imgName);
        message.success('保存成功！');
        console.log(blob, imgName);
        /**
         * 将文件上传服务器保存, 这里使用FormData模拟表单提交
         */
        // let that = this;
        /*$.ajax('?r=dcim/api/editImage',{
            method: 'post',
            data: formData,
            processData: false,
            contentType: false,
            success: function(res) {
                console.log(res);
                res = JSON.parse(res);
                if (res.status * 1 === 0) {
                    message.success(res.msg);
                    that.setState({
                        visible: false
                    });
                    that.props.handleClose();
                } else {
                    message.error(res.msg);
                }
            },
            error: function(res) {
                message.error(res);
            }
        });*/
    }

    render() {
        return (
            <UPictureCroper handleCropperUpload={this.handleCropperUpload.bind(this)} imgSrc='../dist/img/oicon.png' imgName='imgIdentify'/>
        );
    }
}

ReactDOM.render(<Demo />, document.getElementById('container'));

```
