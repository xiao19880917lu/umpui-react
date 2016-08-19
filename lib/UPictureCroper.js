import React from 'react';
import {Modal, Upload, Icon, Button, message} from 'antd';
import Cropper from 'react-cropper';


/**
 * 图片裁剪、预览、上传
 */
export default class UPictureCroper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            localImg: ''
        };
    }

    static propTypes = {
        imgName: React.PropTypes.string.isRequired, // 图片唯一标识
        handleCropperUpload: React.PropTypes.func.isRequired // 保存函数 
    };


    /**
     * 打开图片裁剪组件
     */
    handleOpen(e) {
        this.setState({
            visible: true,
        });
    }

    /**
     * 关闭图片裁剪组件
     */
    handleClose() {
        this.setState({
            visible: false
        });
    }

    /**
    * 将选中区域的base64码上传服务器
    */
    handleCropper(handleCropperUpload) {
        if(this.refs.cropper.getCroppedCanvas() === undefined) {
            message.warning('未选择上传图片!');
            return;
        }
        // console.log(this.state.imgName);
        let imgName = this.props.imgName;
        // 获取图片的base64码
        let imgBase64 = this.refs.cropper.getCroppedCanvas().toDataURL();
        // 设置图片为裁剪内容的base64码
        this.setState({
            imgBase64: imgBase64,
            visible: false
        });
        // js 模拟form表单提交图片
        this.refs.cropper.getCroppedCanvas().toBlob(function(blob){
            handleCropperUpload(blob, imgName);
        }.bind(this));
    }

    onChange(info) {
        if (info.file.status === 'done') {
            info.fileList = [];
            let orifile = info.file.originFileObj;
            var reader = new FileReader();
            reader.readAsDataURL(orifile);
            reader.onload = function (e) {
                this.setState({
                    localImg: e.target.result
                });
            }.bind(this);
        }
    }

    render() {
        return (
            <div className='pictureModal'>
                <img className='originalPic' src={this.state.imgBase64 == null ? this.props.imgSrc : this.state.imgBase64} alt='请点击编辑图片' onClick={this.handleOpen.bind(this)} />
                <Modal className='pictureEdit' title='编辑图片'
                    visible={this.state.visible} onOk={this.handleCropper.bind(this, this.props.handleCropperUpload)} onCancel={this.handleClose.bind(this)} width='70%' >
                    <Upload name='file' showUploadList={false} onChange={this.onChange.bind(this)} >
                        <Button type="button">
                            <Icon type="upload" /> 点击上传
                        </Button>
                    </Upload>
                    <div className='pictureCrop' style={{width: '100%', height: 250, padding: 5}}>
                        <div className="box" style={{width: 160, height: '100%', float: 'left', margin: 5, paddingTop: 30}}>
                            <div style={{fontSize: 16, textAlign: 'center'}}>图片预览</div>
                            <div className="img-preview" style={{width: 160, height: 160, overflow: 'hidden', border: '1px solid silver'}}/>
                        </div>
                        <div className='pictureContainer' style={{height: '100%',float: 'right', width: 'calc(100% - 170px)'}}>
                            <Cropper
                                ref='cropper'
                                src={this.state.localImg}
                                style={{height: '100%', width: '100%'}}
                                aspectRatio={4 / 3}
                                preview=".img-preview"
                                guides={false}
                                />
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}

