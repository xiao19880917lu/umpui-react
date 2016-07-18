import React from 'react';
import ReactDOM from 'react-dom';
import '../dist/css/antd.css';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';

const ExportExcel  = React.createClass({
    getInitialState() {
        return {
            excelData: ''
        };
    },
    handleExport() {
        let arrRet = this.props.getData();
        let tags = this.getExportTableHeader(arrRet['tags']);
        let data = this.getExportTableContent(arrRet['data'], arrRet['tags']);
        let excelData = tags.join('{*}') + '{|}' + data.join('{|}');
        this.setState({
            excelData: excelData
        });
    },
    //获取导出表头
    getExportTableHeader(tags) {
        let arrTags = [];
        for (let k in tags) {
            arrTags.push(tags[k]);
        }
        return arrTags;
    },
    //获取导出表数据
    getExportTableContent(data,tags) {
        let arrData = [];
        for (let i = 0; i < data.length; i++) {
            let arrItem = [];
            for (let k in tags) {
                data[i][k] = data[i][k] ? (data[i][k]+'') : '';
                arrItem.push(data[i][k].replace(/<\/?[^>]+>/img,''));
            }
            arrData.push(arrItem.join('{*}'));
        }
        console.log(arrData.join('{|}'));
        return arrData;
    },
      render() {
          let style = {
              display: 'none'
          };
          return (
              <form action={this.props.url} target='_blank' method='post'>
                  <Input name='title' value={this.props.title} style={style} readOnly />
                  <Input type='textarea' name='data' value={this.state.excelData} style={style} readOnly />
                  <Button type='circle' icon='download' htmlType='submit' onClick={this.handleExport} />
              </form>
          );
      }
});

module.exports = ExportExcel;
