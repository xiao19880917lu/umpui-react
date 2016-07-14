/**
 * @file index.js
 */
'use strict';

var React = require('react');

if (!React) {
    throw new Error('AMUIReact requires React.');
}

module.exports = {
    VERSION: '1.0.0',

    // layout
    ReactForm: require('./lib/ReactForm').default,
    ReactTransverForm: require('./lib/ReactTransverForm').default,
    ReactInput: require('./lib/ReactInput').default,
    ReactLoading: require('./lib/ReactLoading'),
    ReactModal: require('./lib/ReactModal').default,
    ReactSelect: require('./lib/ReactSelect'),
    ReactCheckbox: require('./lib/ReactCheckbox').default,
    ReactTableForm: require('./lib/ReactTableForm').default,
    FormSlider: require('./lib/FormSlider').default,
    Table: require('./lib/Table/Table').default,
    Upload: require('./lib/Upload'),
    Header: require('./lib/Header'),
    Sidebar: require('./lib/Sidebar'),
    TreeView: require('./lib/TreeView').default,
    Utils: require('./lib/utils/Utils'),
    EventSystem: require('./lib/EventSystem'),
    Nav: require('./lib/Nav').default,
    MarkdownElement: require('./lib/MarkdownElement').default,
    Widget: require('./lib/Widget'),
    WidgetHead: require('./lib/WidgetHead'),
    WidgetBody: require('./lib/WidgetBody'),
    ReactHighcharts: require('./lib/ReactHighcharts'),
    ReactHighstock: require('./lib/ReactHighstock')
};
