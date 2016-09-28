### 参数说明
    可选参数：
    showMenu: 是否显示快速选择菜单(true/false)
    defaultValue:{  输入框默认值
        start: String 默认起始值
        end:   String 默认截止值
    }

    事件：
    onChange: 当输入框中内容变更时触发
        接收参数： {start, end} 为一个对象，同getValue

    对外接口：
    getValue: 获取数据
        return: {start, end} 返回值为一个对象，包括两个值，start/end
    setValue: 设置自定义日期
        params:(start[, end]) 参数为一个或两个值，第一个为起始时间，第二个为结束时间，可以是字符串，也可以是Date对象
        return null;
### 源代码  
 
```
import React from 'react';
import ReactDOM from 'react-dom';
import RangeDatepicker from 'umpui-react';

export default class RangeDatepickerApp extends React.Component {
    constructor(props) {
        super(props);
    }
    onChange({start, end}) {
        console.log(start, end);
    }
    getValue() {
        let result = this.refs.datepicker.getValue();
        console.log(result);
    }
    setValue() {
        let start = '2016-08-13 13:09:58';
        let end = '2016-09-28 13:00:58';
        // start = new Date(start);
        // end = new Date(end);
        // this.refs.datepicker.setValue(start);
        // this.refs.datepicker.setValue(null, end);
        this.refs.datepicker.setValue(start, end);
    }
    render() {
        let config = {
            showMenu: true,
            // defaultValue: {
            //     start: '2016-08-13 13:09:58',
            //     end: '2016-08-16 19:09:58'
            // }
        }
        return (
            <RangeDatepicker config={config} onChange={this.onChange.bind(this)}/>
            <Button type="primary" onClick={this.getValue.bind(this)}>获取数据</Button>
            <Button type="primary" onClick={this.setValue.bind(this)}>设置自定义日期</Button>
        );
    }
}
```
