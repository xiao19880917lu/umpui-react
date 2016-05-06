/**
 * @file 文件批量上传组件
 * @author wujie08@baidu.com
 * */
import React from 'react';
import {Button} from 'react-bootstrap';
// 导入dropzone
import Dropzone from 'dropzone';

Dropzone.autoDiscover = false;

class Upload extends React.Component {
    componentDidMount() {
        Dropzone.options.dropzoneArea = {
            autoProcessQueue: false,
            uploadMultiple: true,
            parallelUploads: 100,
            maxFiles: 100,
            dictDefaultMessage: '点击上传文件', // default messages before first drop
            paramName: this.props.name, // The name that will be used to transfer the file
            maxFilesize: 2, // MB
            addRemoveLinks: true,
            accept: function (file, done) {
                done();
            },
            init: function () {
                var dzHandler = this;

                this.element.querySelector('button[type=submit]').addEventListener('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    dzHandler.processQueue();
                });
                this.on('addedfile', function (file) {
                    console.log($('#dropzone-area').attr('action'));
                });
            }
        };
        $('#dropzone-area').dropzone({
            url: this.props.url
        });
    }
    render() {
        return (
            <form id="dropzone-area" action={this.props.url} method="post" encType="multipart/form-data"
                className="well dropzone" style={{minHeight: '160px'}}>
                <div className="fallback">
                    <input name="file" type="file" multiple />
                </div>
                <Button type="submit" bsStyle="primary" className="pull-right">开始上传</Button>
                <div className="dropzone-previews"></div>
            </form>
        );
    }

}

module.exports = Upload;

/**
 * <Upload url="upload_test.php" name="files" />
 * url: 文件上传地址
 * name: 文件传输后端的文件名, php后台可通过$_FILES['files']获取所有上传文件
 */
