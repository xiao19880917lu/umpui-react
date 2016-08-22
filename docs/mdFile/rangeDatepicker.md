### 参数说明
    可选参数：
    showMenu: 是否显示快速选择菜单(true/false)
    defaultValue:{  输入框默认值
        start: String 默认起始值
        end:   String 默认截止值
    }

    事件：
    onChange: 当输入框中内容变更时触发
### 源代码  
 
```
import React from 'react';
import ReactDOM from 'react-dom';
import RangeDatepicker from 'umpui-react';

export default class RangeDatepickerApp extends React.Component {
    constructor(props) {
        super(props);
    }
    onChange(start, end) {
        console.log(start, end);
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
        );
    }
}
```
