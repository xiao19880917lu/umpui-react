### 功能
    通过配置可以自定义HighCharts图表内容
### 配置参数: 即props
    xAxis: 配置坐标轴
    legend: 配置图例
    plotOptions: 配置标识选项，其中point.event.mouseOver事件用于多图联动
    tooltip: 配置提示框
    series: 配置数据列
    更多配置见HighCharts配置
### 源代码

```
import React from 'react';
import ReactDOM from 'react-dom';
import ReactHighcharts from 'umpui-react';

let config = {
    xAxis: {
        categories: ['Jan', 'Fed', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        borderWidth: 0
    },
    plotOptions: {
        series: {
            point: {
                events: {
                    mouseOver() {
                        EventSystem.evoke('toolbodyConf6_1', this.x, 'execute');
                        EventSystem.evoke('toolbodyConf6_2', this.x, 'execute');
                        EventSystem.evoke('toolbodyConf6_3', this.x, 'execute');
                    }
                }
            }
        }
    },
    tooltip: {
        shared: true,
        crosshairs: {
            width: 1,
            color: 'gray',
            dashStyle: 'Solid'
        }
    },
    series: [{
            name: 'Tokyo',
            data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
        }, {
            name: 'New York',
            data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
        }, {
            name: 'Berlin',
            data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
        }, {
            name: 'London',
            data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
    }]
}
<ReactHighcharts config={config}/>
```
