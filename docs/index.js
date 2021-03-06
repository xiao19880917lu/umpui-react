/**
 * @file使用文档的模块引用文件
 * */
'use strict';

var React = require('react');

if (!React) {
    throw new Error('AMUIReact requires React.');
}

module.exports = {
    VERSION: '1.0.0',

    // layout
    ReactForm: require('../lib/ReactForm'),
    ReactInput: require('../lib/ReactInput'),
    ReactLoading: require('../lib/ReactLoading'),
    ReactModal: require('../lib/ReactModal'),
    ReactSelect: require('../lib/ReactSelect'),
    ReactCheckbox: require('../lib/ReactCheckbox'),
    ReactTableForm: require('../lib/ReactTableForm'),
    Table: require('../lib/Table/Table'),
    Pagination: require('../lib/Table/Pagination'),
    // Upload: require('../lib/Upload'),
    Header: require('../lib/Header'),
    Sidebar: require('../lib/Sidebar'),
    TreeView: require('../lib/TreeView').default,
    Utils: require('../lib/utils/Utils'),
    TopContainer: require('../lib/TopContainer.js'),
    EventSystem: require('../lib/EventSystem'),
    MarkdownElement: require('../lib/MarkdownElement').default,
    ReactTab: require('../lib/ReactTab.js').default,
    Widget: require('../lib/Widget'),
    WidgetHead: require('../lib/WidgetHead'),
    WidgetBody: require('../lib/WidgetBody'),
    ReactHighcharts: require('../lib/ReactHighcharts'),
    ReactHighstock: require('../lib/ReactHighstock'),
    Nav: require('../lib/Nav'),
    ReactList: require('../lib/ReactList'),
    // 文档对应的js
    NavData: require('./mockData/NavData.js').default,
    PageData: require('./mockData/PageData.js').default,
    InstallApp: require('./components/InstallApp.js').default,
    ChangeLogApp: require('./components/ChangeLogApp.js').default,
    IntroductionApp: require('./components/IntroductionApp.js').default,
    TableApp: require('./components/TableApp.js').default,
    PaginationApp: require('./components/PaginationApp.js').default,
    FormSliderApp: require('./components/FormSliderApp.js').default,
    TipModalApp: require('./components/TipModalApp.js').default,
    FormModalApp: require('./components/FormModalApp.js').default,
    CkListModalApp: require('./components/CkListModalApp.js').default,
    FormApp: require('./components/FormApp.js').default,
    TableFormApp: require('./components/TableFormApp.js').default,
    CheckBoxApp: require('./components/CheckBoxApp.js').default,
    TreeViewApp: require('./components/TreeViewApp.js').default,
    TabApp: require('./components/TabApp.js').default,
    NavApp: require('./components/NavApp.js').default,
    ListApp: require('./components/ListApp.js').default,
    HeaderApp: require('./components/HeaderApp.js').default,
    WidgetApp: require('./components/WidgetApp.js').default,
    ReactHighchartsApp: require('./components/ReactHighchartsApp').default,
    ReactHighstockApp: require('./components/ReactHighstockApp').default,
    ExportApp: require('./components/ExportApp.js').default,
    RangeDatepickerApp: require('./components/RangeDatepickerApp.js').default,
    LoadingApp: require('./components/LoadingApp.js').default,
    BusinessApp: require('./components/BusinessApp.js').default
};
