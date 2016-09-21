### 更新日志

> 2016.09.18 修改Table组件的表头

```
变更1：
display参数由原来的：
display: {
    'filter': true,
    'tips': true,
    'expand': true,
    'export': true,
    'switchTags': true,
    'setPageSize': true,
    'refresh': true,
    'editTable': true,
    'fullScreen': true
    retract: false // retract 表格是否默认收起
}
变更成了
display: {
    basic: ['filter', 'export', 'refresh', 'editTable', 'fullScreen', 'switchTags'],
    menus: ['filter', 'export', 'refresh', 'fullScreen', 'switchTags', 'setPageSize'],
    tips: true,  // 是否展示tips，行相关
    expand: true, // 是否展示额外信息，行相关
    retract: false // retract 表格是否默认收起
}
其中：
basic 数组中存放的视为基础控件，直接展示在表头
menus 数组中存放的视为不常用控件，放在名为菜单的按钮下，以下拉框的形式展示
上面示例包含了所有可用控件，如不需要，可省略不写

变更2：
Table中的自定义控件的传递方式变更：
支持传递 自定义基础组件 和 不常用组件
具体详见Table组件示例的 "可以自定义Header"示例
```
