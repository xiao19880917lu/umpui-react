### 源代码  
```
import React from 'react';
import ReactDOM from 'react-dom';
import ReactModal from '../../lib/ReactModal';
let modalCon = {
    type: 'checkbox',
    direction: 'horizontal' // 列表是横向展示还是纵向展示，默认是纵向vertical展示
};
let item = {
    id: 'ID',
    name: '姓名',
    desc: '描述'
}  
class demo extends React.component {
    constructor(props) {
        super(props)
        this.state = {
            modal: true
        };
    }
    openModal() {
        this.setState({modal: !this.state.modal});
    }
    render() {
        return(
            <ReactModal  ref="cklist" modalCon={modalCon} close={this.state.modal} item={item} />
        )
    }
}
```
