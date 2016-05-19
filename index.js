'use strict';

var React = require('react');

if (!React) {
      throw new Error('AMUIReact requires React.');
}

module.exports = {
    VERSION: '1.0.0',

    // layout
    ReactForm: require('./lib/ReactForm'),
    ReactInput: require('./lib/ReactInput'),
    ReactLoading: require('./lib/ReactLoading'),
    ReactModal: require('./lib/ReactModal'),
    ReactSelect: require('./lib/ReactSelect'),
    ReactCheckbox: require('./lib/ReactCheckbox'),
    ReactTableForm: require('./lib/ReactTableForm'),
    Table: require('./lib/Table/Table'),
    Upload: require('./lib/Upload'),
    Header: require('./lib/Header'),
    Sidebar: require('./lib/Sidebar'),

    Utils: require('./lib/utils'),
    EventSystem: require('./lib/EventSystem')
}
