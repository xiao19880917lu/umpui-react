### 功能  

  通过配置生成配置表单 
### 配置参数  
```
    title: '自定义渲染表单的标题'
    tableFormConfig: {
        config: config,
        defaultParams: defaultParams
        // 其他如果config中有select，需要提供对应的map列表，具体参考调用方式
    }
```

### 源代码  

```
import React from 'react';
import ReactDOM from 'react-dom';
import ReactTableForm from 'umpui-react';
let tableFormConfig = (function () {
    var config = {
        'label': {
            name: 'label标签名',
            type: 'input'
        },
        'type': {
            name: '参数类型',
            type: 'select',
            typeMap: {
                input: 'input输入框',
                date: '日期输入框',
                noc: 'noc资源', // 如果为自定义的noc，且还有二级select列表需要提供如下方return中的noc字段
                textarea: '文本区域输入框'
            }
        },
        'name': {
            name: '参数字段名',
            type: 'input'
        },
        'default': {
            name: '默认参数值',
            type: 'input'
        },
        'buttons': { // 按钮删除增加样式配置
            add: 'fa fa-plus',
            del: 'fa fa-minus'
        }
    };
    var defaultParams = [{ // 默认一行的参数配置
        'label': 'TEST_TEST',
        'type': 'input',
        'name': 'username',
        'default': '',
        'defaultValueType': 'input'
    }];
    return {
        config: config,
        defaultParams: defaultParams,
        noc: {
            key1: 'KEY1',
            key2: 'KEY2'
        }
    };
})();

class demo extends React.component {
    render() {
        return(
            <ReactTableForm ref="tableForm" tableFormConfig={tableFormConfig} title="自定义渲染表单元素的标题"/>
        )
    }
}
```

### 获取表单结果  
```
// 获取表单结果,同样返回对象数组,k为config中的k
this.refs.tableForm.getFormValues(); 
``` 
