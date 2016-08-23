### 参数说明
    必选参数：
        loading: 是否显示正在加载(true/false)

    可选参数：
        tip: 自定义加载提示，可以是任何内容
### 源代码  
```
import React from 'react';
import ReactDOM from 'react-dom';
import Loading from 'umpui-react';

export default class LoadingApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
    }
    render() {
        // 这里可以是任何内容
        const container = (
                    <div style={{ width: 300 }}>
                        <p>这里可以是任何内容</p>
                        <p>可以是表单</p>
                        <p>也可以是对话框</p>
                    </div>
                );
        const tip = (
                    <span>正在加载中...</span>
                );
        return (
            <Loading key="1" loading={this.state.loading}>
                {container}
            </Loading>
            <Loading key="2" loading={true} tip={tip}>
                {container}
            </Loading>
        );
    }
}
```
