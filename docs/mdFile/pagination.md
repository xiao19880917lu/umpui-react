### 参数说明
    changeData: function(pageIndex) 默认从1开始
    pager: true/false 是否显示分页
    totalPage: number 一共多少页
    totalData: number 一共多少条数据
    jump: true/false 是否展示跳转,默认展示
    showPageNum: number 页码要展示几个,可根据内容的宽度自行调整
    showFirstLast: true/false 是否要展示第一页和最后一页
    type: 'arrow/text' arrow第一页最后一页<<>> 上一页和下一页<> 3页36条 简化
    showCount: true/false 是否展示最后的页数和条数
    
### 源代码  
 
```
import React from 'react';
import ReactDOM from 'react-dom';
import Pagination from 'umpui-react';

let pagination = {
    pager: true,
    totalPage: 20,
    totalData: 40,
    jump: true,
    showPageNum: 3,
    showFirstLast: true,
    type: 'text',
    showCount: true        
};
<Pagination {pagination}/>

```
