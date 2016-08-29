/**
 * @file Business业务视图表单组件
 * @author renxintao@baidu.com
 * @date 2016-08-23
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {Form, Input, Button, DatePicker, Tooltip, Col} from 'antd';
const FormItem = Form.Item;
class BusinessForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startValue: null,
            endValue: null,
            endOpen: false
        };
    }
    componentDidMount() {
        let myDate = new Date();
        let startTime;
        let endTime;
        startTime = myDate.getFullYear() + '-';             // 取年份
        startTime += (myDate.getMonth() + 1 < 10 ? '0' + (myDate.getMonth() + 1) : myDate.getMonth() + 1) + '-';// 取月份
        startTime += myDate.getDate()  +  ' ';         // 取日期
        startTime += myDate.getHours() + ':';       // 取小时
        startTime += myDate.getMinutes() - 5 + ':';    // 取分
        startTime += myDate.getSeconds();
        let startValue = new Date(startTime);
        endTime = myDate.getFullYear() + '-';             // 取年份
        endTime += (myDate.getMonth() + 1) + '-';       // 取月份
        endTime += myDate.getDate() + ' ';         // 取日期
        endTime += myDate.getHours() + ':';       // 取小时
        endTime += myDate.getMinutes() + ':';    // 取分
        endTime += myDate.getSeconds();         // 取秒
        let endValue = new Date(endTime);
        this.setState({startValue: startValue, endValue: endValue});
    }

    /**
     * 点击查询触发函数
     * @param {Object} e
     * 查询提交表单操作
     */
    handleSubmit(e) {
        e.preventDefault();
        console.log('收到表单值：', this.props.form.getFieldsValue());
        this.props.form.validateFields((errors, values) => {
            if (!!errors) {
                console.log('Errors in form!!!');
                return;
            }
            console.log('Submit!!!');
            console.log(values);
            this.props.onSearch(values);
        });
    }

    /**
     * 点击重置触发函数
     * @param {Object} e
     * 重置表单操作
     */
    handleReset(e) {
        e.preventDefault();
        this.props.form.resetFields();
    }
    disabledStartDate(startValue) {
        if (!startValue || !this.state.endValue) {
            return false;
        }
        return startValue.getTime() >= this.state.endValue.getTime();
    }
    disabledEndDate(endValue) {
        if (!endValue || !this.state.startValue) {
            return false;
        }
        return endValue.getTime() <= this.state.startValue.getTime();
    }
    onChange(field, value) {
        console.log(field, 'change', value);
        this.setState({
            [field]: value
        });
    }
    onStartChange(value) {
        this.onChange('startValue', value);
    }
    onEndChange(value) {
        this.onChange('endValue', value);
    }
    handleStartToggle({open}) {
        if (!open) {
            this.setState({endOpen: true});
        }
    }
    handleEndToggle({open}) {
        this.setState({endOpen: open});
    }
    render() {
        const {getFieldProps, getFieldError, isFieldValidating} = this.props.form;
        const startLinkProps = getFieldProps('startLink', {
            rules: [
                {required: true, message: '开始链路不能为空！'}
            ]
        });
        return (
            <Form form={this.props.form} inline>
                <FormItem label='开始时间：'>
                    <DatePicker
                      disabledDate={this.disabledStartDate.bind(this)}
                      showTime
                      format='yyyy-MM-dd HH:mm:ss'
                      value={this.state.startValue}
                      placeholder='开始日期'
                      onChange={this.onStartChange.bind(this)}
                      toggleOpen={this.handleStartToggle.bind(this)} {...getFieldProps('startTime')}/>
                </FormItem>
                <FormItem label='结束时间：'>
                    <DatePicker
                      disabledDate={this.disabledEndDate.bind(this)}
                      showTime
                      format='yyyy-MM-dd HH:mm:ss'
                      value={this.state.endValue}
                      placeholder='结束日期'
                      onChange={this.onEndChange.bind(this)}
                      open={this.state.endOpen}
                      toggleOpen={this.handleEndToggle.bind(this)} {...getFieldProps('endTime')}/>
                </FormItem>
                <FormItem label='开始链路' required>
                   <Tooltip title='可填写ip、网段、机房、区域'>
                      <Input {...startLinkProps} placeholder='源地址(必填)' id='startLink' name='startLink'/>
                    </Tooltip>
                </FormItem>
                <FormItem label='结束链路'>
                    <Tooltip title='可填写ip、网段、机房、区域, 留空则不指定目的地'>
                      <Input placeholder='目的地址(选填)'
                        {...getFieldProps('endLink')}/>
                    </Tooltip>
                </FormItem>
                <FormItem>
                    <Button type='primary' htmlType='submit' onClick={this.handleSubmit.bind(this)}
                    icon='search'>查询</Button>
                    &nbsp;&nbsp;&nbsp;
                    <Button type='ghost' onClick={this.handleReset.bind(this)} icon='reload'>重置</Button>
                </FormItem>
            </Form>
        );
    }
}
BusinessForm = Form.create()(BusinessForm);
module.exports = BusinessForm;