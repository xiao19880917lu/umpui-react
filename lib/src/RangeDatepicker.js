/**
 * @file 日期范围选择组件
 * @Liuzechun <liuzechun@baidu.com>
 * @date 2016-08-12
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {DatePicker, Menu, Dropdown, Icon} from 'antd';
require('!style!css!sass!../../sass/app/_datepicker.scss');
const SubMenu = Menu.SubMenu;

export default class RangeDatepicker extends React.Component {
    constructor(props) {
        super(props);
        let start = null;
        let end = null;
        if (!!props.config && !!props.config.defaultValue) {
            if (!!props.config.defaultValue.start) {
                start = new Date(props.config.defaultValue.start);
            }
            if (!!props.config.defaultValue.end) {
                end = new Date(props.config.defaultValue.end);
            }
        }
        this.state = {
            startValue: start,
            endValue: end,
            endOpen: false,
            text: '快速选择'
        };
    }
    initText() {
        this.setState({text: '快速选择'});
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
    handleStartToggle({open}) {
        if (!open) {
            this.setState({endOpen: true});
        }
    }
    handleEndToggle({open}) {
        this.setState({endOpen: open});
    }
    onStartChange(value) {
        this.setState({startValue: value}, this.onChange);
        this.initText();
    }
    onEndChange(value) {
        this.setState({endValue: value}, this.onChange);
        this.initText();
    }
    // 对外接口 start/end 可以为字符串，也可以是Date对象
    setValue(start, end) {
        if (start) {
            if (!(start instanceof Date)) {
                start = new Date(start);
            }
            this.setState({startValue: start});
        }
        if (end) {
            if (!(end instanceof Date)) {
                end = new Date(end);
            }
            this.setState({endValue: end});
        }
    }
    // 对外接口
    getValue() {
        let {startValue, endValue} = this.getDatetime();
        return {start: startValue, end: endValue};
    }
    // 对外接口
    onChange() {
        let {startValue, endValue} = this.getDatetime();
        this.props.onChange({start: startValue, end: endValue});
    }
    // 快速设置日期、时间
    setDatetime(item) {
        let key = parseInt(item.key, 10);
        // 获取并快速设置日期和时间
        let {startValue, endValue, text} = this.calculate(key);
        this.setState({
            startValue: startValue,
            endValue: endValue,
            text: text
        }, this.onChange);
    }
    // 生成提供给父组件的数据
    // 返回起始值(startValue)和结束值(endValue)
    getDatetime() {
        let startValue = '';
        let endValue = '';
        if (this.state.startValue !== null) {
            startValue = this.format(this.state.startValue);
        }
        if (this.state.endValue !== null) {
            endValue = this.format(this.state.endValue);
        }
        return {startValue, endValue};
    }
    // 根据key计算需要设置的日期和时间
    calculate(key) {
        let text = '';
        let startValue = null;
        let endValue = null;
        let date = new Date();
        let now = date.getTime();
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        let oneday = 24 * 60 * 60 * 1000;
        let todayStart = date.getTime();
        switch (key) {
            case 1:
                text = '昨天';
                startValue = new Date(todayStart - oneday);
                endValue = new Date(todayStart - 1);
                break;
            case 2:
                text = '今天';
                startValue = new Date(todayStart);
                endValue = new Date(now);
                break;
            case 3:
                text = '本周';
                let day = date.getDay();
                startValue = new Date(todayStart - oneday * ((day + 6) % 7));
                endValue = new Date(now);
                break;
            case 4:
                text = '本月';
                date.setDate(1);
                startValue = new Date(date.getTime());
                endValue = new Date(now);
                break;
            case 11:
                text = '10分钟内';
                startValue = new Date(now - 10 * 60 * 1000);
                endValue = new Date(now);
                break;
            case 12:
                text = '30分钟内';
                startValue = new Date(now - 30 * 60 * 1000);
                endValue = new Date(now);
                break;
            case 13:
                text = '1小时内';
                startValue = new Date(now - 60 * 60 * 1000);
                endValue = new Date(now);
                break;
            case 14:
                text = '6小时内';
                startValue = new Date(now - 6 * 60 * 60 * 1000);
                endValue = new Date(now);
                break;
            case 15:
                text = '12小时内';
                startValue = new Date(now - 12 * 60 * 60 * 1000);
                endValue = new Date(now);
                break;
            case 16:
                text = '24小时内';
                startValue = new Date(now - 24 * 60 * 60 * 1000);
                endValue = new Date(now);
                break;
            default: break;
        }
        return {startValue, endValue, text};
    }
    // 把时期时间格式化为标准字符串
    format(date) {
        let datetime = '';
        datetime += date.getFullYear();
        datetime += '-' + this.fix(date.getMonth() + 1);
        datetime += '-' + this.fix(date.getDate());

        datetime += ' ' + this.fix(date.getHours());
        datetime += ':' + this.fix(date.getMinutes());
        datetime += ':' + this.fix(date.getSeconds());
        return datetime;
    }
    // 给个位数前面加0
    fix(value) {
        let str = '' + value;
        return str.length <= 1 ? '0' + str : str;
    }
    // 检测config中的属性是否存在
    isPropsHave(...args) {
        let len = args.length;
        let tmp = this.props;
        for (let i = 0; i < len; i++) {
            if (tmp[args[i]] !== undefined) {
                tmp = tmp[args[i]];
            } else {
                return false;
            }
        }
        return true;
    }
    render() {
        return (
            <div className="range-datepicker">
                <DatePicker disabledDate = { this.disabledStartDate.bind(this) }
                    format = "yyyy-MM-dd HH:mm:ss"
                    value = { this.state.startValue }
                    placeholder = "开始日期"
                    onChange = { this.onStartChange.bind(this) }
                    toggleOpen = { this.handleStartToggle.bind(this) }
                    showTime/>
                <DatePicker disabledDate = { this.disabledEndDate.bind(this) }
                    format = "yyyy-MM-dd HH:mm:ss"
                    value = { this.state.endValue }
                    placeholder = "结束日期"
                    onChange = { this.onEndChange.bind(this) }
                    open = { this.state.endOpen }
                    toggleOpen = { this.handleEndToggle.bind(this) }
                    showTime/>
                {this.renderPickerList()}
            </div>
        );
    }
    renderPickerList() {
        let showMenu = true;
        if (this.isPropsHave('config', 'showMenu')) {
            showMenu = this.props.config.showMenu;
        }
        const menu = (
            <Menu onClick={ this.setDatetime.bind(this) }>
                <Menu.Item key='1'>昨天</Menu.Item>
                <Menu.Item key='2'>今天</Menu.Item>
                <Menu.Item key='3'>本周</Menu.Item>
                <Menu.Item key='4'>本月</Menu.Item>
                <SubMenu title="其它">
                    <Menu.Item key='11'>10分钟内</Menu.Item>
                    <Menu.Item key='12'>30分钟内</Menu.Item>
                    <Menu.Item key='13'>1小时内</Menu.Item>
                    <Menu.Item key='14'>6小时内</Menu.Item>
                    <Menu.Item key='15'>12小时内</Menu.Item>
                    <Menu.Item key='16'>24小时内</Menu.Item>
                </SubMenu>
            </Menu>
        );
        return (
            <Dropdown overlay={menu} trigger={['click']}>
                <a className="ant-dropdown-link" hidden={!showMenu}>
                    {this.state.text} <Icon type="down" />
                </a>
            </Dropdown>
        );
    }
}
