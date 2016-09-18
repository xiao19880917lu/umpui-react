### 更新日志

> 2016.09.18 修改Table组件的表头

```
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
    tips: true,  // 是否展示？tips，行相关
    expand: true, // 是否展示额外信息，行相关
    retract: false // retract 表格是否默认收起
}
Table中的自定义控件的传递方式变更：
支持传递 自定义基础组件 和 不常用组件
具体详见Table组件示例的 "可以自定义Header"示例
```
