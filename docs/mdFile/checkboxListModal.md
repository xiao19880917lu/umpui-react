### checkbox列表弹出框  
    弹出层上需要展示一个checkbox列表 
### 配置参数Props  
    modalCon:  配置参数对象
    item: {k:v, k:v}需要展示的数据
### 源代码  
 
```
let modalCon3 ={
    type: 'checkbox' // 可以为
};
let modalData3 = {
    id: 'ID',
    name: {
        title: '姓名',
        display: false // display为false设置不选择
    },
    desc: '描述'
};
 <ReactModal ref="ckModal" modalCon={modalCon3} item={modalData3} handleModalClick={this.handleModalClick}/>
```
### 确定按钮回调函数  
```
handleModalClick(params, paramsValue) {
    // paramsValue为kv对象, v=true代表已选中,格式如下
    paramsValue = {
        id: true,
        name: false,
        desc: true
    }
}
```
### 单独获取checkbox-list列表的值
```
    let formVal = this.refs.ckModal.getFormValues();
    // formVal格式如下:
    formVal = {
        id: true,
        name: false,
        desc: true
    };
```
