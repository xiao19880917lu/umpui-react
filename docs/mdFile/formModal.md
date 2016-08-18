### Form表单弹出框  
    适用于Modal弹出层上需要显示表单的情况，提供了表单提交的接口  
### 配置参数props:
        modalCon: {type: 'form'} // 必须
        item: {config: [{},{}]} // 要展示表单需要配置什么  
### 源代码
```
let modalCon2 = {
    type: 'form'
};
let modalData2 = {
    config: [  // 配置要展示的form列表
        {
            type: 'input', // 可选 input, select. datetime
            label: '转交给:',
            name: 'take_person', // 必须,用来获取表单值上传给父组件的值
            isEmpty: false,
            validate: 'string',
            desc: '请输入邮箱前缀'
        },
        {
            type: 'select',
            label: '转交原因',
            name: 'reason',
            isEmpty: false,
            validate: 'string',
            map: [
                {label: '请选择', value: '请选择'},
                {label: '休假', value: '休假'},
                {label: '非本人值班', value:'非本人值班'},
                {label: '技术困难', value: '技术困难'},
                {label: '专业不匹配', value: '专业不匹配'},
                {label: '职责不匹配', value: '职责不匹配'},
                {label: '临时有事', value: '临时有事'}
            ]
        }, {
            type: 'datetime',
            label: '到',
            name: 'endTime',
            viewMode: 'datetime'
        }
    ]
};
<ReactModal modalCon={modalCon2} item={modalData2} handleModalClick={this.handleModalClick}/>
```
### 确定按钮回调函数参数  
```
handleModalClick(itemParams, checkboxiParams, item) {
    // itemParams  融合了display，和title的item对象
    // checkboxParams 如果是checkbox列表，则是kv的对象，否则是默认的this.props.data 
    // item即传递的this.props.item
}
itemParams = {
    'take_person': 'luyongfang',
    'reason': 'XXXXX'
}
```
