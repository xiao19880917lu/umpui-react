### 功能  
 
    比如有些表单的填写需要通过好几个步骤完成,带有上一步、下一步、提交等的表单    
### 参数说明:  
    formConfig: 对象
    formData: 初始化的表单数据, 初始化的表单数据和下面的storeData的格式一样
    submit: 表单提交时的处理函数,回传参数(data)-详细如下   

###  源代码  

```
import React from 'react';
import ReactDOM from 'react-dom';
import FormSlider from 'umpui-react';
let formConfig = {
    title: '执行工具接口说明', // 可有可无
    preBtn: true, // 是否显示上一步，即用户可以返回修改
    sliderStepsConfig: [  // 表单填写分为几个步骤,key必须是sliderStepsConfig，是一个对象数组
        {
            formConfig: [  // formConfig是当前步骤所需要展示的表单数组
                {
                    type: 'input', // type可以使input,select,datetime
                    label: 'widget名字',
                    inputType: 'text',
                    ref: 'widget_name',
                    fill: true, // 字段是否必须填写,必填会在label后显示红色*号
                    placeholder: 'widget_name的方法',
                    validate: {   // 这个可以写正则校验规则，如果不符合则会给出提示
                        preg: '^s',
                        errMsg: '以s开头' 
                    }
                }, {
                    type: 'input',
                    label: 'widget接入的url',
                    inputType: 'text',
                    ref: 'widget_url',
                    fill: true,
                    placeholder: 'widget-url'
                }, {
                    type: 'select',
                    label: '接口类型',
                    ref: 'widget_base1',
                    inputType: 'select',
                    placeholder: 'tool name',
                    fill: true,
                    opMap: { // 如果是select，则需要提供opMap字段，生成下拉框
                        all: '请选择',
                        rmsOpen: '开放平台',
                        phpRpc: 'RPC调用方式',
                        httpRestful: 'restfull接口',
                        hprose: 'Hprose方式'
                    }
                }
                            
            ]
        }
    ]
}
class demo extends React.component {
    render() {
        return(
            <FormSlider formConfig={sliderConfig} formData={formData} submit={this.handleFormSliderSubmit}/>
        )
    }
}

```

### submit回传参数和初始化数据formData格式   
```
    // 每一个对象是每一个步骤中的数据,其中key对应formConfig中的ref  
    [{
        widget_name: '',
        widget_url: ''
    },{
        start_time: '',
        widget_base1: ''
    }]
```     
